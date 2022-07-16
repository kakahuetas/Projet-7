const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.models");

exports.signup = async (req, res, next) => {
  const email = await UserModel.User.findOne({
    where: { email: req.body.email },
  });
  if (email)
    return res
      .status(404)
      .send({ message: "Le mail est déjà utilisé, merci de vous connecter" });
  else {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        UserModel.User.create({
          name: req.body.name,
          firstname: req.body.firstname,
          email: req.body.email,
          service: req.body.service,
          password: hash,
          media: `${req.protocol}://${req.get(
            "host"
          )}/images/defaut/imagedefaut.png`,
          isAdmin: false,
          isActive: false,
        })
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(401).json({ error }));
      })
      .catch((error) => res.status(501).json({ error }));
  }
};

exports.login = (req, res, next) => {
  UserModel.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          } else {
            user
              .update({ isActive: true }, { where: { id: req.body.email } })
              .then(() =>
                res.status(200).json({
                  message: "Vous êtes connecté",
                  userId: user.id,
                  token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
                    expiresIn: "24h",
                  }),
                })
              );
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Deconnexion
exports.logoutUser = (req, res, next) => {
  UserModel.User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Merci de vous authentifier", error });
      } else {
        user
          .update({ isActive: false }, { where: { id: req.body.email } })
          .then(() =>
            res.status(201).json({
              message: "utilisateur déconnecté ",
            })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
