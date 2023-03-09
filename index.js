const express = require('express')
const mongoose = require('mongoose');
const app=express()
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const url_api_routes = require('./route/url_apis.js');

//body parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//env configuration
dotenv.config({path:'./config.env'})

//database connection
let db=process.env.DB.replace('<password>',process.env.PASSWORD).replace('<username>',process.env.USER_NAME)
mongoose.set('strictQuery', false)
let db_con=mongoose.connect(db)
db_con.then(()=>console.log('databse connected successfully')).catch((err)=>{if(err) console.log(err)})

//routes
app.get('/',(req,res)=>{
    console.log('hello res')
    res.send('hello url')
})
app.use('/',url_api_routes)

app.listen(process.env.PORT,()=>{
    console.log('listen to the server')
})


//switch to dev branch