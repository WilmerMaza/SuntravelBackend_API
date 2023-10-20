const { DataTypes } = require("sequelize");
const mysqldb = require("../../db");

const atributosDescribe = mysqldb.define("AtributosDescribe", {
  ID: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  estado:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: false,
  }
});
// defino el modelo

module.exports = atributosDescribe;
