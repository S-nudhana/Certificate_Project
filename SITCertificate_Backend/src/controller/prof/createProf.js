import bcrypt from "bcrypt";
import connection from "../../db/connection.js";

const CreateProf = async (req, res) => {
  try {
    const { username,email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
    }

    const users = await connection
      .promise()
      .query(`SELECT professor_email from professor where professor_email = ?`, [email]);

    if (users[0].length > 0) {
      return res.status(400).json({
        message: "อีเมลนี้มีผู้ใช้งานแล้ว",
      });
    }

    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
    const hashed_password = bcrypt.hashSync(password, salt);

    const query =
      "INSERT INTO professor (professor_userName, professor_email ,professor_password) VALUES (?, ?, ?)";

    const values = [username, email, hashed_password];

    await connection.promise().query(query, values);
    return res.status(201).json({ message: "User created successfully" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export default CreateProf;
