const UrlModel = require('../model/url_schema.js');
module.exports.getCode= async (req,res)=>{
    try{
        let {code}=req.params
        let find_code_UrlModel=await UrlModel.findOne({code})
        if(find_code_UrlModel){
            res.status(200).json({
            message:'data found',
            data:find_code_UrlModel.longUrl
        })
        }
        else{
            res.status(200).json({
                message:'url not found please try again'})
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