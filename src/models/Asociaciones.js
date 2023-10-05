const User = require("../Plataforma/models/UserModel");
const Roll = require("../Plataforma/models/RollModel");
const Login = require("../Plataforma/models/LoginModel");
const servicios = require("../Servicios/models/sevicios");
const categoria = require("../Categorias/models/Categoria");
const Tservicio = require("../Tservicios/models/TipoServicio");
const Destino = require("../Destinos/models/Destinos");

// Definir la relación uno a uno (hasOne) entre User y Roll
User.hasOne(Roll, { foreignKey: "userId" });
Roll.belongsTo(User, { foreignKey: "userId" });

Roll.hasOne(Login, { foreignKey: "rollId" });
Login.belongsTo(Roll, { foreignKey: "rollId" });



Destino.hasOne(servicios, { foreignKey: "destinoId" });
servicios.belongsTo(Destino, { foreignKey: "destinoId" });

Tservicio.hasOne(servicios, { foreignKey: "tservicioId" });
servicios.belongsTo(Tservicio, { foreignKey: "tservicioId" });

categoria.hasOne(servicios, { foreignKey: "categoriaId" });
servicios.belongsTo(categoria, { foreignKey: "categoriaId" });

// Exportar los modelos y las asociaciones
module.exports = {
  User,
  Roll,
  Login,
  servicios,
  categoria,
  Tservicio,
  Destino,
};
