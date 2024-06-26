const express = require('express');
const router = express.Router()
const {Contact} = require('../controller/AddContact')

router.post('/contact',Contact)
module.exports=router