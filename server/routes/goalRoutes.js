const { Router } = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = Router();
const {
  setGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalsControllers");

router.route("").get(protect, getGoals).post(protect, setGoal);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
