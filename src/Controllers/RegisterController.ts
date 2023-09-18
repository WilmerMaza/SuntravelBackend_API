import { Router, Request, Response } from 'express';
import { register_function } from '../Services/RegisterService';


const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const dataFull = { ...req.body };
    try {
        await register_function(dataFull);
        const response = {
            isRegister: true,
            msg: 'Se creó tu actividad exitosamente',
            error: ''
        };
        res.status(200).send(response);
    }
    catch (error) {
        const response = {
            isRegister: false,
            msg: 'Hemos detectado un error al registrar',
            error: error
        };
        res.status(400).send(response);
    }
});

export = router;
