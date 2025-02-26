const uploadFile = async (req, res) => {
  try {
    if (req.file) {
      const filePath = req.file.path;
      const fileName = req.file.filename;
      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        file: {
          fileName: fileName,
          filePath: filePath,
        },
      });
    } else {
      res.status(400).json({ message: "No file uploaded" });
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default uploadFile;
