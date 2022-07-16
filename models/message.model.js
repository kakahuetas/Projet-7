const { Sequelize } = require("sequelize");
const db = require("../database");

const Message = db.define(
  "Messages",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    author: { type: Sequelize.STRING, allowNull: false },
    title: { type: Sequelize.STRING, allowNull: false },
    texte: { type: Sequelize.TEXT, allowNull: false },
    media: { type: Sequelize.STRING, allowNull: true },
    usersLiked: { type: Sequelize.JSON, defaultValue: 0 },
    likes: { type: Sequelize.INTEGER, defaultValue: 0 },
  },
  { tableName: "messages", timestamps: true, underscored: true }
);

db.authenticate();
Message.sync({ alter: true });

exports.Message = Message;
