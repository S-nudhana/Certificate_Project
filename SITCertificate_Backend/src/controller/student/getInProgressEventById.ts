import { Request, Response } from "express";
import db from "../../db/connection";

interface Event {
  event_Id: number;
  event_name: string;
  event_startDate: string;
  event_endDate: string;
  event_thumbnail: string;
}

const getInProgressEventById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  try {
    const [rows] = await db.promise().query(
      `SELECT event_Id, event_name, event_startDate, event_endDate, event_thumbnail 
         FROM event 
         WHERE event_Id = ? 
         AND event_startDate <= NOW() 
         AND event_endDate >= NOW() 
         AND event_approve = 1`,
      [id]
    );
    const event = (rows as Event[])[0];

    if (!event) {
      res.status(400).json({
        success: false,
        message: "ไม่พบกิจกรรม",
      });
      return;
    }

    res.json({
      success: true,
      data: {
        event: event,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getInProgressEventById;
