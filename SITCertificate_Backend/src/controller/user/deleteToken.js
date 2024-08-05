const deleteToken = async (req, res) => {
  const tokenName = req.query.token;
  res.clearCookie(tokenName, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  res.status(200).json({ message: "Logout successful" });
};
export default deleteToken;
