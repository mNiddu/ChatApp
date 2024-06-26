const jwt = require('jsonwebtoken')
require('dotenv').config()

const fetchAdmin=(req,res,next)=>{
    const UserToken=req.header('auth-token')
    if(!token){
        console.log('Token Not Found')
    }
    try{
        const data = jwt.verify(token,process.env.Key)
        req.admin=data
    }
    catch(err){
        console.log(err)
    }
    
}

module.exports=fetchAdmin