const express = require('express');
const router =express.Router();
const {Register,Login} = require('../controller/Register')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/Register')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null,  uniqueSuffix + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
router.post('/register',upload.single('profile'),Register)
router.post('/login',Login)

module.exports = router