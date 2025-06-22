"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyVoter = void 0;
const uuid_1 = require("uuid");
// Middleware to attach req.user (if logged in) or req.guestId (if not)
const identifyVoter = (req, res, next) => {
    var _a;
    if (req.user) {
        return next();
    }
    let guestId = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.guestId;
    if (!guestId) {
        guestId = (0, uuid_1.v4)();
        res.cookie("guestId", guestId, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });
    }
    req.guestId = guestId;
    next();
};
exports.identifyVoter = identifyVoter;
