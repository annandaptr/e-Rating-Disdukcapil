const express = require("express");
const router = express.Router();
const pelayananController = require("../controllers/pelayananController");

// GET /api/pelayanan
router.get("/", pelayananController.getPelayanan);

module.exports = router;