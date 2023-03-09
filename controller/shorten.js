const UrlModel = require('../model/url_schema.js');
const UserSignupModel = require('../model/userDetails.js');
const dotenv = require('dotenv');
const {verifyToken} = require('../other/jwtToken.js');
const rand = require('random-key');
dotenv.config({path:'.././config.env'})

module.exports.shorten = async (req,res)=>{
    const PORT=`${process.env.PORT}`
    console.log(PORT)
    try{
        const {longUrl}=req.body
        const {authorization}=req.headers

        let jwt=await verifyToken(authorization)
        console.log(jwt.id)

        //now checking if the user has signup or not
        if(jwt.id)
        {
            //finding if the longUrl is present
            let find_longUrl=await UrlModel.findOne({longUrl})

            //if the longUrl is not there in the database then adding it to database
            if(!find_longUrl){

                let code=rand.generate(6)
                let shorten_UrlModel=await new UrlModel({
                    longUrl,
                    shortUrl:`localhost:${PORT}/redirect/${code}`,
                    code
                })
                let save_shorten_UrlModel=await shorten_UrlModel.save()
                console.log('url id',save_shorten_UrlModel)
                //so now i am adding the id of the url in my userDetails model
                //to track how many url the user has been added to the urlModel
                let find_UserSignupModel=await UserSignupModel.findById({_id:jwt.id})
                if(find_UserSignupModel){
                    console.log('amar',find_UserSignupModel)
                    find_UserSignupModel['urls'].push({url_id:save_shorten_UrlModel.id})
                    console.log('updated user',find_UserSignupModel)
                    await UserSignupModel.findByIdAndUpdate({_id:jwt.id},find_UserSignupModel)
                }
                res.status(200).json({
                    status:'success',
                    message:'url shortner created',
                    data:save_shorten_UrlModel  
                })
            }
            else{
                //if the longUrl found in database i am returning shortUrl
                res.status(200).json({
                   status: 'success',
                   message:'longUrl_found',
                   data:find_longUrl.shortUrl
                })
            }
        }
    }catch(err){
        if(err) console.log('inside shortenUrl',err)
        res.status(400).json({
            status:'fail',
            message:'shortenUrl fail',
            error:err
        })

    }
}