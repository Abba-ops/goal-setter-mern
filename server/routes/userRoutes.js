const { Router } = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} = require("../controllers/userControllers");

const router = Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getUser);

module.exports = router;
