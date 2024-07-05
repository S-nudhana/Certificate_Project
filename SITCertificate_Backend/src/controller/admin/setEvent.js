import db from "../../db/connection.js";
const setEvent = async (req, res) => {
  try {
    const {eventName, eventOwner, openDate, closeDate, thumbnail} = req.body;
    const data = [eventName, eventOwner, openDate, closeDate, thumbnail, 0];
    await db
      .promise()
      .query("INSERT INTO `event` (`event_name`, `event_owner`, `event_startDate`, `event_endDate`, `event_thumbnail`, `event_approve`) VALUES (?)", [
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

// import db from "../../db/connection.js";

// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage() });

// const setEvent = async (req, res) => {
//   try {
//     const {eventName, eventOwner, openDate, closeDate} = req.body;
//     const thumbnail = req.buffer.toString("base64");
//     const data = [eventName, eventOwner, openDate, closeDate, thumbnail, 0];
//     const query = await db
//       .promise()
//       .query("INSERT INTO `event` (`event_name`, `event_owner`, `event_startDate`, `event_endDate`, `event_thumbnail`, `event_approve`) VALUES (?)", [
//         data,
//       ]);
//     return res
//       .status(200)
//       .json({ success: true, payload: "create event successful" });
//   } catch (error) {
//     return res.status(400).json({ success: false, payload: error.message });
//   }
// };
// export default setEvent;
