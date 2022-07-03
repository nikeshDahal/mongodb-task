const Comment = require("../models/comments");

//..........................creating comment.......................//

const createComment= async(req,res)=>{
    try {
        const { comment}= req.body;
        const commentedBy = req.user._id
        const postId = req.query.params
        const commentDb = new Comment({
            postId,
            comment,
            commentedBy
        });
        await commentDb.save();
        return res.status(200).send({commentDb});  
    } catch (error) {
        res.status(400).send({
            status:false,
            message:"failed to post a comment"
        });
    }

}
module.exports = {
    createComment
}
