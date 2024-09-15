import db from "../../db/connection.js";
import { encryptPin } from "../auth/jwt.js";

const setPinForgotPassword = async(req, res) => {
    try {
        const { email } = req.body;
        const value = [email];
        const querry = await db.promise().query("SELECT admin_email FROM admin WHERE admin_email = ?", value);
        const adminEmail = querry[0][0].admin_email;
        if (!adminEmail) {
            return res.status(400).json({ message: "Email not found" });
        }
        const pin = Math.floor(100000 + Math.random() * 900000);
        const pinEncrypt = encryptPin(pin);
        const value2 = [pinEncrypt, email];
        await db.promise().query("UPDATE admin SET admin_forgotpasswordPin = ? WHERE admin_email = ?", value2);
        return res.status(200).json({ message: "Send Pin to Email Successful" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
export default setPinForgotPassword;