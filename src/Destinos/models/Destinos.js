const { DataTypes } = require("sequelize");
const mysqldb = require("../../db");

const Destino = mysqldb.define("Destino", {
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
});
// defino el modelo

module.exports = Destino;
