// types/express/index.d.ts
import { AuthUser } from "../AuthUser";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      guestId?: string;
    }
  }
}
