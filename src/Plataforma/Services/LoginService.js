const { AES, enc } = require("crypto-ts");
const { User, Roll, Login } = require("../../models/Asociaciones");

const login_function = async (Name, Password) => {
  const { SECRETKEY } = process.env;
  const pass = AES.decrypt(Password, enc.Utf8.parse(SECRETKEY)).toString(
    enc.Utf8
  );
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
