import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
//import bcrypt from 'bcrypt';

const sequelize = new Sequelize({
  dialect: 'mysql', // or 'postgres'
  host: 'localhost',
  username: 'root',
  password: 'password',
  database: 'trip_planner_db',
});

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

//User Model
//export class User extends Model {
  
  static associate(models: any) {
    // Associate User with Flights, Hotels, and Events
    User.hasMany(models.Flight, { foreignKey: 'userId' });
    User.hasMany(models.Hotel, { foreignKey: 'userId' });
    User.hasMany(models.Event, { foreignKey: 'userId' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, 
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
        len: [6, 100], 
      },
    },
  },
  {
    sequelize, 
    modelName: 'User',
  }
);  

// Flight Model
export class Flight extends Model {
  static associate(models: any) {
    // Associate Flight with User
    Flight.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

Flight.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id', 
        },
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      departureDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      returnDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0, 
        },
      },
    },
    {
      sequelize,
      modelName: 'Flight',
    }
  );

//Hotel Model
export class Hotel extends Model {
  static associate(models: any) {
    // Associate Hotel with User
    Hotel.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

Hotel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id', 
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    checkInDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    modelName: 'Hotel',
  }
);

//LocalEvents Model
export class Event extends Model {
  static associate(models: any) {
    // Associate Event with User
    Event.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id', 
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'Event',
  }
);