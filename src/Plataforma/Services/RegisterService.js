const { v1 } = require("uuid");
const { AES, enc } = require("crypto-ts");
const { User, Roll, Login } = require("../../models/Asociaciones");
require("dotenv").config({ path: "../../.env" });
const { SECRETKEY } = process.env;

const register_function = async (dataBody) => {
  const { email, username, name, password, roll } = dataBody;
  const pass = AES.decrypt(password, enc.Utf8.parse(SECRETKEY)).toString(
    enc.Utf8
  );

  let user, rollSetting, login
  try {
    // Crear el usuario
     user = await User.create({
      ID: v1(),
      email,
      username,
      name,
    });
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.original.code);
  }

  try {
    // Crear la configuración de roles
     rollSetting = await Roll.create({
      ID: v1(),
      account: roll,
      userId: user.ID,
    });
  } catch (error) {
    throw new Error("Error al crear la configuración de roles: " + error.original.code);
  }

  try {
    // Crear el registro de inicio de sesión
     login = await Login.create({
      ID: v1(),
      user: username,
      password: pass,
      rollId: rollSetting.ID,
    });
  } catch (error) {
    throw new Error("Error al crear el registro de inicio de sesión: " + error.original.code);
  }

  return { user, rollSetting, login };
};

module.exports = { register_function };
