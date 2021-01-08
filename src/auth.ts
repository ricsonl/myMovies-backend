import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const authAndContinue = (req :Request, res :Response, next :NextFunction) => {

  const token = req.headers['x-access-token'];
  if(token){

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

      if(err)
        res.json({
          auth: false,
          message: 'Token inválida'
        });
      
      else next();

    });

  } else {
    res.json({
      auth: false,
      message: 'Nenhuma token fornecida'
    });
  }

};

const auth = (req :Request, res :Response, next :NextFunction) => {

  const token = req.headers['x-access-token'];

  if(token != 'null'){

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

      if(err)
        res.json({
          auth: false,
          message: 'Token inválida'
        });

      else
        res.json({
          auth: true
        });

    });

  } else {

    res.json({
      auth: false,
      message: 'Nenhuma token fornecida'
    });

  }
};

export { auth, authAndContinue};