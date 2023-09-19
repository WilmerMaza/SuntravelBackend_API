const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Users", {
    ID: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  sequelize.define("RollSettings", {
    ID: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    account: {
      type: DataTypes.ENUM(["Admin"]),
      defaultValue: "Admin",
    },
    usuario: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  sequelize.define("TableLogins", {
    ID: {
      type: DataTypes.UUID,
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
};
