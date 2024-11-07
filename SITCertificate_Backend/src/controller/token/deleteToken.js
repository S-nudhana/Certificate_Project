const deleteToken = async (req, res) => {
  const tokenName = req.query.token;
  try {
    res.clearCookie(tokenName, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      error: error.message,
    });
    
  }
};
export default deleteToken;
