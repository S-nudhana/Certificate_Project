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
    const columnAData = sheetData.map((row) => row.email || "");
    const columnBData = sheetData.map((row) => row.Mobile || "");
    const studentData = columnAData.map((email, index) => [
      email,
      hashedPassword(columnBData[index]),
      eventId,
      0,
    ]);
    // await db
    // .promise()
    // .query(
    //     "INSERT INTO student_event ( student_event_studentId, student_event_eventId, student_joinedEventId, student_eventGenerated) VALUES ?",
    //     [studentData]
    // );
    const [result] = await db
      .promise()
      .query(
        "INSERT INTO student (student_email, student_password) VALUES (?, ?)",
        [email, password]
      );
    const studentId = result.student_Id;
    await db
      .promise()
      .query("UPDATE event SET event_approve = ? WHERE event_Id = ?", [
        1,
        eventId,
      ]);
    await db.promise().query(
      "INSERT INTO student_event (student_event_studentId, student_event_eventId) VALUES ?",
      [studentId, eventId]
    );

    return res.json({
      success: true,
      error: null,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      error: error.message,
    });
  }
};

export default updateApproveStatus;
