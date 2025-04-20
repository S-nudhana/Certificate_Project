import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

type EncryptedPin = {
  iv: string;
  encryptedData: string;
};

export const encryptPin = (pin: number | string): EncryptedPin => {
  const secretKey = process.env.PINSecretKey;
  if (!secretKey) throw new Error("PINSecretKey is not defined in environment variables");

  const key = crypto.scryptSync(secretKey, "salt", 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  const encrypted = cipher.update(pin.toString(), "utf8", "hex") + cipher.final("hex");

  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  };
};

export const decryptPin = (cipherData: string, iv: string): number => {
  const secretKey = process.env.PINSecretKey;
  if (!secretKey) throw new Error("PINSecretKey is not defined in environment variables");

  const key = crypto.scryptSync(secretKey, "salt", 32);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.from(iv, "hex"));

  const decrypted = decipher.update(cipherData, "hex", "utf8") + decipher.final("utf8");

  return parseInt(decrypted, 10);
};
