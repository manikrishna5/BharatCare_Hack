import dotenv from "dotenv";
dotenv.config(); // load .env

import connectDB from "../config/db.js";
import Pharmacy from "../models/Pharmacy.js";

const seedPharmacies = async () => {
  try {
    await connectDB();

    // remove old data
    await Pharmacy.deleteMany();

    // insert pharmacies
    await Pharmacy.insertMany([
      {
        name: "Sri Medicals",
        address: "MG Road, Bangalore",
        location: {
          lat: 12.9716,
          lng: 77.5946,
        },
      },
      {
        name: "Apollo Pharmacy",
        address: "BTM Layout, Bangalore",
        location: {
          lat: 12.9166,
          lng: 77.6101,
        },
      },
      {
        name: "HealthPlus",
        address: "Indiranagar, Bangalore",
        location: {
          lat: 12.9784,
          lng: 77.6408,
        },
      },
    ]);

    console.log("Pharmacies seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Pharmacy seeding failed:", error.message);
    process.exit(1);
  }
};

seedPharmacies();