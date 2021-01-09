import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const auth = (req :Request, res :Response, next :NextFunction) => {

  const token = req.headers['x-access-token'];
  if(token){

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

      if(err)
        res.json({
          authFailed: true,
          message: 'Token inválida'
        });
      
      else next();

    });

  } else {
    res.json({
      authFailed: true,
      message: 'Nenhuma token fornecida'
    });
  }

};

export default auth;