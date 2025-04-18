export default function getFile(req, res) {
  const filepath = req.query.filepath;
  const token = req.cookies.token;
  const referer = req.headers.referer || req.headers.origin;
  const allowedOrigins = [process.env.CORS_ORIGIN_DEVELOPMENT, "http://10.4.153.187:5173"];
  try {
    if (!token) {
      return res.status(401).json({
        message: "This file cannot be accessed without a valid token.",
      });
    }
    if (!referer || !allowedOrigins.some((origin) => referer.includes(origin))) {
      return res.status(403).json({
        message: "Direct access to this file is not allowed.",
      });
    }
    res.sendFile(`${filepath}`, { root: "./" });
  } catch (error) {
    console.error("Error processing file request:", error);
    return res.status(500).json({
      message: "An error occurred while processing the file request.",
    });
  }
}