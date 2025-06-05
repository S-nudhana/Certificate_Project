import { Request, Response } from 'express';
import db from "../../db/connection.js";
import { deleteFile } from "../deleteFile";

import type { EventRecord } from "../../types/admin";

const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;

  try {
    const [rows] = await db
      .promise()
      .query(
        `SELECT event_thumbnail, event_certificate, event_excel FROM event WHERE event_id = ?`,
        [id]
      );

    const eventData = rows as EventRecord[];

    if (eventData.length === 0) {
      res.status(404).json({
        success: false,
        error: "Event not found",
      });
      return;
    }
    const { event_thumbnail, event_certificate, event_excel } = eventData[0];
    for (const filePath of [event_thumbnail, event_certificate, event_excel]) {
      if (filePath) {
        try {
          await deleteFile(filePath);
        } catch (err) {
          console.error(`Error deleting file ${filePath}:`, err);
        }
      }
    }
    await db
      .promise()
      .query(`DELETE FROM comment WHERE comment_eventId = ?`, [id]);
    await db
      .promise()
      .query(`DELETE FROM student_event WHERE student_event_eventId = ?`, [id]);
    await db.promise().query(`DELETE FROM event WHERE event_id = ?`, [id]);
    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
};

export default deleteEvent;
