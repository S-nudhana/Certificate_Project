import db from "../../db/connection.js";
import XLSX from "xlsx";
import { hashedPassword } from "../auth/jwt.js";

const updateApproveStatus = async (req, res) => {
  const eventId = req.params.id;

  try {
    const excelQuery = await db
      .promise()
      .query("SELECT event_excel FROM event WHERE event_Id = ?", [eventId]);

    const excelUrl = excelQuery[0][0].event_excel;
    if (!excelUrl) {
      return res.status(400).send("No file uploaded.");
    }
    const workbook = XLSX.readFile(excelUrl);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const sheetData = XLSX.utils.sheet_to_json(worksheet);
    const emailList = sheetData.map((row) => row.email || "");
    const mobileList = sheetData.map((row) => row.Mobile || "");
    const hashedPasswords = mobileList.map((mobile) => hashedPassword(mobile));
    const values = emailList.map((email, index) => [
      email,
      hashedPasswords[index],
    ]);
    const [result] = await db
      .promise()
      .query("INSERT INTO student (student_email, student_password) VALUES ?", [
        values,
      ]);

    const emails = emailList.map((email) => email.toLowerCase());

    const [insertedRows] = await db
      .promise()
      .query("SELECT student_Id FROM student WHERE student_email IN (?)", [
        emails,
      ]);
    const studentValue = insertedRows.map((row) => [row.student_Id, eventId]);
    await db
      .promise()
      .query(
        "INSERT INTO student_event (student_event_studentId, student_event_eventId) VALUES ?",
        [studentValue]
      );
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
      message: error,
    });
  }
};

export default updateApproveStatus;
