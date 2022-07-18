const CommentModel = require("../models/comment.model");
const UserModel = require("../models/user.models");
const MessageModel = require("../models/message.model");

// Création d'un comment
exports.createComment = async (req, res, next) => {
  const message = await MessageModel.Message.findOne({
    where: { id: req.params.id },
  }).then((message) => {
    if (!message) {
      return res.status(401).json({ message: "Message introuvable" });
    }
  });
  MessageModel.Message.findOne({
    where: { id: req.params.id },
  }).then((message) => {
    const comment = {
      commentaire: req.body.commentaire,
      userId: req.auth.userId,
      postId: req.params.id,
      author: message.userId,
    };
    CommentModel.Comment.create(comment)
      .then(() =>
        res.status(201).json({ message: "Le commentaire est posté !" })
      )
      .catch((error) => res.status(400).json({ error }));
  });
};

//Edition d'un commentaire
exports.editComment = async (req, res, next) => {
  const user = req.auth.userId;
  const commentaire = await CommentModel.Comment.findByPk(req.params.id);

  UserModel.User.findOne({ where: { id: req.auth.userId } }).then((users) => {
    if (!commentaire)
      return res
        .status(404)
        .send({ message: "Le commentaire n'a pas été trouvé ou supprimé" });

    const updateComment = {
      commentaire: req.body.commentaire,
    };
    CommentModel.Comment.findOne({ where: { id: req.params.id } }).then(
      (ThisComment) => {
        if (ThisComment.userId === user || users.isAdmin === true) {
          CommentModel.Comment.update(updateComment, {
            where: {
              id: req.params.id,
            },
          })
            .then(() =>
              res.status(200).json({ message: "Commentaire modifié" })
            )
            .catch((error) => {
              console.log(error);
              res.status(400).json({
                message: "Impossible de modifier ce commentaire",
                error,
              });
            });
        } else {
          res.status(500).json({ message: "Vous n'êtes pas autorisé" });
        }
      }
    );
  });
};

//Suppréssion du commentaire
exports.deleteComment = async (req, res, next) => {
  const commentaire = await CommentModel.Comment.findByPk(req.params.id);
  const user = req.auth.userId;

  UserModel.User.findOne({ where: { id: req.auth.userId } }).then((users) => {
    if (!commentaire)
      return res
        .status(404)
        .send({ message: "Le commentaire n'a pas été trouvé ou supprimé" });
    CommentModel.Comment.findOne({ where: { id: req.params.id } }).then(
      (thisComment) => {
        if (
          thisComment.userId === user ||
          users.isAdmin === true ||
          user === thisComment.author
        ) {
          CommentModel.Comment.findOne({
            where: { id: req.params.id, userId: req.auth.userId },
          })
            .then((comment) => {
              CommentModel.Comment.destroy({ where: { id: req.params.id } })
                .then(() =>
                  res
                    .status(200)
                    .json({ message: "Le commentaire est supprimé !" })
                )
                .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({ error });
            });
        } else {
          res.status(500).json({ message: "Vous n'êtes pas autorisé" });
        }
      }
    );
  });
};
