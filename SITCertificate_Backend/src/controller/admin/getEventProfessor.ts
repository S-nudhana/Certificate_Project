import { Request, Response } from "express";
import db from "../../db/connection";

const getEventProfessor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const professorsQuery = await db
      .promise()
      .query(`SELECT professor_fullname FROM professor`);

    const professors = professorsQuery[0];
    res.status(200).json({
      success: true,
      data: {
        professors: professors,
      },
    });
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
    return;
  }
};

export default getEventProfessor;
