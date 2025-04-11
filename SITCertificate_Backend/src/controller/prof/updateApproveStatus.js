import db from "../../db/connection.js";
import XLSX from "xlsx";
import { hashedPassword } from "../auth/jwt.js";

const updateApproveStatus = async (req, res) => {
  const eventId = req.params.id;
  try {
    const eventQuery = await db
      .promise()
      .query(
        "SELECT event_thumbnail, event_certificate, event_excel FROM event WHERE event_Id = ?",
        [eventId]
      );
    if (
      !eventQuery[0][0].event_excel ||
      !eventQuery[0][0].event_certificate ||
      !eventQuery[0][0].event_thumbnail
    ) {
      return res.status(200).json({
        success: false,
        message: "กรุณาอัพโหลดไฟล์ให้ครบถ้วน",
      });
    }
    const excelUrl = eventQuery[0][0].event_excel;
    const workbook = XLSX.readFile(excelUrl);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const sheetData = XLSX.utils.sheet_to_json(worksheet);
    const userList = sheetData.map(({ email = "", Mobile = "" }) => ({
      email: email.trim(),
      password: hashedPassword(Mobile),
    }));

    for (const { email, password } of userList) {
      const [[existing]] = await db
      .promise()
      .query("SELECT student_id FROM student WHERE student_email = ?", [
        email,
      ]);
      let studentId = existing ? existing.student_id : null;
      if (!existing) {
        const [insertResult] = await db
          .promise()
          .query(
            "INSERT INTO student (student_email, student_password) VALUES (?, ?)",
            [email, password]
          );
        studentId = insertResult.insertId;
      } else {
        const res = await db
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
      .query("UPDATE event SET event_approve = ? WHERE event_Id = ?", [
        1,
        eventId,
      ]);

    return res.json({
      success: true,
      message: "อัพเดทสถานะการอนุมัติสำเร็จ",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default updateApproveStatus;
