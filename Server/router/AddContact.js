const express = require('express');
const router = express.Router()
const {Contact,GetContact,GetStatus} = require('../controller/AddContact')
const Admin = require('../middleware/Admin')
router.post('/contact',Admin,Contact)
router.post('/request',GetStatus)
router.get('/getcontact',Admin,GetContact)
module.exports=router