import { app } from "../config/firebase.Config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadFile = async (file, folder) => {
  try {
    const storage = getStorage(app);
    if (file) {
      const storageRef = ref(storage, `${folder}/${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    }
    return null;
  } catch (error) {
    return error;
  }
};
