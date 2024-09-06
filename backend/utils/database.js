const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "node-app",
  username: "root",
  password: "root",
  timezone: "+05:30",
});

module.exports = sequelize;
