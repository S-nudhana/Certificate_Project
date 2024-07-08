import db from "../../db/connection.js";
const updateApproveStatus = async (req, res) => {
  const { eventId } = req.body;
  try {
    await db
      .promise()
      .query("UPDATE event SET event_approve = ? WHERE event_Id = ?", 
      [1, eventId]);
    return res.json({
      success: true,
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
export default updateApproveStatus;
