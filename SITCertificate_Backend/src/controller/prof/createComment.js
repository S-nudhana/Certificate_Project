import db from "../../db/connection.js";
import dotenv from "dotenv";

import { verifyToken } from "../auth/jwt.js";

dotenv.config();

const setNewComment = async(req, res) => {
    const { eventId, detail } = req.body;
    const { token } = req.cookies;
    try {
        const userId = verifyToken(token);
        const dataQuery = await db
            .promise()
            .query(
                "SELECT professor_userName FROM professor WHERE professor_id = ?", [userId.professor_id]
            );
        const username = dataQuery[0][0].professor_userName;
        const data = [eventId, username, detail, 0];
        await db
            .promise()
            .query(
                "INSERT INTO comment (comment_eventId, comment_username, comment_detail, comment_status) VALUES (?)", [data]
            );
        return res
            .status(200)
            .json({ success: true, message: "เพิ่มความคิดเห็นสำเร็จ" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(400).json({ success: false, message: "Internal server error" });
    }
};
export default setNewComment;