// src/routes/auth.routes.ts
import { Router } from "express";
import authController from "../controllers/AuthController";
import {
  registerValidator,
  loginValidator,
} from "../validators/AuthValidators";

const router = Router();

router.post("/register", registerValidator, authController.register);
router.post("/login", loginValidator, authController.login);

export default router;
