import { v4 as uuidv4 } from "uuid";
import DecisionRoomModel, {
  DecisionRoomDocument,
} from "../models/DecisionRoom";
import { CreateRoomDTO } from "../dtos/CreateRoomDTO";
import { AppError } from "../Handlers/AppError";

export class RoomService {
  public static async createRoom(
    data: CreateRoomDTO
  ): Promise<DecisionRoomDocument> {
    const { title, description, options, deadline, createdBy } = data;

    if (!title || !description || !Array.isArray(options)) {
      throw new Error("Missing title, description or options");
    }

    if (options.length < 2 || options.length > 5) {
      throw new Error("Options must be between 2 and 5");
    }

    const room = new DecisionRoomModel({
      title,
      description,
      options,
      deadline: new Date(deadline),
      roomCode: uuidv4(),
      createdBy,
      votes: [],
    });

    return await room.save();
  }

  public static async castVote({
    roomCode,
    selectedOption,
    voterId,
  }: CastVoteInput) {
    try {
      const room = await DecisionRoomModel.findOne({ roomCode });

      if (!room) throw new Error("Room not found.");
      if (new Date() > room.deadline) throw new Error("Voting has closed.");

      const hasVoted = room.votes.some((vote) => vote.voterId === voterId);
      if (hasVoted) throw new Error("You have already voted in this room.");

      if (!room.options.includes(selectedOption))
        throw new AppError("Invalid voting option", 500);

      room.votes.push({ option: selectedOption, voterId });
      await room.save();

      return { message: "Vote cast successfully." };
    } catch (error: any) {
      throw new Error(
        error.message || "An error occurred while casting the vote."
      );
    }
  }

  static async getVoteTallies(roomCode: string) {
    const room = await DecisionRoomModel.findOne({ roomCode });

    if (!room) throw new AppError("Room not found", 404);

    const tally: Record<string, number> = {};
    const percentage: Record<string, string> = {};

    // Initialize vote count for each option
    for (const option of room.options) {
      tally[option] = 0;
    }

    // Count actual votes
    for (const vote of room.votes) {
      tally[vote.option] = (tally[vote.option] || 0) + 1;
    }

    const totalVotes = room.votes.length;

    // Calculate percentages
    for (const option of room.options) {
      const count = tally[option];
      const percent = totalVotes === 0 ? 0 : (count / totalVotes) * 100;
      percentage[option] = `${percent.toFixed(2)}%`;
    }

    return {
      roomCode: room.roomCode,
      title: room.title,
      deadline: room.deadline,
      isClosed: new Date() > room.deadline,
      totalVotes,
      tally,
      percentages: percentage,
    };
  }

  static async getRoomByCode(roomCode: string) {
    const room = await DecisionRoomModel.findOne({ roomCode });

    if (!room) {
      throw new Error("Room not found");
    }

    return {
      title: room.title,
      description: room.description,
      options: room.options,
      deadline: room.deadline,
    };
  }
}
