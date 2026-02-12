import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Medicine from "../models/Medicine.js";
import Pharmacy from "../models/Pharmacy.js";

const seedMedicines = async () => {
  try {
    await connectDB();

    await Medicine.deleteMany();

    const pharmacy = await Pharmacy.findOne();

    if (!pharmacy) {
      console.log("No pharmacy found");
      process.exit(1);
    }

    await Medicine.insertMany([
      {
        name: "Paracetamol",
        manufacturer: "ABC Pharma",
        prescriptionRequired: false,
        pharmacy: pharmacy._id,
      },
      {
        name: "Crocin",
        manufacturer: "GSK",
        prescriptionRequired: false,
        pharmacy: pharmacy._id,
      },
      {
        name: "Amoxicillin",
        manufacturer: "XYZ Labs",
        prescriptionRequired: true,
        pharmacy: pharmacy._id,
      },
    ]);

    console.log("Medicines seeded with pharmacy successfully");
    process.exit();
  } catch (error) {
    console.error("Medicine seeding failed:", error.message);
    process.exit(1);
  }
};

seedMedicines();