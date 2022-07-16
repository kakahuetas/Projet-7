const UserModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const fs = require("fs");

//Affichage de tous les utilisateurs sans faire transiter son mdp
exports.getAllUsers = async (req, res, next) => {
  UserModel.User.findAll({
    attributes: [
      "id",
      "email",
      "name",
      "firstname",
      "service",
      "createdAt",
      "media",
    ],
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => res.status(400).json({ error }));
};

//Affichage d'un seul utilisateur en recuperant son ID sans faire transiter son mdp
exports.userInfo = async (req, res, next) => {
  const user = await UserModel.User.findByPk(req.params.id);
  if (!user)
    return res
      .status(404)
      .send({ message: "L'utilisateur n'a pas été trouvé ou supprimé'" });
  else {
    UserModel.User.findOne({
      attributes: [
        "id",
        "email",
        "name",
        "firstname",
        "service",
        "createdAt",
        "media",
      ],
      where: { id: req.params.id },
    })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((error) => res.status(400).json({ error }));
  }
};

//Update un profil
exports.updateUser = async (req, res, next) => {
  const user = req.auth.userId;
  if (user != req.params.id)
    return res.status(404).send({ message: "Non authorisé" });
  else if (req.file != undefined) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      UserModel.User.update(
        {
          name: req.body.name,
          firstname: req.body.firstname,
          email: req.body.email,
          service: req.body.service,
          password: hash,
          media: `${req.protocol}://${req.get("host")}/images/upload/${
            req.file.filename
          }`,
        },
        { where: { id: req.auth.userId } }
      )
        .then(() => {
          res.status(200).json({ message: "Profil modifié" });
        })
        .catch((error) => res.status(501).json({ message: error }));
    });
  } else {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      UserModel.User.update(
        {
          name: req.body.name,
          firstname: req.body.firstname,
          email: req.body.email,
          service: req.body.service,
          password: hash,
        },
        { where: { id: req.auth.userId } }
      )
        .then(() => {
          res.status(200).json({ message: "Profil modifié" });
        })
        .catch((error) => res.status(501).json({ message: error }));
    });
  }
};

//Supprimer un profil
exports.deleteUser = (req, res, next) => {
  const user = req.auth.userId;
  UserModel.User.findOne({ where: { id: req.params.id } }).then((profil) => {
    if (user != req.params.id)
      return res.status(404).send({ message: "Non authorisé" });
    else {
      const filename = profil.media.split("/images/upload/")[1];
      fs.unlink(`images/upload/${filename}`, () => {
        UserModel.User.destroy({ where: { id: req.auth.userId } })
          .then(() => {
            res.status(200).json({ message: "Profil supprimé" });
          })
          .catch((error) => res.status(501).json({ message: error }));
      });
    }
  });
};
