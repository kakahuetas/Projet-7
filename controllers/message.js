const MessageModel = require("../models/message.model");
const UserModel = require("../models/user.models");
const LikesModel = require("../models/like.model");
const fs = require("fs");

// Création d'un message
exports.createMessage = (req, res, next) => {
  if (!req.body.texte)
    return res
      .status(404)
      .send({ message: "Merci de ne pas laisser les champs vides" });
  else if (req.file != undefined) {
    MessageModel.Message.create(
      {
        userId: req.auth.userId,
        texte: req.body.texte,
        media: `${req.protocol}://${req.get("host")}/images/upload/${
          req.file.filename
        }`,
      },
      { where: { id: req.auth.userId } }
    )
      .then(() => {
        res.status(200).json({ message: "Message posté" });
      })
      .catch((error) => res.status(501).json({ message: error }));
  } else {
    MessageModel.Message.create(
      {
        userId: req.auth.userId,
        texte: req.body.texte,
      },
      { where: { id: req.auth.userId } }
    )
      .then(() => {
        res.status(200).json({ message: "Message posté" });
      })
      .catch((error) => res.status(501).json({ message: error }));
  }
};

//Recupération de tous les messages
exports.getAllMessages = async (req, res, next) => {
  MessageModel.Message.findAll({
    attributes: ["id", "userId", "texte", "likes", "media", "createdAt"],
  })
    .then((message) => {
      res.status(200).send(message);
    })
    .catch((error) => res.status(400).json({ error }));
};

//Recupération d'un seul message
exports.getOneMessage = async (req, res, next) => {
  const message = await MessageModel.Message.findByPk(req.params.id);
  if (!message)
    return res
      .status(404)
      .send({ message: "Le message n'a pas été trouvé ou supprimé" });
  else {
    MessageModel.Message.findOne({
      attributes: ["id", "userId", "texte", "media", "likes", "createdAt"],
      where: { id: req.params.id },
    })
      .then((message) => {
        res.status(200).send(message);
      })
      .catch((error) => res.status(400).json({ error }));
  }
};

//Edition du message
exports.editMessage = async (req, res, next) => {
  const user = req.auth.userId + "";
  const message = await MessageModel.Message.findByPk(req.params.id);

  UserModel.User.findOne({ where: { id: req.auth.userId } }).then((users) => {
    if (!message)
      return res
        .status(404)
        .send({ message: "Le message n'a pas été trouvé ou supprimé" });

    MessageModel.Message.findOne({ where: { id: req.params.id } })
      .then((ThisMessage) => {
        if (
          (ThisMessage.userId === user && req.file != undefined) ||
          (users.isAdmin === true && req.file != undefined)
        ) {
          MessageModel.Message.update(
            {
              texte: req.body.texte,
              media: `${req.protocol}://${req.get("host")}/images/upload/${
                req.file.filename
              }`,
            },
            { where: { id: req.params.id } }
          )
            .then(() => {
              res.status(200).json({ message: "Message modifié" });
            })
            .catch(() => {
              res.status(401).json({ message: "Non Autorisé" });
            });
        } else if (ThisMessage.userId === user || users.isAdmin === true) {
          MessageModel.Message.update(
            {
              texte: req.body.texte,
            },
            { where: { id: req.params.id } }
          )
            .then(() => {
              res.status(200).json({ message: "Message modifié" });
            })
            .catch((error) => res.status(501).json({ message: error }));
        } else {
          res.status(401).json({ message: "Non Autorisé" });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });
};

//Suppréssion du message
exports.deleteMessage = async (req, res, next) => {
  const user = req.auth.userId + "";
  const message = await MessageModel.Message.findByPk(req.params.id);

  if (!message)
    return res
      .status(404)
      .send({ message: "Le message n'a pas été trouvé ou déjà supprimé" });

  UserModel.User.findOne({ where: { id: req.auth.userId } })
    .then((users) => {
      if (!users) {
        return res.status(401).json({ message: "pas utilisateur" });
      }
      MessageModel.Message.findOne({ where: { id: req.params.id } }).then(
        (thisMessage) => {
          if (
            thisMessage.userId === user ||
            (users.isAdmin === true && thisMessage.media != null)
          ) {
            const filename = thisMessage.media.split("/images/upload/")[1];
            fs.unlink(`images/upload/${filename}`, () => {
              message
                .destroy({ where: { id: req.params.id } })
                .then(() => {
                  res.status(200).json({ message: "Message supprimé" });
                })
                .catch((error) => res.status(501).json({ message: error }));
            });
          } else if (thisMessage.userId === user || users.isAdmin === true) {
            message
              .destroy({ where: { id: req.params.id } })
              .then(() => {
                res.status(200).json({ message: "Message supprimé" });
              })
              .catch((error) => res.status(501).json({ message: error }));
          } else {
            res.status(401).json({ message: "Non Autorisé" });
          }
        }
      );
    })

    .catch((error) => {
      res.status(500).json({ error });
    });
};

//Like Message
exports.likeMessage = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.auth.userId;
  LikesModel.Likes.findAll({ where: { userId, postId } })
    .then(async (likes) => {
      if (likes.length) {
        throw "Post déjà liké 🤚";
      }
      await LikesModel.Likes.create({
        userId,
        postId,
      });
      return res.status(201).json({ message: "Like crée ! 👍" });
    })
    .catch((error) => res.status(400).json({ error }));

  //Affichage du total de like en fonction du message
  const count = await LikesModel.Likes.count({
    where: { postId: postId },
  });
  console.log(count);
};

exports.unlikeMessage = async (req, res) => {
  const postId = req.params.id;
  const userId = req.auth.userId;
  LikesModel.Likes.findAll({ where: { userId, postId } })
    .then((likes) => {
      if (!likes.length) {
        throw "Post non liké 😥";
      }

      const likesIds = likes.map((like) => like.id);
      console.log(likesIds);
      LikesModel.Likes.destroy({ where: { id: likesIds } }).then(() =>
        res.status(201).json({ message: "Like annulé ! 👎" })
      );
    })
    .catch((error) => res.status(400).json({ error }));
};
////TO DO :
/////////// ajouter systeme de commentaire
