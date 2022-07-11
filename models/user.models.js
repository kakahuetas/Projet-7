const { Sequelize } = require("sequelize");
const db = require("../database");

const User = db.define(
  "users",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING(255), allowNull: false },
    email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
    password: { type: Sequelize.STRING(255), allowNull: false },
  },
  { tableName: "users", timestamps: false, underscored: true }
);

db.authenticate();

exports.User = User;

// const User = db.define("users", {
//   id: {
//     type: DataTypes.INTEGER(11).UNSIGNED,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING(100),
//     defaultValue: "",
//     allowNull: false,
//   },
//   firstname: {
//     type: DataTypes.STRING(100),
//     defaultValue: "",
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     validate: {
//       isEmail: true,
//     },
//   },
//   password: {
//     type: DataTypes.STRING(64),
//     allowNull: false,
//   },
// });

// module.exports = User;

// const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");
// const { isEmail } = require("validator");

// const userSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     firstname: { type: String, required: true },
//     email: { type: String, required: true, unique: true, validate: [isEmail] },
//     password: { type: String, required: true },
//     followers: { type: [String] },
//     following: { type: [String] },
//     likes: { type: [String] },
//     picture: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// userSchema.plugin(uniqueValidator);

// module.exports = mongoose.model("User", userSchema);
