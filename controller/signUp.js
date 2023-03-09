const UserSignupModel = require('../model/userDetails.js');
const OtpModel = require('../model/otp.js');
const rand = require('random-key');

module.exports.signUp = async (req,res) =>{
    try{
        const {name,email,mobile,otp} = req.body
        console.log('inside signup',name,email,mobile,otp)

        //generating user name
        let random=rand.generateDigits(2).toLocaleLowerCase()
        let username=name.slice(0,4)+random+mobile.slice(mobile.length-4,mobile.length)
        
        if(!otp){
            console.log('otp not found')
            let otp1=rand.generateDigits(6)
            let OtpModel1=new OtpModel({
                mobile,
                otp:otp1,
                ttl:+new Date().setMinutes(new Date().getMinutes() + Number(5))
            })
            await OtpModel1.save()
            console.log('please entered otp',otp)
            res.status(200).json({
                message:`an otp has been sent to mobile :${mobile}, please enter to continue it will only valid for 5 minutes`
            })
        }
        if(otp)
        {
            console.log('otp found',otp)
            let checkOtp1= await checkOtp(mobile,otp)
            if(checkOtp1)
            {
                const userModel=new UserSignupModel({
                    name,email,mobile,userName:username
                })
                let userModel1=await userModel.save()
                res.status(200).json({
                    status:'success',
                    message:'successfully signup',
                    data:userModel1
                })

            }
            else{
                res.status(400).json({
                    status:'fail',
                    message:'incorrect otp'
                })
            }    
            
        }
        

    }catch(err){
        if(err) console.log('inside signup page',err)
        res.status(400).json({
            status:'fail',
            message:'something went wrong'
        })
    }  
}
async function checkOtp(mobile,otp){
    let find_otp=await OtpModel.findOne({mobile})
    console.log('checkotp',mobile,otp,find_otp)
    if(find_otp)
    {
        if(find_otp.otp==otp ) return true
        else return false
    }
    return false

}