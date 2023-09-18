import { models  } from '../db';
import { AES, enc } from 'crypto-ts';

const login_function = async (Name: string, Password: string) => {
    const {User, RollSettings, TableLogins} = models;
    const SECRETKEY = process.env.SECRETKEY; // Obtener SECRETKEY
    if (!SECRETKEY) {
        throw new Error('SECRETKEY no está definido en las variables de entorno.');
    }

    const pass = AES.decrypt(Password, enc.Utf8.parse(SECRETKEY)).toString(enc.Utf8);
    try {
        const dataBd = await TableLogins.findOne({
            where: {
                user: Name,
                password: pass,
            },
            include: [
                { model: RollSettings, include: User },
            ],
        });

        return dataBd;
    } catch (error) {
        throw new Error('user not found');
    }
};


export { login_function };
