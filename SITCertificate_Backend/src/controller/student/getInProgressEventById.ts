import { Request, Response } from "express";
import db from "../../db/connection";

import type { Event } from "../../types/student";

const getInProgressEventById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const eventId: string = req.params.id;
  try {
    const [rows] = await db.promise().query(
      `SELECT event_id, event_name, event_startDate, event_endDate, event_thumbnail 
         FROM event 
         WHERE event_id = ? 
         AND event_startDate <= NOW() 
         AND event_endDate >= NOW() 
         AND event_approve = 1`,
      [eventId]
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
