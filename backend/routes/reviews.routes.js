
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const reviewController = require('../controller/reviewController');

router.post("/api/reviews/send", authMiddleware.isAuth, reviewController.sendReview);
router.get("/api/reviews", authMiddleware.isAuth, authMiddleware.isAdmin, reviewController.getAllReviews);
module.exports = router;
