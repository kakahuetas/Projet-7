const UserModel = require("../models/user.models");
const MessageModel = require("../models/message.model");
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
      "isAdmin",
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
        "isAdmin",
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
  const user = req.params.id + "";

  UserModel.User.findOne({ where: { id: req.params.id } }).then((users) => {
    console.log(req.params.id, user, users.isAdmin);
    if (
      (user === req.params.id &&
        req.file != undefined &&
        req.body.password != undefined) ||
      (users.isAdmin === true &&
        req.file != undefined &&
        req.body.password != undefined)
    ) {
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
          { where: { id: req.params.id } }
        )
          .then(() => {
            res.status(200).json({ message: "Profil modifié" });
          })
          .catch((error) => res.status(501).json({ message: error }));
      });
    } else if (
      (user === req.params.id && req.file === undefined) ||
      (users.isAdmin === true && req.file === undefined)
    ) {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        UserModel.User.update(
          {
            name: req.body.name,
            firstname: req.body.firstname,
            email: req.body.email,
            service: req.body.service,
            password: hash,
          },
          { where: { id: req.params.id } }
        )
          .then(() => {
            res.status(200).json({ message: "Profil modifié" });
          })
          .catch((error) => res.status(501).json({ message: error }));
      });
    } else if (
      (user === req.params.id && req.file != undefined) ||
      (users.isAdmin === true && req.file != undefined)
    ) {
      UserModel.User.update(
        {
          media: `${req.protocol}://${req.get("host")}/images/upload/${
            req.file.filename
          }`,
        },
        { where: { id: req.params.id } }
      ).then(() => {
        res.status(200).json({ message: "Profil modifié" });
      });
    } else {
      return res.status(404).send({ message: "Non authorisé" });
    }
  });
};

//Supprimer un profil
// exports.deleteUser = (req, res, next) => {
//   const user = req.auth.userId + "";
//   const selectedUser = req.params.id;

//   UserModel.User.findOne({ where: { id: req.auth.userId } }).then((users) => {
//     if (user === selectedUser || users.isAdmin === true) {
//       UserModel.User.findOne({ where: { id: req.params.id } }).then(
//         (profil) => {
//           const filename = profil.media.split("/images/upload/")[1];
//           fs.unlink(`images/upload/${filename}`, () => {
//             UserModel.User.destroy({ where: { id: req.params.id } })
//               .then(() => {
//                 res.status(200).json({ message: "Profil supprimé" });
//               })
//               .catch((error) => res.status(501).json({ message: error }));
//           });
//         }
//       );
//     } else {
//       return res.status(404).send({ message: "Non autorisé" });
//     }
//   });
// };

//Supprimer un profil
exports.deleteUser = (req, res, next) => {
  const user = req.auth.userId + "";
  const selectedUser = req.params.id;

  UserModel.User.findOne({ where: { id: req.auth.userId } }).then((users) => {
    if (user === selectedUser || users.isAdmin === true) {
      UserModel.User.findOne({ where: { id: req.params.id } }).then(
        (profil) => {
          if (profil != null) {
            MessageModel.Message.findAll({
              where: { id: req.params.id },
            })
              .then(() => {
                MessageModel.Message.destroy({
                  where: { userId: req.params.id },
                });
                console.log("Tous les posts de cet user ont été supprimé");
                //Suppression de l'utilisateur

                const filename = profil.media.split("/images/upload/")[1];
                fs.unlink(`images/upload/${filename}`, () => {
                  UserModel.User.destroy({ where: { id: req.params.id } })
                    .then(() => {
                      res.status(200).json({ message: "Profil supprimé" });
                    })
                    .catch((error) => res.status(501).json({ message: error }));
                });
              })
              .catch((err) => res.status(500).json(err));
          }
        }
      );
    } else {
      return res.status(404).send({ message: "Non autorisé" });
    }
  });
};
