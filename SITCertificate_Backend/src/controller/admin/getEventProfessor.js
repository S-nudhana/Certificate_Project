import db from "../../db/connection.js";

const getEventProfessor = async (req, res) => {
  try {
    const professorsQuery = await db
      .promise()
      .query(`SELECT professor_fullname FROM professor`);
    const professors = professorsQuery[0];
    return res.json({
      success: true,
      data: {
        professors: professors,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
export default getEventProfessor;
