import { Request, Response, NextFunction } from "express";

interface CustomJwtPayload {
  id: number;
  role: string;
}

const roleMiddleware = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user || (req as any).admin;

    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

export default roleMiddleware;
