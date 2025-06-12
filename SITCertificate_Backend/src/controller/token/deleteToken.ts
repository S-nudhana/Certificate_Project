import { Request, Response } from "express";

const deleteToken = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      success: false,
      message: "Invalid token",
    });
    return;
  }
};
export default deleteToken;
