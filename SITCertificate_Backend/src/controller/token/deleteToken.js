const deleteToken = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: error,
    });
    
  }
};
export default deleteToken;
