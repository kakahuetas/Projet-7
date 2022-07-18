const express = require("express");
const db = require("./database");
const helmet = require("helmet");
const path = require("path");

const userRoutes = require("./routes/user.routes");
const messageRoutes = require("./routes/message.routes");
const commentRoutes = require("./routes/comment.routes");

const app = express();

//Test connexion
db.authenticate()
  .then(() => console.log("Connexion a la DB ok ..."))
  .catch((err) => console.log("Connexion refusée", err));

//Helmet correction faille XSS
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json());

// Autorisation entetes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Routes Users
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoutes);

//Routes messages
app.use("/api/message", messageRoutes);

//Routes commentaires
app.use("/api/message/comment", commentRoutes);

module.exports = app;
