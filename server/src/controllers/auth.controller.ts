import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    res.json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};
export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);   // 👈 ADD THIS
    res.status(500).json({
      message: "Server error"
    });
  }
};