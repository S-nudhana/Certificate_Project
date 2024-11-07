import { verifyToken } from "../auth/jwt.js";

const verifyCookiesToken = async(req, res) => {
    const token = req.cookies.token;
    try {
        if (!token) {
            return res.status(200).json({ authenticated: false });
        }
        const decodeToken = verifyToken(token);
        return res.status(200).json({ authenticated: true, role: decodeToken.role});
    } catch (e) {
        return res.status(401).json({ authenticated: false });
    }
};
export default verifyCookiesToken;