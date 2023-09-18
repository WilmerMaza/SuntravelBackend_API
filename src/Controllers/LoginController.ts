import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { login_function } from '../Services/LoginService';

dotenv.config({ path: '../../.env' });

const { JWT_STRING, JWT_EXPIRED } = process.env;

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { Name, Password } = req.body;
  const dataBd = await login_function(Name, Password);
  if (dataBd) {
    let dataUser: any;
    const {
      RollSetting: { account },
    } = dataBd.dataValues;

    
      const {
        RollSetting: {
          SportsInstitution: { dataValues },
        },
      } = dataBd.dataValues;

      dataUser = dataValues;
      dataUser['account'] = account;
    

    jwt.sign(
      { dataUser },
      JWT_STRING as string,
      { expiresIn: JWT_EXPIRED as string },
      (error, token) => {
        if (error) {
          res.status(500).json({ error: 'Error al generar el token' });
        } else {
          res.json({
            token,
          });
        }
      }
    );
  } else {
    res.status(401).send('Usuario no encontrado');
  }
});

export = router;
