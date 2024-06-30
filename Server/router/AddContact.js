const express = require('express');
const router = express.Router()
const {Contact,GetContact} = require('../controller/AddContact')
const Admin = require('../middleware/Admin')
router.post('/contact',Admin,Contact)
router.get('/getcontact',Admin,GetContact)
module.exports=router