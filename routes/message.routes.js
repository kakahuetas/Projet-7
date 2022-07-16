const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const messageCtrl = require("../controllers/message");
const multer = require("../middleware/multer-config");

//Route messages
router.get("/", auth, multer, messageCtrl.getAllMessages);
router.get("/:id", auth, multer, messageCtrl.getOneMessage);

//CRUD Messages
router.post("/", auth, multer, messageCtrl.createMessage);
router.put("/:id", auth, multer, messageCtrl.editMessage);
router.delete("/:id", auth, multer, messageCtrl.deleteMessage);

//Like/Dislike
router.patch("/:id/like", auth, messageCtrl.likeMessage);

module.exports = router;
