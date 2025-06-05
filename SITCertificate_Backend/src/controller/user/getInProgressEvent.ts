import db from "../../db/connection";
import { Request, Response } from "express";
import type { Event } from "../../types/user";

const getInProgressEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventsQuery = await db
      .promise()
      .query(
        `SELECT * FROM event WHERE event_endDate > NOW() ORDER BY event_startDate DESC`
      );
    const events = eventsQuery[0] as Event[];
    res.json({
      success: true,
      data: {
        events: events,
      },
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
export default getInProgressEvent;
