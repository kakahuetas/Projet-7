const User = require("../models/user.models");
const ObjectId = require("mysql2").Types.ObjectId;

//Affichage de tous les utilisateurs sans faire transiter son mdp
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find().select("-password");
  res.status(201).json(users);
};

//Affichage d'un seul utilisateur en recuperant son ID sans faire transiter son mdp
exports.userInfo = async (req, res, next) => {
  console.log(req.params);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID : Inconnu :" + req.params.id);

  User.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID : Inconnu :" + err);
  }).select("-password");
};

//Update un profil

//Supprimer un profil
// exports.deleteUser = (req, res, next) => {};
