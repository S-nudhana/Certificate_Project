import db from "../../db/connection.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const setNewComment = async (req, res) => {
  try {
    const { profToken } = req.cookies;
    const userId = jwt.verify(profToken, process.env.JWTSecretKey);
    const { eventId, detail } = req.body;
    const dataQuery = await db
      .promise()
      .query(
        "SELECT professor_userName FROM professor WHERE professor_id = ?",
        [userId.professor_id]
      );
    const username = dataQuery[0][0].professor_userName;
    const data = [eventId, username, detail, 0];
    await db
      .promise()
      .query(
        "INSERT INTO `comment` (`event_Id`, `comment_username`, `comment_detail`, `comment_status`) VALUES (?)",
        [data]
      );
    return res
      .status(200)
      .json({ success: true, payload: "create comment successful" });
  } catch (error) {
    return res.status(400).json({ success: false, payload: error.message });
  }
};
export default setNewComment;
