const { v1 } = require("uuid");
const { AES, enc } = require("crypto-ts");
require("dotenv").config({ path: "../../.env" });
const { SECRETKEY } = process.env;
const { Users, RollSettings, TableLogins } = require("../db.js");

const register_function = async (dataBody) => {
  const { email, username, name, password, roll } = dataBody;

  const pass = AES.decrypt(password, enc.Utf8.parse(SECRETKEY)).toString(
    enc.Utf8
  );
  const user = await Users.create({
    ID: v1(),
    email,
    username,
    name
  });

  const rollSetting = await RollSettings.create({
    ID: v1(),
    account: roll,
    usuario: user.ID,
  });

  await TableLogins.create({
    ID: v1(),
    user: username,
    password: pass,
    RollSettingID: rollSetting.ID,
  });

};

module.exports = { register_function };
