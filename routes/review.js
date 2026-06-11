const express = require("express");
const router = express.Router({ mergeParams: true });

const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const{isLoggedIn, isReviewAuthor}=require("../middleware.js");
const reviewsControllers = require("../controllers/reviews.js");


router.post("/", isLoggedIn, reviewsControllers.createReview);

router.delete("/:reviewId", isLoggedIn,isReviewAuthor,reviewsControllers.deleteReview); 

module.exports = router;