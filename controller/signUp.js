const UserSignupModel = require('../model/userDetails.js');
const rand = require('random-key');

module.exports.signUp = async (req,res) =>{
    try{
        const {name,email,mobile,password} = req.body
        console.log('inside signup',name,email,mobile,password)

        //generating user name
        let random=rand.generateDigits(2).toLocaleLowerCase()
        let username=name.slice(0,4)+random+mobile.slice(mobile.length-4,mobile.length)

        const userModel=new UserSignupModel({
            name,email,mobile,password,userName:username
        })
        let userModel1=await userModel.save()
        res.status(200).json({
            status:'success',
            message:'successfully signup',
            data:userModel1
        })

    }catch(err){
        if(err) console.log('inside signup page',err)
        res.status(400).json({
            status:'fail',
            message:'something went wrong'
        })
    }  
}