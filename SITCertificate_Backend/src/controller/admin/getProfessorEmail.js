import db from "../../db/connection.js";

const getProfessorEmail = async (req, res) => {
  const eventId = req.query.id;
  try {
    const dataQuery = await db
      .promise()
      .query(
        `SELECT professor_email FROM professor WHERE professor_userName in (SELECT event_owner FROM event WHERE event_Id = ?)`,
        [eventId]
      );
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
export default getProfessorEmail;
