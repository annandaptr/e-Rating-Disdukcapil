const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const ratingController = require("../controllers/ratingController");
const { verifyToken } = require("../middleware/authMiddleware");

// Batasi: max 5 request per 15 menit per IP
const ratingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Terlalu banyak percobaan, coba lagi nanti",
  },
});

router.post("/", ratingLimiter, ratingController.createRating);
router.get("/", verifyToken, ratingController.getAllRatings); 

module.exports = router;