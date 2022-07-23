const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const useCtrl = require("../controllers/user");
const profilCtrl = require("../controllers/profil");
const multer = require("../middleware/multer-config");

//Routes de connexion et de déconnexion
router.post("/signup", useCtrl.signup);
router.post("/login", useCtrl.login);
router.get("/logout", useCtrl.logoutUser);

//Route profil utilisateurs
router.get("/", auth, profilCtrl.getAllUsers);
router.get("/:id", auth, profilCtrl.userInfo);
router.put("/:id", auth, multer, profilCtrl.updateUser);
router.delete("/:id", auth, multer, profilCtrl.deleteUser);

module.exports = router;
