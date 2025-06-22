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
exports.getRoomByCodeController = exports.getFinalResultsController = exports.getLiveTalliesController = exports.castVoteController = exports.createRoomController = void 0;
const RoomService_1 = require("../services/RoomService");
const DecisionRoom_1 = __importDefault(require("../models/DecisionRoom"));
const createRoomController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, description, options, deadline } = req.body;
        const createdBy = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!createdBy) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const room = yield RoomService_1.RoomService.createRoom({
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
    }
    catch (err) {
        next(err);
    }
});
exports.createRoomController = createRoomController;
const castVoteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomCode } = req.params;
        const { selectedOption } = req.body;
        let voterId;
        if (req.user) {
            voterId = `user:${req.user.id}`;
        }
        else if (req.guestId) {
            voterId = `guest:${req.guestId}`;
        }
        else {
            res.status(400).json({ message: "Unable to identify voter." });
            return;
        }
        const result = yield RoomService_1.RoomService.castVote({
            roomCode,
            selectedOption,
            voterId,
        });
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.castVoteController = castVoteController;
const getLiveTalliesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { roomCode } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const room = yield DecisionRoom_1.default.findOne({ roomCode });
        if (!room) {
            res.status(404).json({ message: "Room not found" });
            return;
        }
        if (room.createdBy.toString() !== userId) {
            res.status(403).json({
                message: "Only the room creator can view live tallies, While voting is going on.",
            });
            return;
        }
        const result = yield RoomService_1.RoomService.getVoteTallies(roomCode);
        res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        next(err);
    }
});
exports.getLiveTalliesController = getLiveTalliesController;
const getFinalResultsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomCode } = req.params;
        const room = yield DecisionRoom_1.default.findOne({ roomCode });
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
        const result = yield RoomService_1.RoomService.getVoteTallies(roomCode);
        res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        next(err);
    }
});
exports.getFinalResultsController = getFinalResultsController;
const getRoomByCodeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomCode } = req.params;
        const roomData = yield RoomService_1.RoomService.getRoomByCode(roomCode);
        res.status(200).json({ room: roomData });
    }
    catch (err) {
        next(err); // Let global error handler manage it
    }
});
exports.getRoomByCodeController = getRoomByCodeController;
