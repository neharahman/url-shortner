const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const otpSchema=new Schema({
    mobile:{
        type:Number
    },
    otp:{
        type:Number
    },
    ttl:{
        type:Number
    }
})

const OtpModel = mongoose.model('otp',otpSchema)
module.exports=OtpModel