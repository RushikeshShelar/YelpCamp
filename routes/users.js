const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../controllers/auth');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

router.get('/register', auth.renderRegisterForm);

router.post('/register', catchAsync(auth.registerUser));

router.get('/login', auth.renderLoginForm);

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), auth.loginUser);

router.get('/logout', auth.logoutUser);

module.exports = router;