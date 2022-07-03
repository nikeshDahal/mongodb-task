// const { create } = require("../models/posts");
const Post = require("../models/posts");

//.............creating post by user..................//
const createPost = async(req,res)=>{
    try {
        const { title, content, location } = req.body;
        const postedBy=req.user._id;
        const post = new Post ({
            title,
            content,
            location,
            postedBy
        });
        await post.save();
        return res.status(200).send({ post});
      } catch (error) {
        res.status(400).send({
            status:false,
           message:"failed to create post"
        });
      }
}

//............................controller for fetching all post including post , post ownser, comment and replies..............//

const listAllPost= async(req,res)=>{
    try {
        const posts = await Post.listAllPosts();
        return res.status(200).send({posts});
    } catch (error) {
        return res.status(400).send({
            status:false,
            message:"failed to fetch posts"
         });
    }
}

//............................controller for fetching all post within 600 metere distance from my location..........................//
const postNearMe= async(req,res)=>{
    try {
        const posts = await Post.listAllPostsNearMe(req.user.location.coordinates);
        return res.status(200).send({posts});
    } catch (error) {
        return res.status(400).send({
            status:false,
            message:"failed to fetch posts"
         });
    }
}

module.exports={
    createPost,
    listAllPost,
    postNearMe
}