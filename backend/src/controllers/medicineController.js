import Medicine from "../models/Medicine.js";

// GET /medicines/search?query=para
export const searchMedicines = async (req, res) => {
  try {
    const { query } = req.query;

    const filter = query
      ? { name: { $regex: new RegExp(query.trim(), "i") } }
      : {};

    const medicines = await Medicine.find(filter);
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

