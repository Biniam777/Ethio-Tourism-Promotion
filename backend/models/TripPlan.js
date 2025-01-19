const mongoose = require("mongoose");

const tripPlanSchema = new mongoose.Schema({
  planID: { type: Number, unique: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  destinations: [{ type: String }],
  title: { type: String, required: true },

  // Store the user's username instead of the userID
  username: { type: String, required: true },
});

tripPlanSchema.pre("save", async function (next) {
  if (this.isNew) {
    const latestPlan = await mongoose
      .model("TripPlan")
      .findOne()
      .sort("-planID") // Sort by the latest planID
      .select("planID"); // Only select the planID field

    // If there's a latest plan, increment planID, else start from 1
    this.planID = latestPlan ? latestPlan.planID + 1 : 1;
  }

  // Fetch the user username using the userID (assuming userID is set)
  if (this.userID) {
    const user = await mongoose.model("User").findById(this.userID);
    if (user) {
      this.username = user.username; // Set username from user model
    } else {
      return next(new Error("User not found"));
    }
  }

  next();
});

// Create model
const TripPlan = mongoose.model("TripPlan", tripPlanSchema);

module.exports = TripPlan;
