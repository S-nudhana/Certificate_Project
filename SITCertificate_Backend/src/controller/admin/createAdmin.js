import bcrypt from "bcrypt";
import connection from "../../db/connection.js";

const createAdmin = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
        }

        const [users] = await connection
            .promise()
            .query(`SELECT admin_email from admin where admin_email = ?`, [email]);

        if (users.length > 0) {
            return res.status(400).json({
                message: "อีเมลนี้มีผู้ใช้งานแล้ว",
            });
        }

        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
        const hashed_password = bcrypt.hashSync(password, salt);

        const query = "INSERT INTO admin (admin_userName, admin_email ,admin_password) VALUES (?, ?, ?)";

        const values = [username, email, hashed_password];

        await connection.promise().query(query, values);
        return res.status(201).json({ message: "User created successfully" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: e.message });
    }
};

export default createAdmin;