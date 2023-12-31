const { DataTypes } = require("sequelize");
const mysqldb = require("../../db");

const servicio = mysqldb.define("Servicios", {
  ID: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  precio_adulto: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  precio_nino: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  hora_inicio: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  duracion: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  lugar: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  descripcion: {
    type: DataTypes.STRING(2000),
    allowNull: true,
    unique: false,
  },
  galeria: {
    type: DataTypes.STRING(1000),
    allowNull: true,
    unique: false,
  },
  salida_horario: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  recomendaciones: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  informacion_Adicional: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  terminos_condiciones: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  incluye: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  no_incluye: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
});
// defino el modelo

module.exports = servicio;
