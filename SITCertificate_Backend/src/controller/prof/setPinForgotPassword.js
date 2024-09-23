import db from "../../db/connection.js";
import { encryptPin } from "../auth/crypto.js";

const setPinForgotPassword = async(req, res) => {
    try {
        const { email } = req.body;
        const value = [email];
        const querry = await db.promise().query("SELECT professor_email FROM professor WHERE professor_email = ?", value);
        const professorEmail = querry[0][0].professor_email;
        if (!professorEmail) {
            return res.status(400).json({ message: "Email not found" });
        }
        const pin = Math.floor(100000 + Math.random() * 900000);
        const encrypt = encryptPin(pin);
        const pinEncrypt = encrypt.encryptedData;
        const iv = encrypt.iv;
        const value2 = [pinEncrypt, iv, email];
        await db.promise().query("UPDATE professor SET professor_forgotpasswordPin = ?, professor_iv = ? WHERE professor_email = ?", value2);
        return res.status(200).json({ message: "Send Pin to Email Successful" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
export default setPinForgotPassword;