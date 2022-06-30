//importing dbModels
const User = require("../models/users");


//......................create  users...............//
const addUser = async (req, res) => {
  try {
    const { name,email,password,location} = req.body;
    const user = new User({
        name,
        email,
        password,
        location
    });
    await user.save();
    const tokens = await user.generateAuthToken()
    res.status(200).send({ user,tokens});
  } catch (error) {
    res.status(400).send({
      message:"failed to create user"
    });
  }
};

//.........................login user....................//
const loginUser = async(req,res)=>{
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const tokens = await user.generateAuthToken();
    res.status(201).send({user,tokens});
} catch (error) {
    res.status(400).send({
    error:"unable to get user"
    })
}
}

//....................logout user..................//
const logoutUser = async(req,res)=>{
  try {
    req.user.tokens=req.user.tokens
    .filter((iteratingToken)=>{
      return iteratingToken.token !== req.token 
    })
    await req.user.save()
    res.send({message:"user log out"});
  } catch (error) {
    res.status(400).send({
      message:"unable to logout"
    });
  }
}
module.exports={
    addUser,
    loginUser,
    logoutUser
}
