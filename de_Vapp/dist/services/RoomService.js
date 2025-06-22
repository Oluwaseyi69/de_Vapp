"use strict";
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
exports.RoomService = void 0;
const uuid_1 = require("uuid");
const DecisionRoom_1 = __importDefault(require("../models/DecisionRoom"));
const AppError_1 = require("../Handlers/AppError");
class RoomService {
    static createRoom(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, options, deadline, createdBy } = data;
            if (!title || !description || !Array.isArray(options)) {
                throw new Error("Missing title, description or options");
            }
            if (options.length < 2 || options.length > 5) {
                throw new Error("Options must be between 2 and 5");
            }
            const room = new DecisionRoom_1.default({
                title,
                description,
                options,
                deadline: new Date(deadline),
                roomCode: (0, uuid_1.v4)(),
                createdBy,
                votes: [],
            });
            return yield room.save();
        });
    }
    static castVote(_a) {
        return __awaiter(this, arguments, void 0, function* ({ roomCode, selectedOption, voterId, }) {
            try {
                const room = yield DecisionRoom_1.default.findOne({ roomCode });
                if (!room)
                    throw new Error("Room not found.");
                if (new Date() > room.deadline)
                    throw new Error("Voting has closed.");
                const hasVoted = room.votes.some((vote) => vote.voterId === voterId);
                if (hasVoted)
                    throw new Error("You have already voted in this room.");
                if (!room.options.includes(selectedOption))
                    throw new AppError_1.AppError("Invalid voting option", 500);
                room.votes.push({ option: selectedOption, voterId });
                yield room.save();
                return { message: "Vote cast successfully." };
            }
            catch (error) {
                throw new Error(error.message || "An error occurred while casting the vote.");
            }
        });
    }
    static getVoteTallies(roomCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield DecisionRoom_1.default.findOne({ roomCode });
            if (!room)
                throw new AppError_1.AppError("Room not found", 404);
            const tally = {};
            const percentage = {};
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
        });
    }
    static getRoomByCode(roomCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield DecisionRoom_1.default.findOne({ roomCode });
            if (!room) {
                throw new Error("Room not found");
            }
            return {
                title: room.title,
                description: room.description,
                options: room.options,
                deadline: room.deadline,
            };
        });
    }
}
exports.RoomService = RoomService;
