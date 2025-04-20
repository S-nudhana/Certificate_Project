import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../controller/auth/jwt";

interface DecodedToken {
  role: string;
}

export const accessManager =
  (requiredRoles: string[] = []) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;
    try {
      if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
      }
      const decoded = verifyToken(token) as unknown as DecodedToken;
      if (!decoded || !decoded.role) {
        res.status(400).json({ message: "Invalid token structure." });
        return;
      }
      const role = decoded.role;

      if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
        res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
        return;
      }
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token." });
      return; 
    }
  };
