const UserSignupModel = require('../model/userDetails.js');
const {verifyToken} = require('../other/jwtToken.js');
module.exports.profile= async (req,res)=>{
    try{
        const {authorization}=req.headers
        let jwt=await verifyToken(authorization)
        console.log(jwt.id)

        let profile=await UserSignupModel.findById(jwt.id)
        console.log('hello profile',profile)
        res.status(200).json({
            Name:`${profile.name}`,
            Mobile:profile.mobile,
            urlCount:profile.urls.length,
            urls:profile.urls
        })
    }catch(err){

    }
}