const express = require("express");
const auth = require("../middlewares/auth");
const commentController = require("../controllers/commentsController");

const commentRouter = new express.Router();



commentRouter.post("/",auth,commentController.createComment);
module.exports = commentRouter;
