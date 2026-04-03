const express=require('express');
const { register, login } = require('../controllers/authController');
const router=express.router();
router.post('/register',register);
router.post('/login',login);
export default router;
