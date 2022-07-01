const mongoose = require("mongoose");
const User = require("../models/users");
const Post = require("../models/posts");
const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true,
        trim:true
    },
    commentedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Post
    }
},
{
    timestamps:true

})
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;