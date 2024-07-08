import connection from "../../db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SignInProf = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) throw "Missing Required Fields";
    const query = "select * from professor where professor_email = ?";
    const value = [email];
    const user = await connection.promise().query(query, value);
    if (user[0].length != 1) throw "This User Doesn't existed";
    const compared = bcrypt.compareSync(password, user[0][0].professor_password);
    if (!compared) throw "Password Doesn't Match";
    const tokenData = {
      professor_id: user[0][0].professor_id,
    };
    const signedToken = jwt.sign(tokenData, process.env.JWTSecretKey);
    res.cookie("profToken", signedToken, {
      httpOnly: true,
    });
    return res
      .status(201)
      .json({ message: "Login Successful" });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export default SignInProf;
