const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  date: { type: String, default: () => new Date().toISOString().split("T")[0] },
  score: { type: Number, default: 0 },
  // Other fields related to the day's habit data
});

const weekSchema = new mongoose.Schema({
  days: [daySchema], // Array of days for a week
});

const habitTrackerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  weeks: [weekSchema], // Array of weeks for the user's habit tracking
});

// Virtual property to determine if a week is complete
weekSchema.virtual("isComplete").get(function () {
  return this.days.length === 7;
});

// Method to create a new week if the current week is complete
habitTrackerSchema.methods.checkAndCreateNewWeek = function () {
  const lastWeek = this.weeks[this.weeks.length - 1];
  if (lastWeek && lastWeek.isComplete) {
    const newWeek = { days: [] };
    this.weeks.push(newWeek);
    return newWeek;
  }
  return null;
};

const HabitTracker = mongoose.model("HabitTracker", habitTrackerSchema);

module.exports = HabitTracker;
