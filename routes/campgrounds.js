const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campground');
const { isLoggedIn, isOwner, validateCampground } = require('../middleware');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put( isLoggedIn, isOwner, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isOwner, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(campgrounds.renderEditForm));

module.exports = router;