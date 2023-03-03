const UserSignupModel = require('../model/userDetails.js');
module.exports.displayUser= async (req,res)=>{
    let m=await UserSignupModel.find()
    res.send(m)
}