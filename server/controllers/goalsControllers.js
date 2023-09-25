const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const mongoose = require("mongoose");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user._id });
  res.status(200).json(goals);
});

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ message: "Please add a text field" });
  } else {
    const goal = await Goal.create({
      text: req.body.text,
      user: req.user._id,
    });
    res.status(201).json(goal);
  }
});

const updateGoal = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ message: "Invalid object ID" });
  } else {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      res.status(404).json({ message: "Goal not found" });
    } else if (!req.user) {
      res.status(401).json({ message: "User not found" });
    } else if (goal.user.toString() !== req.user.id) {
      res.status(401).json({ message: "User not authorized" });
    } else {
      const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedGoal);
    }
  }
});

const deleteGoal = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ message: "Invalid object ID" });
  } else {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      res.status(404).json({ message: "Goal not found" });
    } else if (!req.user) {
      res.status(401).json({ message: "User not found" });
    } else if (goal.user.toString() !== req.user.id) {
      res.status(401).json({ message: "User not authorized" });
    } else {
      await goal.deleteOne();
      res.status(200).json({ id: req.params.id });
    }
  }
});

module.exports = {
  setGoal,
  getGoals,
  deleteGoal,
  updateGoal,
};
