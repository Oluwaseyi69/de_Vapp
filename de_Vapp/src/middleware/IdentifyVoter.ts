import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

export const identifyVoter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    return next();
  }

  let guestId = req.cookies?.guestId;

  if (!guestId) {
    guestId = uuidv4();
    res.cookie("guestId", guestId, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
  }

  req.guestId = guestId;
  next();
};
