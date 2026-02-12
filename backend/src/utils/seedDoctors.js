import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

// Create users if not present
const dr1 = await User.findOneAndUpdate(
  { email: "doc1@test.com" },
  { name: "Dr Rao", email: "doc1@test.com", passwordHash: "x", role: "doctor" },
  { upsert: true, new: true }
);

const dr2 = await User.findOneAndUpdate(
  { email: "doc2@test.com" },
  { name: "Dr Mehta", email: "doc2@test.com", passwordHash: "x", role: "doctor" },
  { upsert: true, new: true }
);

await Doctor.deleteMany({});
await Doctor.insertMany([
  {
    userId: dr1._id,
    specialization: "Cardiology",
    available: true,
    availability: [{ day: "Mon", from: "09:00", to: "13:00" }],
  },
  {
    userId: dr2._id,
    specialization: "General",
    available: false,
    availability: [{ day: "Tue", from: "10:00", to: "14:00" }],
  },
]);

console.log("Doctors seeded");
process.exit();
