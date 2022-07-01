const express = require("express");
const auth = require("../middlewares/auth");
const userController = require("../controllers/userController");

const userRouter = new express.Router();

//.........................routes for user..........................//

userRouter.post("/",userController.addUser);//to create user
userRouter.post("/login",userController.loginUser)//tologin
userRouter.get("/logout",auth,userController.logoutUser)//tologout





module.exports = userRouter;



