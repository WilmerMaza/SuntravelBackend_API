const { DataTypes } = require("sequelize");
const mysqldb = require("../../db");

const categoria = mysqldb.define("Categoria", {
  ID: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  describe: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});
// defino el modelo

module.exports = categoria;
