import connection from "../../db/connect.js";

export const getAllInProgressEvent = async (res) => {
  try {
    const dataQuery = await connection.promise().query(`SELECT * FROM  event WHERE DATE(event_stopDate) <= CURDATE()  ORDER BY event_startDate DESC`);
    const data = dataQuery[0];
    if (!data) {
      return res.status(404).json({
        success: false,
        data: null,
        error: "Id not found",
      });
    }
    return res.json({
      success: true,
      data: data,
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
