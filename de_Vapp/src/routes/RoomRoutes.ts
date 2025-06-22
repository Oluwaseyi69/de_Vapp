import express from "express";
import {
  castVoteController,
  createRoomController,
  getFinalResultsController,
  getLiveTalliesController,
  getRoomByCodeController,
} from "../controllers/RoomController";
import { authenticate } from "../middleware/AuthMiddleware"; // Adds req.user
import { requireRole } from "../middleware/RoleMiddleware";
import { identifyVoter } from "../middleware/IdentifyVoter";

const router = express.Router();

// Only users with "roomcreator" role can create a decision room
router.post(
  "/create",
  authenticate,
  requireRole("roomcreator"),
  createRoomController
);

router.post("/:roomCode/vote", identifyVoter, castVoteController);
router.get("/:roomCode", getRoomByCodeController);
router.get("/:roomCode/live-tallies", authenticate, getLiveTalliesController);
router.get("/:roomCode/results", getFinalResultsController);

export default router;
