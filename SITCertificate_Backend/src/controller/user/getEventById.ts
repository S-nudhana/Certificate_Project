import { Request, Response } from "express";
import db from "../../db/connection";
import type { Event } from "../../types/user";

const getEventById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const eventQuery = await db
      .promise()
      .query(`SELECT * FROM event WHERE event_id = ?`, [id]);
    const event = (eventQuery[0] as Event[])[0];
    const now = new Date();
    const statistic = event.event_endDate < now || event.event_approve === 1;
    res.json({
      success: true,
      data: {
        event: event,
        statistic: statistic,
      },
    })
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
    return;
  }
};
export default getEventById;
