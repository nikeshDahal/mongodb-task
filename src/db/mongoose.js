//........................for database connection...............//
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_KEY,(err)=>{
    if(err){
        return({
            "message":"error in connecting server"
        })
    }

});
