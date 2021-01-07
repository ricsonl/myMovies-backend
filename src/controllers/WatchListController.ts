import { Request, Response } from 'express';
import db from '../db/connection';

class WatchListController {

  async index(req :Request, res :Response){// lista os filmes da watchlist
    const { logged_prof } = req.headers;

    try{

      const profiles = await db('profiles')
        .where('profiles.id', logged_prof);
      
      if(profiles.length == 0)
        return res.json({ message: 'Perfil inexistente' });
      
      const profileWatchlist = await db('profiles')
        .join('profile_watchlistItem', 'profiles.id', '=', 'profile_watchlistItem.profile_id')
        .where('profiles.id', logged_prof)
        .join('watchlistItems', 'profile_watchlistItem.watchlistItem_id', '=', 'watchlistItems.id')
        .select('watchlistItems.id', 'TMDB_id', 'watched');
      
      return res.status(200).json(profileWatchlist);

    }catch(err){
      // return res.json({ message: err });
    }
  }

  async create(req :Request, res :Response){// adiciona um filme à watchlist
    const { logged_prof } = req.headers;

    try{

      const profiles = await db('profiles')
        .where('profiles.id', logged_prof);

      if(profiles.length == 0)
        return res.json({ message: 'Perfil inexistente' });

      const TMDB_id = req.params.tmdbId;

      const countSameMovies = await db('profiles')
        .join('profile_watchlistItem', 'profiles.id', '=', 'profile_watchlistItem.profile_id')
        .where('profiles.id', logged_prof)
        .join('watchlistItems', 'profile_watchlistItem.watchlistItem_id', '=', 'watchlistItems.id')
        .where('TMDB_id', TMDB_id)
        .count('* as countSame');
        
      const { countSame } = countSameMovies[0];

      if(countSame > 0)
          return res.json({ message: 'Este filme já está na sua watchlist!' });

      const trx = await db.transaction();

      const newWatchlistItem = {
        TMDB_id,
        watched: false,
      }

      const insertedWatchlistItemIds = await trx('watchlistItems').insert(newWatchlistItem);

      const newWatchlistItemId = insertedWatchlistItemIds[0];

      await trx('profile_watchlistItem').insert({
        profile_id: logged_prof,
        watchlistItem_id: newWatchlistItemId,
      });

      trx.commit();

      return res.status(201).json({
        id: newWatchlistItemId,
        ...newWatchlistItem
      });

    }catch(err){
      // return res.json({ message: err });
    }
  }

  async delete(req :Request, res :Response){// remove um filme da watchlist

    const { logged_prof } = req.headers;

    try{

      const profiles = await db('profiles')
        .where('profiles.id', logged_prof);
  
      if(profiles.length == 0)
        return res.json({ message: 'Perfil inexistente' });
  
        const { targetId } = req.params;
  
      const owner = await db('profile_watchlistItem')
        .where('watchlistItem_id', targetId)
        .where('profile_id', logged_prof);
  
      if(owner.length == 0)
        return res.json({ message: 'Você não tem permissão para deletar este item' });
  
      const trx = await db.transaction();
  
      await trx('profile_watchlistItem')
        .where('watchlistItem_id', targetId)
        .delete();
      
      await trx('watchlistItems')
        .where('id', targetId)
        .delete();
  
      trx.commit();
  
      return res.status(204).json({ deleted: targetId });

    }catch(err){
      // return res.json({ message: err });
    }
  }
  
}

export default WatchListController;