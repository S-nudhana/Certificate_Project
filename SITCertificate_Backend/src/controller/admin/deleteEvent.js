import db from "../../db/connection.js";

const deleteEvent = async (req, res) => {
  const id = req.query.id;
  try {
    await db.promise().query(`DELETE FROM event WHERE event_Id = ?`, [id]);
    await db.promise().query(`DELETE FROM comment WHERE event_Id = ?`, [id]);
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
export default deleteEvent;
