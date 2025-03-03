import { verifyToken } from "../auth/jwt.js";
import db from "../../db/connection.js";

const verifyCookiesToken = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json({ data: { authenticated: false } });
  }
  try {
    const decodeToken = verifyToken(token);
    const role = decodeToken.role;
    let userId, table, column;
    switch (role) {
      case "admin":
        userId = decodeToken.admin_id;
        table = "admin";
        column = "admin_Id";
        break;
      case "professor":
        userId = decodeToken.professor_id;
        table = "professor";
        column = "professor_Id";
        break;
      case "student":
        userId = decodeToken.id;
        table = "student";
        column = "student_Id";
        break;
      default:
        return res.status(200).json({ data: { authenticated: false } });
    }
    const [result] = await db
      .promise()
      .query(`SELECT ${column} FROM ${table} WHERE ${column} = ?`, [userId]);
    if (result.length === 0) {
      return res.status(200).json({ data: { authenticated: false } });
    }
    return res.status(200).json({ data: { authenticated: true, role } });
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ message: "Invalid token" });
  }
};

export default verifyCookiesToken;
