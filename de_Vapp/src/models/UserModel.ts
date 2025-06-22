import { Schema, model, Document } from "mongoose";
type UserRole = "roomCreator" | "user";

export interface IUser extends Document {
  name: string;
  email: string;
  hashed_password: string;
  role?: UserRole;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    hashed_password: { type: String, required: true },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
