const jwt = require('jsonwebtoken');
const User = require('../models/users');

const auth =async(req,res,next)=>{
    try {
        const token = req.header('authorization').replace('Bearer ','');
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log("decoded tocken",decodeToken);
       const foundUser = await User.findOne({_id:decodeToken._id,'tokens.token':token})
       if(!foundUser){
           throw new Error();
       }
       req.token = token;
       req.user = foundUser;
       console.log('middlewares.....')
        next();
    } catch (error) {
        res.status(401).send({
            sucess:false,
            message:"plz authenticate"
        });  
    }
}
module.exports=auth;