import mongoose from "mongoose";
import dotenv from "dotenv";
import Pharmacy from "../models/Pharmacy.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Pharmacy.insertMany([
  {
    name: "City Care Pharmacy",
    address: "Main Road",
    location: { lat: 12.9716, lng: 77.5946 },
  },
  {
    name: "HealthPlus",
    address: "Ring Road",
    location: { lat: 12.9352, lng: 77.6245 },
  },
  {
    name: "Apollo Pharmacy",
    address: "BTM Layout",
    location: { lat: 12.9166, lng: 77.6101 },
  },
]);

console.log("Pharmacies seeded");
process.exit();
