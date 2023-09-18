import { v1 as uuidv1 } from "uuid";
import { AES, enc } from "crypto-ts";
import { config } from "dotenv";
import { env } from "node:process";
const { SECRETKEY } = env;
import { models  } from '../db';

config({ path: "../../.env" });

const register_function = async (dataBody: any) => {
  const {User, RollSettings, TableLogins} = models;
  const { email, username, name, password, roll } = dataBody;
  if (!SECRETKEY) {
    throw new Error("SECRETKEY no está definido en las variables de entorno.");
  }

  const pass = AES.decrypt(password, enc.Utf8.parse(SECRETKEY)).toString(
    enc.Utf8
  );
  const userData = await User.create({
    ID: uuidv1(),
    email,
    username,
    name,
  });

  const rollSetting = await RollSettings.create({
    ID: uuidv1(),
    UserID: userData.ID,
    account: roll,
  });

  await TableLogins.create({
    ID: uuidv1(),
    password: pass,
    RollSettingID: rollSetting.ID,
  });
};

export { register_function };
