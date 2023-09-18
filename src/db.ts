import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

config({ path: './.env' });

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  AMBIENTE_API,
  DATABASE_NAME,
  DATABASE_PORT,
} = process.env;

const sequelize =
  AMBIENTE_API === 'PRODUCCION'
    ? new Sequelize({
        database: DATABASE_NAME,
        dialect: 'postgres',
        host: DB_HOST,
        port: Number(DATABASE_PORT),
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`,
        {
          logging: false, // set to console.log to see the raw SQL queries
          native: false, // lets Sequelize know we can use pg-native for ~30% more speed
        }
      );

const basename = path.basename(__filename);

const modelDefiners: any[] = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
const modelEntries = Object.entries(sequelize.models);
const capsModelEntries = modelEntries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

const dbModels = Object.fromEntries(capsModelEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

// Importa la función initializeModels desde tu modelo
import { initializeModels } from './models/LoginModel'; 

const { User, RollSettings, TableLogins } = initializeModels(sequelize);

// Define las relaciones aquí
User.hasOne(RollSettings);
RollSettings.belongsTo(User);

RollSettings.hasOne(TableLogins);
TableLogins.belongsTo(RollSettings);

export { dbModels as models, sequelize as conn };
