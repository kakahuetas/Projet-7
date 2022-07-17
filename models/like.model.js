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
    postId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Messages",
        key: "id",
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  { tableName: "Likes", timestamps: true, underscored: true }
);

Likes.associate = function (models) {
  // define association
  Likes.belongsTo(models.Users, {
    foreignKey: "userId",
  });
  Likes.belongsTo(models.Message, {
    foreignKey: "postId",
  });
};

db.authenticate();
Likes.sync({ alter: true });

exports.Likes = Likes;
