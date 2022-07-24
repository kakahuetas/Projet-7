const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const messageCtrl = require("../controllers/message");
const multer = require("../middleware/multer-config");

//Route messages
router.get("/", multer, messageCtrl.getAllMessages);
router.get("/:id", auth, multer, messageCtrl.getOneMessage);
router.get("/profil/:id", auth, multer, messageCtrl.getAllUserMessage);

//CRUD Messages
router.post("/", auth, multer, messageCtrl.createMessage);
router.put("/:id", auth, multer, messageCtrl.editMessage);
router.delete("/:id", auth, multer, messageCtrl.deleteMessage);

//Like/Unlike
router.post("/like/:id", auth, messageCtrl.likeMessage);
router.post("/unlike/:id", auth, messageCtrl.unlikeMessage);

module.exports = router;
