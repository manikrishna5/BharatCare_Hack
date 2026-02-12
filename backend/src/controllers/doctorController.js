import Doctor from "../models/Doctor.js";

// POST /doctors/profile
export const createDoctorProfile = async (req, res) => {
  try {
    const { specialization, availability } = req.body;

    if (!specialization) {
      return res.status(400).json({ message: "Specialization required" });
    }

    const exists = await Doctor.findOne({ userId: req.user.id });
    if (exists) {
      return res.status(400).json({ message: "Doctor profile already exists" });
    }

    const doctor = await Doctor.create({
      userId: req.user.id,
      specialization,
      availability: availability || [],
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /doctors/availability
export const getDoctorsAvailability = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("userId", "name")
      .select("specialization available availability userId");

    const response = doctors.map((d) => ({
      doctorId: d._id,
      doctorName: d.userId?.name || "Unknown",
      specialization: d.specialization,
      available: d.available,
      availability: d.availability || [],
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
