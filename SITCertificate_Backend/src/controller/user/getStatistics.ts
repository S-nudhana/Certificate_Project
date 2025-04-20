import { Request, Response } from "express";
import db from "../../db/connection";

interface StatisticsResponse {
  participantsAmount: number;
  participantsDownloadAmount: number;
}

const getStatistics = async (req: Request, res: Response): Promise<void> => {
  const eventId = req.query.eventId as string;
  try {
    const participantsAmountQuery = await db
      .promise()
      .query(
        `SELECT COUNT(*) AS participantsAmount FROM student_event WHERE student_event_eventId = ?`,
        [eventId]
      );

    const participantsAmount = parseInt(
      (participantsAmountQuery[0] as [{ participantsAmount: string }])[0]
        .participantsAmount
    );

    const participantsDownloadAmountQuery = await db
      .promise()
      .query(
        `SELECT COUNT(*) AS participantsDownloadAmount FROM student_event WHERE student_event_eventId = ? AND student_event_eventCertificateGenerated = 1`,
        [eventId]
      );

    const participantsDownloadAmount = parseInt(
      (
        participantsDownloadAmountQuery[0] as [
          { participantsDownloadAmount: string }
        ]
      )[0].participantsDownloadAmount
    );

    const response: StatisticsResponse = {
      participantsAmount,
      participantsDownloadAmount,
    };

    res.json({
      success: true,
      data: response,
    });
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};

export default getStatistics;
