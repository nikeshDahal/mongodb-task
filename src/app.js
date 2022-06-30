require('dotenv').config();
const express = require ("express");
const auth = require("./middlewares/auth")



require("./db/mongoose"); //for db connection


//routes
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
// const commentRouter = require("./routers/commentsRouter");


//middlewares
const app = express();
const port = process.env.PORT;
app.use(express.json());



app.use("/user",userRouter);
// app.use("/post",postRouter);









app.listen(port,()=>{
    console.log("server is running on port: "+ port)
})


