import db from "../../db/connection.js";

const getAllInProgressEvent = async (req,res) => {
  console.log("first")
  try {
    const dataQuery = await db
      .promise()
      .query(
        `SELECT * FROM event`
      );
    const data = dataQuery[0];
    console.log(data);
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
export default getAllInProgressEvent;
