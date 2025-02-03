import db from "../../db/connection.js";

const getAllInProgressEventById = async(req, res) => {
    const id = req.params.id;
    try {
        const dataQuery = await db
            .promise()
            .query(`SELECT event_Id, event_name, event_startDate, event_endDate, event_thumbnail FROM event WHERE event_Id = ? AND event_startDate <= NOW() AND event_endDate >= NOW() AND event_approve = 1`, [id]);
        const data = dataQuery[0][0];
        return res.json({
            success: true,
            data: data,
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
export default getAllInProgressEventById;