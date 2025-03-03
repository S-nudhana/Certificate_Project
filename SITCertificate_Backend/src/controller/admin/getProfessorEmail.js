import db from "../../db/connection.js";

const getProfessorEmail = async (req, res) => {
  const eventId = req.params.id;
  try {
    const professorEmailQuery = await db
      .promise()
      .query(
        `SELECT professor_email FROM professor WHERE professor_fullname in (SELECT event_owner FROM event WHERE event_Id = ?)`,
        [eventId]
      );
    const professorEmail = professorEmailQuery[0][0];
    return res.status(200).json({
      success: true,
      data: {
        professorEmail: professorEmail,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      error: "Internal server error",
    });
  }
};
export default getProfessorEmail;
