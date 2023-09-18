import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes'; // Asegúrate de que la ruta sea correcta
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });
import './db';

const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(morgan('dev'));
server.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Actualiza para que coincida con el dominio desde el que se realizará la solicitud
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use((req: Request & { user?: any }, res: Response, next: NextFunction) => {
  // Aquí puedes acceder a req.user sin errores de tipo
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decodedToken = jwt.decode(token) as { [key: string]: any };
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Autenticación fallida' });
    }
  } else {
    next();
  }
});


server.use('/', routes);

// Middleware de manejo de errores.
server.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export = server;
