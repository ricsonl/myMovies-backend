import { Request, Response, NextFunction } from 'express';
import db from '../db/connection';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class LoginController {
  async create(req :Request, res :Response, next :NextFunction){// requisição de efetuar login

    const { email, password } = req.body;

    if(email && password){
      try{
        const accounts = await db('accounts')
          .where('email', email)
          .select('*');
      
        if(accounts.length == 0)
          return res.json({ message: 'Não existe uma conta vinculada a este email' });

        const acc = accounts[0];
        await bcrypt.compare(password, accounts[0].password).then((result) => {

          if(result){

            const tokenData = { id: acc.id }
            const secret = process.env.JWT_SECRET || 'ssecreEt';

            const token = jwt.sign(tokenData, secret, {
              expiresIn: '50m'
            })

            return res.json({
              id: acc.id,
              email,
              token
            });
          }
          
          return res.json({ message: 'Senha incorreta' });
        })
      }catch(err){
        // return res.json({ message: err });
      }
    }
    else return res.json({ message: 'Preencha todos os campos!' });

  }
  
}

export default LoginController;