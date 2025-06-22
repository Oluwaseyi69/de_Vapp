import { Request, Response, NextFunction } from "express";

export const requireRole = (requiredRole: string) => {
  console.log(`Role required: ${requiredRole}`);
  return (req: any, res: Response, next: NextFunction): void => {
    if (req.user?.role !== requiredRole) {
      console.log(
        `Access denied. User role: ${req.user?.role}, Required role: ${requiredRole}`
      );
      res.status(403).json({ error: `Access denied. ${requiredRole}s only.` });
      return;
    }
    next();
  };
};
