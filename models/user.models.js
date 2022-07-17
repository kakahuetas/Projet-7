const { Sequelize } = require("sequelize");
const db = require("../database");

const User = db.define(
  "users",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING(255), allowNull: false },
    firstname: { type: Sequelize.STRING(100), allowNull: false },
    email: { type: Sequelize.STRING(255), allowNull: false, unique: "email" },
    service: { type: Sequelize.STRING(255), allowNull: false },
    media: {
      type: Sequelize.STRING(255),
      defaultValue: "/images/defaut/imagedefaut.png",
    },
    password: { type: Sequelize.STRING(255), allowNull: false },
    isAdmin: { type: Sequelize.BOOLEAN, defaultValue: false },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  { tableName: "users", timestamps: true, underscored: true }
);

db.authenticate();
User.sync({ alter: true });

exports.User = User;
