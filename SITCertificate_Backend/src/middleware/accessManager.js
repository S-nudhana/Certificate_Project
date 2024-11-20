import { verifyToken } from "../controller/auth/jwt.js";

export const accessManager = (requiredRoles = []) => (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    const decoded = verifyToken(token);
    const role = decoded.role;
    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }

    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};
