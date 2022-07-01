const express = require("express");
const auth = require("../middlewares/auth");
const replyController = require("../controllers/replyController")

const replyRouter = new express.Router();

replyRouter.post("/",auth,replyController.createReply);
module.exports = replyRouter;
