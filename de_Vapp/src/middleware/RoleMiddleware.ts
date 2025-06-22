// import { Request, Response, NextFunction } from "express";

// export const requireRole = (requiredRole: string) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user;
//     if (!user || user.role !== requiredRole) {
//       return res
//         .status(403)
//         .json({ message: "Forbidden: You do not have the required role" });
//     }
//     next();
//   };
// };

import { Request, Response, NextFunction } from "express";

// Example usage: requireRole("roomcreator")
export const requireRole = (requiredRole: string) => {
  return (req: any, res: Response, next: NextFunction): void => {
    if (req.user?.role !== requiredRole) {
      res.status(403).json({ error: `Access denied. ${requiredRole}s only.` });
      return;
    }
    next(); // only continue if user has required role
  };
};
