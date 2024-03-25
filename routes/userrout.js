const express=require('express');
const { getusers, signup, login } = require('../controllers/usercontrol');
const router=express.Router();

router.get('/',getusers)
router.post('/signup',signup)
router.post('/login',login)
module.exports=router;