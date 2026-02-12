import Pharmacy from "../models/Pharmacy.js";
import { calculateDistance } from "../utils/distance.js";

// GET /pharmacies/nearest?lat=..&lng=..
export const getNearestPharmacies = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: "lat and lng are required" });
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    const pharmacies = await Pharmacy.find();

    const result = pharmacies.map((pharmacy) => {
      const distance = calculateDistance(
        userLat,
        userLng,
        pharmacy.location.lat,
        pharmacy.location.lng
      );

      return {
        _id: pharmacy._id,
        name: pharmacy.name,
        address: pharmacy.address,
        distance: Number(distance.toFixed(2)), // km
      };
    });

    result.sort((a, b) => a.distance - b.distance);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
