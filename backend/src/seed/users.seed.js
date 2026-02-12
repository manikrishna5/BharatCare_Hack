import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import connectDB from "../config/db.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    await User.deleteMany();

    const passwordHash = await bcrypt.hash("123456", 10);

    await User.insertMany([
      {
        name: "Ramesh Kumar",
        email: "ramesh@email.com",
        passwordHash,
        role: "patient",
      },
      {
        name: "Dr Suresh",
        email: "doctor@email.com",
        passwordHash,
        role: "doctor",
      },
      {
        name: "City Pharmacy",
        email: "pharmacy@email.com",
        passwordHash,
        role: "pharmacy",
      },
    ]);

    console.log("✅ Users seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();