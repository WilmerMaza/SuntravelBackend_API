const mysqldb = require("../../db");
const { DataTypes } = require("sequelize");

 const Login = mysqldb.define("TableLogins", {
    ID: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  module.exports = Login

