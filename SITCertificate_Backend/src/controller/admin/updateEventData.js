import db from "../../db/connection.js";

const updateEventData = async (req, res) => {
  const { eventName, eventOwner, openDate, closeDate, thumbnail, eventId } = req.body;
  try {
    await db
      .promise()
      .query(
        'UPDATE event SET event_name = ?, event_owner = ?, event_startDate = ?, event_endDate = ?, event_thumbnail = ?, event_approve = ? WHERE event_Id = ?', 
        [eventName, eventOwner, openDate, closeDate, thumbnail, 0, eventId]
      );
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

export default updateEventData;
