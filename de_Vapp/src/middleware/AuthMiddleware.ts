import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
dotenv.config();
import { AuthUser } from "../types/AuthUser";

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}
export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    const JWT_SECRET =
      process.env.JWT_SECRET || "wbcsnbcwcbwnemdedbebnq09y2v2b22nnnqaqws2cvvdb";

    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    // Attach decoded user info to the request
    req.user = decoded;
    next(); // ✅ pass to controller
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
