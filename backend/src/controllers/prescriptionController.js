import Prescription from "../models/Prescription.js";

// POST /prescriptions/create
export const createPrescription = async (req, res) => {
  try {
    const { patientId, medicines, notes } = req.body;

    if (!patientId || !medicines || medicines.length === 0) {
      return res.status(400).json({ message: "Invalid prescription data" });
    }

    const prescription = await Prescription.create({
      doctorId: req.user.id,
      patientId,
      medicines,
      notes,
    });

    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /prescriptions/my
export const getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      patientId: req.user.id,
    }).populate("medicines.medicineId", "name");

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
