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
           error_message:error
        });
      }
}


const listAllPost= async(req,res)=>{
    try {
        const posts = await Post.listAllPost();
        return res.status(200).send({posts});
    } catch (error) {
        return res.status(400).send({
            error_message:{message:"failed to fetch posts"}
         });
    }
}

module.exports={
    createPost,
    listAllPost
}