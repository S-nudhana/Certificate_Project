import db from "../../db/connection.js";
import { verifyToken } from "../auth/jwt.js";
const setEvent = async(req, res) => {
    try {
        const { adminToken } = req.cookies;
        const id = verifyToken(adminToken);
        const adminId = id.admin_id;
        const { eventName, eventOwner, openDate, closeDate, thumbnail, template, excel, emailTemplate,inputSize,inputY  } = req.body;
        const value = [eventName, eventOwner, openDate, closeDate, thumbnail, template, excel, 0, adminId, emailTemplate,inputSize,inputY];
        await db
            .promise()
            .query("INSERT INTO `event` (`event_name`, `event_owner`, `event_startDate`, `event_endDate`, `event_thumbnail`, `event_certificate`, `event_excel`, `event_approve`, `event_adminId`, `event_emailTemplate`, `event_certificate_text_size`, `event_certificate_position_y`) VALUES (?)", [
                value,
            ]);
        return res
            .status(200)
            .json({ success: true, payload: "create event successful" });
    } catch (error) {
        return res.status(400).json({ success: false, payload: error.message });
    }
};
export default setEvent;