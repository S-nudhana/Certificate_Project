import { Request, Response } from "express";
import db from "../../db/connection";
import type { Event } from "../../types/user";

const getHistoryEvent = async (req: Request, res: Response): Promise<void> => {
  const eventName = req.query.eventName;
  try {
    const eventsQuery = await db
      .promise()
      .query(
        `SELECT * FROM event WHERE event_endDate < NOW() AND event_name LIKE ? ORDER BY event_startDate`,
        [`%${eventName}%`]
      );
    const events = eventsQuery[0] as Event[];
    res.json({
      success: true,
      data: {
        history: events,
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
export default getHistoryEvent;
