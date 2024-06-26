const ConnectToMongo = require('./db')
const express =require('express')
const cors = require('cors')
require('dotenv').config()

const app=express()
app.use(cors())
app.use(express.json())
app.use('/api/Chat',require('./router/Register'))
app.use('/api/usercontact',require('./router/AddContact'))
ConnectToMongo()
const port=process.env.PORT
app.listen(port,()=>console.log('Server is running on port '+port))
