import db from "../../db/connection.js";
import dotenv from "dotenv";

import { verifyToken } from "../auth/jwt.js";

dotenv.config();

const getGenerateCertificate = async(req, res) => {
    const eventId = parseInt(req.query.id);
    const { token } = req.cookies;
    try {
        const userId = verifyToken(token);
        const studentEmail = userId.student_email;
        const value = [eventId, studentEmail];
        const dataQuery = await db
            .promise()
            .query(
                `SELECT student_eventGenerated FROM student WHERE student_joinedEventId = ? AND student_email = ?`,
                value
            );
        const data = dataQuery[0][0];
        if (data.student_eventGenerated === 1) {
            return res.json({
                success: true,
                data: false,
                error: null,
            });
        }
        return res.json({
            success: true,
            data: true,
            error: null,
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message,
        });
    }
};
export default getGenerateCertificate;