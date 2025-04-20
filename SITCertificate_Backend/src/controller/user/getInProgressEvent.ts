import db from "../../db/connection";
import { Request, Response } from "express";

interface Event {
  event_Id: number;
  event_name: string;
  event_owner: string;
  event_startDate: Date;
  event_endDate: Date;
  event_thumbnail: string;
  event_certificate: string;
  event_excel: string;
  event_approve: number;
  event_adminId: number;
  event_emailTemplate: string;
  event_certificate_position_y: number;
  event_certificate_text_size: number;
}
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
