const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes.js");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../.env" });
const mysqldb = require("./db.js");

require("./db.js");

const server = express();

server.name = "API";
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

const { PORT } = process.env;
const puerto = PORT ? PORT : 3002;

server.listen(puerto, () => {
  console.log(`Server listening on port ${puerto}`);
  mysqldb.sync({ force: false });
});

module.exports = server;
