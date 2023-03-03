const UserSignupModel = require('../model/userDetails.js');
const {createToken} = require('../other/jwtToken.js');
module.exports.login = async (req,res)=>{
    try{
        let {userName,password}=req.body
        console.log('inside login',userName,password)
        let find_login_data=await UserSignupModel.findOne({userName:userName,password:password})
        console.log(find_login_data)
        let jwt=await createToken(find_login_data._id)
        console.log('inside login ',jwt)
        res.status(200).json({
            status:'success',
            message:'successfully logged in',
            token:jwt
        })
    }catch(err){
        if(err) console.log('inside login',err)
        res.status(400).json({
            status:'fail',
            message:'login fail',
            error:err
        })

    }
}