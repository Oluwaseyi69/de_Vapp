"use strict";
// import { Request, Response, NextFunction } from "express";
// import authService from "../services/AuthService";
// // import { validationResult } from "express-validator";      // ← CORRECT
// import * as validators from "../validators/AuthValidators";
// import validationResult  from "express-validator";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("../services/AuthService"));
class AuthController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const result = yield AuthService_1.default.registerUser({
                    name,
                    email,
                    password,
                    role,
                });
                res.status(201).json(result);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const result = yield AuthService_1.default.loginUser(email, password);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.default = new AuthController();
