import db from "../../db/connection.js";
import XLSX from "xlsx";
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { hashedPassword } from "../auth/jwt.js";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

const updateApproveStatus = async(req, res) => {
    const { eventId } = req.body;

    try {
        const excelQuery = await db
            .promise()
            .query("SELECT event_excel FROM event WHERE event_Id = ?", [eventId]);

        const excelUrl = excelQuery[0][0].event_excel;
        console.log(excelUrl);

        if (!excelUrl) {
            return res.status(400).send("No file uploaded.");
        }
        const response = await axios({
            url: excelUrl,
            method: 'GET',
            responseType: 'arraybuffer'
        });
        const tempFilePath = path.join(__dirname, 'temp.xlsx');
        fs.writeFileSync(tempFilePath, response.data);
        const workbook = XLSX.readFile(tempFilePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(worksheet);
        fs.unlinkSync(tempFilePath);
        const columnAData = sheetData.map((row) => row.email || "");
        const columnBData = sheetData.map((row) => row.Mobile || "");
        const studentData = columnAData.map((email, index) => [
            columnAData[index],
            hashedPassword(columnBData[index]),
            eventId,
            0,
        ]);
        await db.promise().query(
            "INSERT INTO student (student_email, student_password, student_joinedEventId, student_eventGenerated) VALUES ?", [studentData]
        );
        await db.promise().query("UPDATE event SET event_approve = ? WHERE event_Id = ?", [1, eventId]);
        return res.json({
            success: true,
            error: null,
        });

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message,
        });
    }
};

export default updateApproveStatus