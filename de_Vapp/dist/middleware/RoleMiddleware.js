"use strict";
// import { Request, Response, NextFunction } from "express";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
// Example usage: requireRole("roomcreator")
const requireRole = (requiredRole) => {
    return (req, res, next) => {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== requiredRole) {
            res.status(403).json({ error: `Access denied. ${requiredRole}s only.` });
            return;
        }
        next(); // only continue if user has required role
    };
};
exports.requireRole = requireRole;
