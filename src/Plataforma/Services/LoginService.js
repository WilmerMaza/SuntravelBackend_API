const { AES, enc } = require("crypto-ts");
const { User, Roll, Login } = require("../../models/Asociaciones");

const fs = require("fs");
const util = require("util");
require("../../Utils/consts");

const logFile = fs.createWriteStream("app.log", { flags: "a" });
const logStdout = process.stdout;

console.log = (message) => {
  logFile.write(util.format(message) + "\n");
  logStdout.write(util.format(message) + "\n");
};

console.error = (message) => {
  logFile.write(util.format(message) + "\n");
  logStdout.write(util.format(message) + "\n");
};

const login_function = async (Name, Password) => {
  console.log(global.SECRETKEY);
  const pass = AES.decrypt(Password, enc.Utf8.parse(global.SECRETKEY)).toString(
    enc.Utf8
  );
  console.log(pass);
  try {
    const dataBd = await Login.findOne({
      where: {
        password: pass,
        user: Name,
      },
      include: [{ model: Roll, include: [{ model: User }] }],
    });

    return dataBd;
  } catch (error) {
    throw new Error("user not found" + error.original.code);
  }
};

const user_function = async (usuario) => {
  try {
    const dataBd = await User.findOne({
      where: {
        ID: usuario,
      },
    });

    return dataBd;
  } catch (error) {
    return "user not found";
  }
};

module.exports = {
  login_function,
  user_function,
};
