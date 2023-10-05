const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campground');
const { isLoggedIn, isOwner, validateCampground } = require('../middleware');

router.get('/', catchAsync(campgrounds.index));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))

router.get('/:id', catchAsync(campgrounds.showCampground));

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(campgrounds.renderEditForm));

router.put('/:id', isLoggedIn, isOwner, validateCampground, catchAsync(campgrounds.updateCampground));

router.delete('/:id', isLoggedIn, isOwner, catchAsync(campgrounds.deleteCampground));

module.exports = router;