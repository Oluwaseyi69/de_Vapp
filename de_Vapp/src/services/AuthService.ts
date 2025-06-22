import User from "../models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

class AuthService {
  async registerUser(data: {
    name: string;
    email: string;
    password: string;
    role?: "roomCreator" | "user";
  }) {
    const existing = await User.findOne({ email: data.email });
    if (existing) throw new Error("User already exists");

    const hashed_password = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      name: data.name,
      email: data.email,
      hashed_password,
      role: data.role || "user",
    });
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const userObject = user.toObject() as any;

    delete userObject.hashed_password;

    return {
      user: userObject,
      token,
    };
  }

  async loginUser(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const { hashed_password, ...safeUser } = user.toObject();

    return { token, user: safeUser };
  }
}

export default new AuthService();
