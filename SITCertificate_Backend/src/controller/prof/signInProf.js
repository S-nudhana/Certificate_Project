import connection from "../../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SignInProf = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) throw "Missing Required Fields";
    const query = "select * from professor_userName where username = ?";
    const value = [username];
    const user = await connection.promise().query(query, value);
    if (user[0].length != 1) throw "This Username Doesn't existed";
    const compared = bcrypt.compareSync(password, user[0][0].hashed_password);
    if (!compared) throw "Password Doesn't Match";
    const tokenData = {
      user_id: user[0][0].user_id,
    };
    const signedToken = jwt.sign(tokenData, process.env.JWT_SECRET);
    res.cookie("userToken", signedToken, {
      httpOnly: true,
    });
    return res.status(201).json({ message: "Login Successful", isCustomer: user[0][0].isCustomer });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export default SignInProf;
