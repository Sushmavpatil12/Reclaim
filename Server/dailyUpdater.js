const mongoose = require("mongoose");
const HabitTracker = require("./models/habitTracks"); // Import the HabitTracker model

async function updateDaySchemaForAllUsers() {
  try {
    const users = await HabitTracker.find({}, "userId weeks.days");
    console.log(users);

    for (const user of users) {
      const currentWeek = user.weeks[user.weeks.length - 1];
      const currentDate = new Date().toISOString().split("T")[0]; // Get today's date without time

      const currentDay = currentWeek.days.find((day) => {
        return day.date === currentDate;
      });

      if (!currentDay) {
        console.log("date is not present need to create");
        const newDay = { date: currentDate, score: 0 };
        currentWeek.days.push(newDay);
      }
    }

    // Save changes to the database
    await Promise.all(users.map((user) => user.save()));

    console.log("DaySchema updated for all users.");
  } catch (error) {
    console.error("Error updating DaySchema:", error);
  }
}

module.exports = updateDaySchemaForAllUsers;
