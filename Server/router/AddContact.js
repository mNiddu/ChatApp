const express = require('express');
const router = express.Router()
const {Contact} = require('../controller/AddContact')
const Admin = require('../middleware/Admin')
router.post('/contact',Admin,Contact)
module.exports=router