const mysqldb = require("../../db");
const { DataTypes } = require("sequelize"); // Importa DataTypes correctamente
const User = require("./UserModel");

const Roll = mysqldb.define("RollSettings", {
  ID: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  account: {
    type: DataTypes.STRING, // Usa ENUM sin un array
    defaultValue: "Admin",
  },
});

module.exports = Roll;
