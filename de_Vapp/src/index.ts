import express from "express";
import cookieParser from "cookie-parser";

import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes";
import roomRoutes from "./routes/RoomRoutes";
import { errorHandler } from "./middleware/ErrorHandlers";

dotenv.config();

const PORT = process.env.PORT;

connectDB();
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", roomRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
