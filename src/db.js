require("dotenv").config({ path: "./.env" });
const { Sequelize } = require("sequelize");

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DATABASE_NAME
} = process.env;

const mysqldb = new Sequelize(DATABASE_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});



module.exports = mysqldb;
