import db from "../../db/connection.js";
const setEvent = async (req, res) => {
  console.log("first");
  try {
    const eventName = req.body.eventName;
    const eventOwner = req.body.eventOwner;
    // const eventStartDate = req.body.eventStartDate;
    // const eventStopDate = req.body.eventStopDate;
    // const eventCover = req.body.eventCover;
    //   const result = await db
    //     .promise()
    //     .query(
    //       "INSERT INTO `users` (`username`, `password`, `firstname`, `lastname`, `email`) VALUES  ?",
    //       [data]
    //     );
    console.log("first");
    const insertion = await db
      .promise()
    //   .query(
    //     "INSERT INTO `event` (`event_name`, `event_owner`, `event_startDate`, `event_stopDate`) VALUES (?, ?, ?, ?)",
    //     [eventName, eventOwner, eventStartDate, eventStopDate]
    //   );
    .query(
        "INSERT INTO `event` (event_name, event_owner) VALUES (?, ?)",
        [eventName, eventOwner]
      );
    return res
      .status(200)
      .json({ success: true, payload: "create event successful" });
  } catch (error) {
    return res.status(400).json({ success: false, payload: error.message });
  }
};
export default setEvent;
