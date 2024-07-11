import db from "../../db/connection.js";
const setEvent = async (req, res) => {
  try {
    const {eventName, eventOwner, openDate, closeDate, thumbnail,template} = req.body;
    const data = [eventName, eventOwner, openDate, closeDate, thumbnail, 0, template];
    await db
      .promise()
      .query("INSERT INTO `event` (`event_name`, `event_owner`, `event_startDate`, `event_endDate`, `event_thumbnail`, `event_approve`, `event_certificate`) VALUES (?)", [
        data,
      ]);
    return res
      .status(200)
      .json({ success: true, payload: "create event successful" });
  } catch (error) {
    return res.status(400).json({ success: false, payload: error.message });
  }
};
export default setEvent;