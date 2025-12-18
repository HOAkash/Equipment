import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["Machine", "Vessel", "Tank", "Mixer"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Under Maintenance"],
    required: true,
  },
  lastCleaned: { type: Date, required: true },
});

export default mongoose.model("Equipment", equipmentSchema);
