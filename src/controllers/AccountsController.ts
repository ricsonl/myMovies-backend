import { Request, Response } from 'express';
import db from '../db/connection';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AccountsController {

  async create(req :Request, res :Response){// cria um registro na tabela de contas

    const {
      email,
      password,
      mainProfileName,
      birthday,
    } = req.body;

    if(email && password && mainProfileName && birthday){
      try{
        const sameEmailAccounts = await db('accounts')
        .where('email', email)
        .count('* as countSame');
        
        const { countSame } = sameEmailAccounts[0];
        
        if(countSame > 0)
          return res.json({ message: 'Já existe uma conta com este email!' });

        const trx = await db.transaction();
      
        const hashed = await bcrypt.hash(password, 10);

        const account = {
          email,
          password: hashed,
        };
        const insertedAccountIds = await trx('accounts').insert(account, ['id']);

        const mainProfile = {
          name: mainProfileName,
          main: true,
          birthday,
        }
        const insertedProfileIds = await trx('profiles').insert(mainProfile, ['id']);

        const accountId = insertedAccountIds[0].id;
        const mainProfileId = insertedProfileIds[0].id;

        await trx('account_profile').insert({
          account_id: accountId,
          profile_id: mainProfileId,
        });

        trx.commit();

        const tokenData = {
          id: accountId,
          email,
        }
        const secret = process.env.JWT_SECRET || 'ssecreEt';

        const token = jwt.sign(tokenData, secret, {
          expiresIn: '20m'
        })

        return res.json({
          id: accountId,
          email,
          token
        });

      }catch(err){
        // return res.json({ message: err });
      }
    }
    return res.json({ message: 'Preencha todos os campos!' });
  }
}

export default AccountsController;