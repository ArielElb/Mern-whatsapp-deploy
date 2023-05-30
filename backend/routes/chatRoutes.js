const express = require("express");
const router = express.Router();
const isLoggedIn = require("../controllers/isLoggedInController.js");
const chatController = require("../controllers/chatController.js");

router
  .get("/", isLoggedIn.isLoggedIn, chatController.getChats)
  .post("/", isLoggedIn.isLoggedIn, chatController.createChat)
  .get("/:chatId", isLoggedIn.isLoggedIn, chatController.getChat);

module.exports = router;
