const mongoose = require("mongoose");
const Comment = require("../models/comments");
const User = require("./users");

const replySchema = new mongoose.Schema({
    reply:{
        type:String,
        required:true,
        trim:true
    },
    commentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Comment
    },
    repliedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    }
})
const Reply = mongoose.model("Reply", replySchema);
module.exports = Reply;
