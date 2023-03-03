const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const urlSchema = new Schema({
    longUrl:{
        type:String
    },
    shortUrl:{
        type:String
    },
    code:{
        type:String
    }
})

const UrlModel = mongoose.model('url-shortner',urlSchema)
module.exports = UrlModel