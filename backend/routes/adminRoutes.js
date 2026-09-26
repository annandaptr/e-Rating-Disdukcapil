const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken, requireSuperAdmin } = require("../middleware/authMiddleware");

router.get("/", verifyToken, adminController.getAdmins);
router.post("/", verifyToken, requireSuperAdmin, adminController.createAdmin);
router.put("/:id", verifyToken, requireSuperAdmin, adminController.updateAdmin);
router.delete("/:id", verifyToken, requireSuperAdmin, adminController.deleteAdmin);

module.exports = router;