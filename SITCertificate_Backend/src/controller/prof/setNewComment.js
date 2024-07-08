import db from "../../db/connection.js";
const setNewComment = async (req, res) => {
  try {
    const {eventId, username, detail} = req.body;
    const data = [eventId, username, detail, 0];
    await db
      .promise()
      .query("INSERT INTO `comment` (`event_Id`, `comment_username`, `comment_detail`, `comment_status`) VALUES (?)", [
        data,
      ]);
    return res
      .status(200)
      .json({ success: true, payload: "create comment successful" });
  } catch (error) {
    return res.status(400).json({ success: false, payload: error.message });
  }
};
export default setNewComment;