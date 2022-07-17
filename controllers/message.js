const MessageModel = require("../models/message.model");
const UserModel = require("../models/user.models");
const fs = require("fs");

// Création d'un message
exports.createMessage = (req, res, next) => {
  if (!req.body.title || !req.body.texte)
    return res
      .status(404)
      .send({ message: "Merci de ne pas laisser les champs vides" });
  else if (req.file != undefined) {
    MessageModel.Message.create(
      {
        author: req.auth.userId,
        title: req.body.title,
        texte: req.body.texte,
        media: `${req.protocol}://${req.get("host")}/images/upload/${
          req.file.filename
        }`,
        likes: 0,
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
        author: req.auth.userId,
        title: req.body.title,
        texte: req.body.texte,
        likes: 0,
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
    attributes: ["id", "author", "title", "texte", "media"],
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
      attributes: ["id", "author", "title", "texte", "media", "createdAt"],
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
          (ThisMessage.author === user && req.file != undefined) ||
          (users.isAdmin === true && req.file != undefined)
        ) {
          MessageModel.Message.update(
            {
              title: req.body.title,
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
        } else if (ThisMessage.author === user || users.isAdmin === true) {
          MessageModel.Message.update(
            {
              title: req.body.title,
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
            thisMessage.author === user ||
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
          } else if (thisMessage.author === user || users.isAdmin === true) {
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
  const post = await MessageModel.Message.findByPk(req.params.id);
  if (!post)
    return res
      .status(404)
      .send({ message: "Le message n'a pas été trouvé ou supprimé" });
  else {
    res.status(200).json({ message: "Message trouvé" });
  }
};

////TO DO :
/////////// ajouter systeme de commentaire
/////////// Ajouter systeme de like et dislike
