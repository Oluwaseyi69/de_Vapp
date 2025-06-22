// import { Request, Response, NextFunction } from "express";
// import authService from "../services/AuthService";
// // import { validationResult } from "express-validator";      // ← CORRECT
// import * as validators from "../validators/AuthValidators";
// import validationResult  from "express-validator";

// class AuthController {
//   async register(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> {
//     const errors = validatorLib.validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).json({ errors: errors.array() });
//       return;
//     }

//     try {
//       const user = await authService.registerUser(req.body);
//       res.status(201).json({ message: "User registered successfully", user });
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }

//   async login(req: Request, res: Response, next: NextFunction): Promise<void> {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).json({ errors: errors.array() });
//       return;
//     }

//     try {
//       const { email, password } = req.body;
//       const { token, user } = await authService.loginUser(email, password);
//       res.status(200).json({ message: "Login successful", token, user });
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }
// }

// export default new AuthController();
import { Request, Response, NextFunction } from "express";
import authService from "../services/AuthService";

class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password, role } = req.body;

      if (!name || typeof name !== "string") {
        res
          .status(400)
          .json({ message: "Name is required and must be a string" });
        return;
      }
      if (!email || typeof email !== "string" || !email.includes("@")) {
        res.status(400).json({ message: "A valid email is required" });
        return;
      }
      if (!password || typeof password !== "string" || password.length < 5) {
        res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
        return;
      }

      if (role && role !== "user" && role !== "roomCreator") {
        res
          .status(400)
          .json({ message: "Role must be either 'user' or 'roomCreator'" });
        return;
      }

      const result = await authService.registerUser({
        name,
        email,
        password,
        role,
      });

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || typeof email !== "string" || !email.includes("@")) {
        res.status(400).json({ message: "A valid email is required" });
        return;
      }
      if (!password || typeof password !== "string") {
        res
          .status(400)
          .json({ message: "Password is required and must be a string" });
        return;
      }

      const result = await authService.loginUser(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new AuthController();
