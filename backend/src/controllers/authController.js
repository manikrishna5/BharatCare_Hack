import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
      role,
    });

    // If doctor, automatically create doctor profile
    if (role === "doctor") {
      await Doctor.create({
        userId: user._id,
        specialization: "Not Provided",
        isApproved: false,
        availability: [],
      });
    }

    res.status(201).json({
      message:
        role === "doctor"
          ? "Doctor account created. Awaiting admin approval."
          : "User registered successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.role === "doctor") {
      const doctorProfile = await Doctor.findOne({ userId: user._id });

      if (!doctorProfile) {
        return res.status(403).json({
          message: "Doctor profile not created yet.",
        });
      }

      if (!doctorProfile.isApproved) {
        return res.status(403).json({
          message: "Your account is under review by admin.",
        });
      }
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
      email: user.email,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};