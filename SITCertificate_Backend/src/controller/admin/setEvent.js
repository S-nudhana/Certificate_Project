import db from "../../db/connection.js";
const setEvent = async (req, res) => {
  try {
    const {eventName, eventOwner, openDate, closeDate, thumbnail, template, excel} = req.body;
    const value = [eventName, eventOwner, openDate, closeDate, thumbnail, template, excel, 0];
    await db
      .promise()
      .query("INSERT INTO `event` (`event_name`, `event_owner`, `event_startDate`, `event_endDate`, `event_thumbnail`, `event_certificate`, `event_excel`, `event_approve`) VALUES (?)", [
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