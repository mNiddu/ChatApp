const ConnectToMongo = require('./db')
const express =require('express')
require('dotenv').config()

const app=express()
app.use(express.json())
ConnectToMongo()
const port=process.env.PORT
app.listen(port,()=>console.log('Server is running on port '+port))
