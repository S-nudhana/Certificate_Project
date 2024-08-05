const verifyToken = async (req, res) => {
  const token = req.cookies.adminToken || req.cookies.profToken || req.cookies.token;
  if (!token) {
    return res.status(401).json({ authenticated: false });
  }
  try {
    return res.status(200).json({ authenticated: true, role:  req.cookies.adminToken ? "admin" : req.cookies.profToken ? "professor" : "student"});
  } catch (e) {
    return res.status(401).json({ authenticated: false });
  }
};
export default verifyToken;
