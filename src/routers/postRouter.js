const express = require("express");
const auth = require("../middlewares/auth");
const postController = require("../controllers/postController");

const postRouter = new express.Router();



postRouter.post("/",auth,postController.createPost);
postRouter.get("/listAll",postController.listAllPost);
module.exports = postRouter;
