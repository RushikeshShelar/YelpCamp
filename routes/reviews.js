const express = require('express');
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews');
const { validateReview, isLoggedIn, isReviewOwner } = require('../middleware.js');
const router = express.Router({ mergeParams: true });


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewOwner, catchAsync(reviews.deleteReview));

module.exports = router;