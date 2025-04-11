const deleteToken = async (req, res) => {
  try {
    res.clearCookie("token", {
      // httpOnly: true,
      // secure: true,
      path: "/",
    });
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }
};
export default deleteToken;
