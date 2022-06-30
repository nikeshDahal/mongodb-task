// const { create } = require("../models/posts");
// const Post = require("../models/posts");

// //.............creating post by user..................//
// const createPost = async(req,res)=>{
//     try {
//         const { title, content, location } = req.body;
//         const postedBy=req.userId
//         const post = new Post ({
//             title,
//             content,
//             postedBy,
//             location
//         });
//         await post.save();
//         res.status(200).send({ post});
//       } catch (error) {
//         res.status(400).send({
//           message:"failed to post a content"
//         });
//       }
// }
// module.exports={
//     createPost
// }