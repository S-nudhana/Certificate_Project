import connection from "../../db/connect.js";
// import { validateToken } from "../auth/jwt.js";
export const setEvent = async (req, res) => {
  try {
    const eventName = req.body.eventName;
    const eventOwner = req.body.eventOwner;
    const eventStartDate = req.body.eventStartDate;
    const eventStopDate = req.body.eventStopDate;
    const eventCover = req.body.eventCover;

    //   const result = await db
    //     .promise()
    //     .query(
    //       "INSERT INTO `users` (`username`, `password`, `firstname`, `lastname`, `email`) VALUES  ?",
    //       [data]
    //     );
    await db
      .promise()
      .query(
        "INSERT INTO `event` (`event_name`, `event_owner`, `event_startDate`, `event_stopDate`, event_cover) VALUES ()"
      );
    return res
      .status(200)
      .json({ success: true, payload: "create event successful" });
  } catch (error) {
    return res.status(400).json({ success: false, payload: error.message });
  }
};
