import mongoose, { Document, Schema } from "mongoose";

export interface Vote {
  option: string;
  voterId: string;
}

export interface DecisionRoomDocument extends Document {
  title: string;
  description: string;
  options: string[];
  deadline: Date;
  roomCode: string;
  createdBy: string;
  votes: Vote[];
  createdAt: Date;
}

const DecisionRoomSchema = new Schema<DecisionRoomDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  options: {
    type: [String],
    validate: {
      validator: (val: string[]) => val.length >= 2 && val.length <= 5,
      message: "You must provide between 2 and 5 options",
    },
    required: true,
  },
  deadline: { type: Date, required: true },
  roomCode: { type: String, required: true, unique: true },
  createdBy: { type: String, required: true },
  votes: [
    {
      option: String,
      voterId: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<DecisionRoomDocument>(
  "DecisionRoom",
  DecisionRoomSchema
);
