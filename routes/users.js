const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const regiteredUser = await User.register(user, password);
        req.flash('success', 'Welcome to Yelp Camp');
        res.redirect('/campgrounds');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }

}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome Back');
    res.redirect('/campgrounds');
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged Out');
    res.redirect('/campgrounds');
});

module.exports = router;