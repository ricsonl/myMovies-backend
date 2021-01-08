import express from 'express';
import cors from 'cors';
import routesPublic from './routesPublic';
import routesAuth from './routesAuth';

const app = express();

app.use(cors(/*{
  origin: 'https://mymovies-frontend.herokuapp.com',
  optionsSuccessStatus: 200
}*/));

app.use(express.json());

app.use(routesPublic);
app.use('/auth', routesAuth);

app.listen(process.env.PORT || 3100);