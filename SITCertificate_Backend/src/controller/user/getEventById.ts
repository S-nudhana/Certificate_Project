import { Request, Response } from "express";
import db from "../../db/connection";

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

const getEventById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const eventQuery = await db
      .promise()
      .query(`SELECT * FROM event WHERE event_Id = ?`, [id]);
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
