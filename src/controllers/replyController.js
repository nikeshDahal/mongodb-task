const Reply = require("../models/replies")
const createReply= async(req,res)=>{
    try {
        const { reply }= req.body;
        const commentId = req.query.params;
        const repliedBy = req.user._id;
        const replyDb = new Reply({
            reply,
            commentId,
            repliedBy
        });
        await replyDb.save();
        return res.status(200).send({replyDb});  
    } catch (error) {
        res.status(400).send({
            error_message:"failed to post a comment"
        });
    }
}
module.exports={
    createReply
};
