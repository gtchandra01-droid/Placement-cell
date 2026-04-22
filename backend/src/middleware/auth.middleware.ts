import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/* ---------------- JWT Auth Middleware ---------------- */

interface JwtPayload {
  id: number;
  role: string;
  email?: string;
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // Attach user to request - use both admin and user for compatibility
    (req as any).admin = decoded;
    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// Export both default and named export for compatibility
export default authMiddleware;
export const authenticateToken = authMiddleware;