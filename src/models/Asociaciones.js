const User = require("./UserModel");
const Roll = require("./RollModel");
const Login = require("./LoginModel");

// Definir la relación uno a uno (hasOne) entre User y Roll
User.hasOne(Roll, { foreignKey: "userId" });
Roll.belongsTo(User, { foreignKey: "userId" });

Roll.hasOne(Login, { foreignKey: "rollId" });
Login.belongsTo(Roll, { foreignKey: "rollId" });

// Exportar los modelos y las asociaciones
module.exports = {
  User,
  Roll,
  Login
};
