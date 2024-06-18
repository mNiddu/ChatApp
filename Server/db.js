const mongoose = require('mongoose')
require('dotenv').config();

const ConnectToMongo=()=>{
    try{
        mongoose.connect(process.env.DataBaseURI)
        console.log("Mongo Connected Successfull")
    }
    catch(err){
        console.log("Mongo Connect Unsuccessfull",err)
    }
}

module.exports =ConnectToMongo