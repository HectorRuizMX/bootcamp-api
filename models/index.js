const path = require('path');
const dotenv = require('dotenv');
const { readdirSync } = require('fs');
const { Sequelize, DataTypes } = require("sequelize");

dotenv.config();
let sequelize;
const db = {};

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const init = () => {
  if (!sequelize) {
    sequelize = new Sequelize({
      host: DB_HOST,
      username: DB_USER,
      password: DB_PASSWORD,
      dialect: "mssql",
      port: DB_PORT,
      database: DB_NAME,
      dialectOptions: {
        options: {
          encrypt: false,
        },
      },
    });
  }

  const files = readdirSync(__dirname)
    .filter((file) => {
      return file.endsWith(".js") && file !== 'index.js';
    });

  files.forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};

module.exports = init;
