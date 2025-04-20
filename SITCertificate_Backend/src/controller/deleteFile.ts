import fs from "fs";

export const deleteFile = async (filePath:string) => {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File does not exist:", err);
      return;
    }
    fs.unlink(filePath, (error) => {
      if (error) {
        console.error("Error deleting file:", error);
      } else {
        console.log("File deleted successfully:", filePath);
      }
    });
  });
};
