const { Sequelize } = require("sequelize");
const db = require("../database");

const Comment = db.define(
  "Comment",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      // references: {
      //   model: "Users",
      //   key: "id",
      // },
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      // references: {
      //   model: "Messages",
      //   key: "id",
      // },
    },
    commentaire: { type: Sequelize.TEXT, allowNull: false },
    author: {
      type: Sequelize.INTEGER,
      allowNull: false,
      // references: {
      //   model: "Users",
      //   key: "id",
      // },
    },
  },
  { tableName: "Commentaires", timestamps: true, underscored: true }
);

// Comment.associate = function (models) {
//   // define association
//   Comment.belongsTo(models.User, {
//     foreignKey: "userId",
//   });
//   Comment.belongsTo(models.Message, {
//     foreignKey: "postId",
//   });
// };

db.authenticate();
Comment.sync({ alter: true });

exports.Comment = Comment;
