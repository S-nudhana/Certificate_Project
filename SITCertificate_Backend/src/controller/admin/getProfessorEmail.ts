import { Request, Response } from "express";
import db from "../../db/connection";

interface Professor {
  professor_email: string;
}

const getProfessorEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const eventId = req.params.id;

  try {
    const [rows] = await db
      .promise()
      .query(
        `SELECT professor_email FROM professor WHERE professor_fullname IN (SELECT event_owner FROM event WHERE event_Id = ?)`,
        [eventId]
      );
    const professorData = rows as Professor[];

    if (professorData.length === 0) {
      res.status(404).json({
        success: false,
        error: "Professor not found for this event",
      });
      return;
    }

    const professorEmail = professorData[0].professor_email;

    res.status(200).json({
      success: true,
      data: {
        professorEmail: professorEmail,
      },
    });
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Internal server error",
    });
    return;
  }
};

export default getProfessorEmail;
