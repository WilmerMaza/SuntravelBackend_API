import { Request, Response, NextFunction } from 'express';

// Declara una interfaz personalizada para la Request
declare global {
  namespace Express {
    interface Request {
      token?: string; // Declara la propiedad token como opcional
    }
  }
}

const verificationToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers?.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
};

export { verificationToken };
