const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../controllers/auth');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

router.route('/register')
    .get(auth.renderRegisterForm)
    .post(catchAsync(auth.registerUser));

router.route('/login')
    .get(auth.renderLoginForm)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), auth.loginUser);

router.get('/logout', auth.logoutUser);

module.exports = router;