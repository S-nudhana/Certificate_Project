import { Request, Response } from "express";
import db from "../../db/connection";
import type { Event } from "../../types/user";

const getSearchEvent = async (req: Request, res: Response): Promise<void> => {
  const eventName = req.query.eventName as string;
  try {
    const dataQuery = await db
      .promise()
      .query(
        `SELECT * FROM event WHERE event_name LIKE ? AND event_endDate > NOW() ORDER BY event_startDate`,
        [`%${eventName}%`]
      );
    const data = dataQuery[0] as Event[];
    res.json({
      success: true,
      data: {
        events: data,
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

export default getSearchEvent;
