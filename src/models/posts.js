const mongoose = require("mongoose")
const User = require("../models/users")



//schema for location
const locationSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    _id:false,
    timestamps:false
  });


const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    location:locationSchema
})

const Post = mongoose.model("Posts", postSchema);
module.exports = Post;
