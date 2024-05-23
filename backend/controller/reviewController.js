const Review = require('../model/review'); // Corrected import statement

exports.sendReview = async (req, res) => {
  try {
    const { stars, comment } = req.body;
    const userId = req.user.userId; // Get user id from authentication middleware

    // Save review to database
    await Review.create({
      userId: userId,
      stars: stars,
      comment: comment
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error posting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getAllReviews = async (req, res) => {
    try {
        // Fetch all reviews from the database
        const reviews = await Review.find();

        res.status(200).json({ reviews: reviews });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

