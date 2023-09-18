import { Router } from 'express';
import LoginRoutes from './Controllers/LoginController';
import RegisterRoutes from './Controllers/RegisterController';

const router = Router();

router.use('/login', LoginRoutes);
router.use('/register', RegisterRoutes);

router.use('*', (_req, res) => {
  res.status(404).send({ error: 'page not found' });
});

export = router;
