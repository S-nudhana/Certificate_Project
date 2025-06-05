import { Request, Response } from "express";
import db from "../../db/connection";
import XLSX from "xlsx";
import { hashedPassword } from "../auth/jwt";
import { v4 as uuidv4 } from "uuid";

const updateApproveStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const eventId: string = req.params.id;

  try {
    const [rows] = (await db
      .promise()
      .query(
        "SELECT event_thumbnail, event_certificate, event_excel FROM event WHERE event_id = ?",
        [eventId]
      )) as [any[], any];

    const eventData = rows[0];

    if (
      !eventData.event_excel ||
      !eventData.event_certificate ||
      !eventData.event_thumbnail
    ) {
      res.status(200).json({
        success: false,
        message: "กรุณาอัพโหลดไฟล์ให้ครบถ้วน",
      });
      return;
    }

    const excelUrl: string = eventData.event_excel;
    const workbook = XLSX.readFile(excelUrl);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const sheetData = XLSX.utils.sheet_to_json(worksheet) as {
      email?: string;
      Mobile?: string;
    }[];

    const userList = sheetData.map(({ email = "", Mobile = "" }) => ({
      email: email.trim(),
      password: hashedPassword(Mobile),
    }));

    for (const { email, password } of userList) {
      const [[existing]] = (await db
        .promise()
        .query(
          "SELECT student_id FROM student WHERE student_email = ?",
          [email]
        )) as [[{ student_id: string }] | [], any];

      let studentId: string;

      if (!existing) {
        studentId = uuidv4();

        await db
          .promise()
          .query(
            "INSERT INTO student (student_id, student_email, student_password) VALUES (?, ?, ?)",
            [studentId, email, password]
          );
      } else {
        studentId = existing.student_id;

        await db
          .promise()
          .query(
            "UPDATE student SET student_password = ? WHERE student_email = ?",
            [password, email]
          );
      }

      await db
        .promise()
        .query(
          "INSERT INTO student_event (student_event_eventId, student_event_studentId) VALUES (?, ?)",
          [eventId, studentId]
        );
    }

    await db
      .promise()
      .query("UPDATE event SET event_approve = ? WHERE event_id = ?", [
        1,
        eventId,
      ]);

    res.json({
      success: true,
      message: "อัพเดทสถานะการอนุมัติสำเร็จ",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default updateApproveStatus;
