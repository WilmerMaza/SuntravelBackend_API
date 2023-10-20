const User = require("../Plataforma/models/UserModel");
const Roll = require("../Plataforma/models/RollModel");
const Login = require("../Plataforma/models/LoginModel");
const servicios = require("../Servicios/models/sevicios");
const categoria = require("../Categorias/models/Categoria");
const Tservicio = require("../Tservicios/models/TipoServicio");
const Destino = require("../Destinos/models/Destinos");
const atributos = require("../Atributos/models/Atributos");
const atributosDescribe = require("../Atributos/models/AtributosDescribe");

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

Tservicio.hasOne(categoria, { foreignKey: "tservicioId" });
categoria.belongsTo(Tservicio, { foreignKey: "tservicioId" });

atributos.hasOne(atributosDescribe,{foreignKey:"atributosId"});
atributosDescribe.belongsTo(atributos , {foreignKey:"atributosId"})


Tservicio.hasOne(atributosDescribe, { foreignKey: "tservicioId" });
atributosDescribe.belongsTo(Tservicio, { foreignKey: "tservicioId" });



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
