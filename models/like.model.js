const { Sequelize } = require("sequelize");
const db = require("../database");

const Likes = db.define(
  "Likes",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    PostId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Messages",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    },
  },
  { tableName: "Likes", timestamps: true, underscored: true }
);

db.authenticate();
Likes.sync({ alter: true });

exports.Likes = Likes;
