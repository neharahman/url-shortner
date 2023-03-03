const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const userSignupSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:Number
    },
    userName:{
        type:String
    },
    password:{
        type:String
    },
    urls:[{
        url_id:{
            type:mongoose.Schema.Types.ObjectId
        }
        }]
})

const UserSignupModel = mongoose.model('user_details',userSignupSchema)
module.exports=UserSignupModel