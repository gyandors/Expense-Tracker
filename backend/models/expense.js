const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const Expense = sequelize.define(
  "expense",
  {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    category: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

module.exports = Expense;
