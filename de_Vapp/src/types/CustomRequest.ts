// types/CustomRequest.ts
import { Request } from "express";
import { AuthUser } from "./AuthUser";

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}
