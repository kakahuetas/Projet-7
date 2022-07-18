const { Sequelize } = require("sequelize");
const db = require("../database");

const Message = db.define(
  "Messages",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    texte: { type: Sequelize.TEXT, allowNull: false },
    media: { type: Sequelize.STRING, allowNull: true },
  },
  { tableName: "messages", timestamps: true, underscored: true }
);

Message.associate = function (models) {
  // define association
  Message.belongsTo(models.User, {
    foreignKey: "userId",
  });
};

db.authenticate();
Message.sync({ alter: true });

exports.Message = Message;
