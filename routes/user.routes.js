const express = require("express");
const router = express.Router();
const useCtrl = require("../controllers/user");
const profilCtrl = require("../controllers/profil");

//Routes de connexion et de déconnexion
router.post("/signup", useCtrl.signup);
router.post("/login", useCtrl.login);

//Route profil utilisateurs
router.get("/", profilCtrl.getAllUsers);
router.get("/:id", profilCtrl.userInfo);
// router.put("/:id", profilCtrl.updateUser);
// router.delete("/:id", profilCtrl.deleteUser);

module.exports = router;
