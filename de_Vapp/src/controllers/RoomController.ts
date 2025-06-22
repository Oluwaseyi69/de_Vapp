import { Request, Response, NextFunction } from "express";
import { RoomService } from "../services/RoomService";
import DecisionRoom from "../models/DecisionRoom";

export const createRoomController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, options, deadline } = req.body;
    const createdBy = req.user?.id;

    if (!createdBy) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const room = await RoomService.createRoom({
      title,
      description,
      options,
      deadline,
      createdBy,
    });

    res.status(201).json({
      message: "Decision room created successfully",
      room,
      shareURL: `http://localhost:3000/vote/${room.roomCode}`,
    });
  } catch (err: any) {
    next(err);
  }
};

export const castVoteController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { roomCode } = req.params;
    const { selectedOption } = req.body;

    let voterId: string;
    if (req.user) {
      voterId = `user:${req.user.id}`;
    } else if (req.guestId) {
      voterId = `guest:${req.guestId}`;
    } else {
      res.status(400).json({ message: "Unable to identify voter." });
      return;
    }

    const result = await RoomService.castVote({
      roomCode,
      selectedOption,
      voterId,
    });
    res.status(200).json(result);
  } catch (err: any) {
    next(err);
  }
};

export const getLiveTalliesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { roomCode } = req.params;
    const userId = req.user?.id;

    const room = await DecisionRoom.findOne({ roomCode });
    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    if (room.createdBy.toString() !== userId) {
      res.status(403).json({
        message:
          "Only the room creator can view live tallies, While voting is going on.",
      });
      return;
    }

    const result = await RoomService.getVoteTallies(roomCode);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const getFinalResultsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { roomCode } = req.params;

    const room = await DecisionRoom.findOne({ roomCode });
    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }
    if (new Date() < room.deadline) {
      res.status(403).json({
        message: "Results are not available until after the deadline.",
      });
      return;
    }

    const result = await RoomService.getVoteTallies(roomCode);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const getRoomByCodeController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { roomCode } = req.params;

    const roomData = await RoomService.getRoomByCode(roomCode);

    res.status(200).json({ room: roomData });
  } catch (err: any) {
    next(err); // Let global error handler manage it
  }
};
