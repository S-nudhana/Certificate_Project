import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../controller/auth/jwt";

interface DecodedToken {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;
  try {
    if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
    }
    const decoded = verifyToken(token);
    if (decoded && typeof decoded === "object" && ["admin", "professor", "student"].includes(decoded.role)) {
      req.user = decoded as DecodedToken;
    } else {
      res.status(400).json({ message: "Invalid token structure." });
    }
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
