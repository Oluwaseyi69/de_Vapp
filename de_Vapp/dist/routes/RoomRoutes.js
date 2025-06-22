"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RoomController_1 = require("../controllers/RoomController");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware"); // Adds req.user
const RoleMiddleware_1 = require("../middleware/RoleMiddleware");
const IdentifyVoter_1 = require("../middleware/IdentifyVoter");
const router = express_1.default.Router();
// Only users with "roomcreator" role can create a decision room
router.post("/create", AuthMiddleware_1.authenticate, (0, RoleMiddleware_1.requireRole)("roomcreator"), RoomController_1.createRoomController);
router.post("/:roomCode/vote", IdentifyVoter_1.identifyVoter, RoomController_1.castVoteController);
router.get("/:roomCode", RoomController_1.getRoomByCodeController);
router.get("/:roomCode/live-tallies", AuthMiddleware_1.authenticate, RoomController_1.getLiveTalliesController);
router.get("/:roomCode/results", RoomController_1.getFinalResultsController);
exports.default = router;
