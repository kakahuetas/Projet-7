const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

//CRUD Messages
router.post("/:id", auth, commentCtrl.createComment);
router.put("/:id", auth, commentCtrl.editComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
