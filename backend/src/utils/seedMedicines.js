import mongoose from "mongoose";
import dotenv from "dotenv";
import Medicine from "../models/Medicine.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Medicine.insertMany([
  {
    name: "Paracetamol",
    manufacturer: "ABC Pharma",
    prescriptionRequired: false,
  },
  {
    name: "Amoxicillin",
    manufacturer: "XYZ Pharma",
    prescriptionRequired: true,
  },
]);

console.log("Medicines seeded");
process.exit();
