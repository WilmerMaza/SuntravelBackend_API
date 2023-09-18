import { DataTypes, Model, Sequelize } from 'sequelize';

// Define la interfaz para el modelo User
interface UserAttributes {
  ID: string;
  email: string;
  username: string;
  name: string;
}

// Define la interfaz para el modelo RollSettings
interface RollSettingsAttributes {
  ID: string;
  account: 'Admin';
  usuario: string;
}

// Define la interfaz para el modelo TableLogins
interface TableLoginsAttributes {
  ID: string;
  user: string;
  password: string;
}

// Define la clase del modelo User
class User extends Model<UserAttributes> implements UserAttributes {
  public ID!: string;
  public email!: string;
  public username!: string;
  public name!: string;
}

// Define la clase del modelo RollSettings
class RollSettings extends Model<RollSettingsAttributes> implements RollSettingsAttributes {
  public ID!: string;
  public account!: 'Admin';
  public usuario!: string;
}

// Define la clase del modelo TableLogins
class TableLogins extends Model<TableLoginsAttributes> implements TableLoginsAttributes {
  public ID!: string;
  public user!: string;
  public password!: string;
}

// Exporta una función que define y configura los modelos y relaciones
export const initializeModels = (sequelize: Sequelize) => {
  User.init(
    {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
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
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  RollSettings.init(
    {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      account: {
        type: DataTypes.ENUM('Admin'),
        defaultValue: 'Admin',
      },
      usuario: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'RollSettings',
    }
  );

  TableLogins.init(
    {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
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
    },
    {
      sequelize,
      modelName: 'TableLogins',
    }
  );



  return {
    User,
    RollSettings,
    TableLogins,
  };
};
