import { verifyToken } from "../auth/jwt";
import db from "../../db/connection";
import { Request, Response } from "express";

const verifyCookiesToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.cookies.token;
  if (!token) {
    res.status(200).json({ data: { authenticated: false } });
    return;
  }
  try {
    const decodeToken = verifyToken(token);
    const role = typeof decodeToken !== "string" ? decodeToken.role : undefined;
    let userId, table, column;
    switch (role) {
      case "admin":
        if (typeof decodeToken !== "string") {
          userId = decodeToken.admin_id;
        }
        table = "admin";
        column = "admin_Id";
        break;
      case "professor":
        if (typeof decodeToken !== "string") {
          userId = decodeToken.professor_id;
        }
        table = "professor";
        column = "professor_Id";
        break;
      case "student":
        if (typeof decodeToken !== "string") {
          userId = decodeToken.id;
        }
        table = "student";
        column = "student_Id";
        break;
      default:
        res.status(200).json({ data: { authenticated: false } });
        return;
    }
    const [result]: any[] = await db
      .promise()
      .query(`SELECT ${column} FROM ${table} WHERE ${column} = ?`, [userId]);
    if (result.length === 0) {
      res.status(200).json({ data: { authenticated: false } })
      return;
    }
    res.status(200).json({ data: { authenticated: true, role } });
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Invalid token" })
    return;
  }
};

export default verifyCookiesToken;
