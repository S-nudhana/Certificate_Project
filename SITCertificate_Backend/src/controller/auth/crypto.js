import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export const encryptPin = (pin) => {
    // const ciphertext = CryptoJS.AES.encrypt(
    //     pin.toString(),
    //     process.env.PINSecretKey
    // ).toString();
    const cryptoKey = crypto.createCipheriv('aes-256-ecb', process.env.PINSecretKey, '');
    const ciphertext = cryptoKey.update(pin.toString(), 'utf8', 'hex') + cryptoKey.final('hex');
    return ciphertext;
};

export const decryptPin = (ciphertext) => {
    // const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.PINSecretKey);
    // const decryptedPin = bytes.toString(CryptoJS.enc.Utf8);
    const cryptoKey = crypto.createDecipheriv('aes-256-ecb', process.env.PINSecretKey, '');
    const decryptedPin = cryptoKey.update(ciphertext, 'hex', 'utf8') + cryptoKey.final('utf8');
    return parseInt(decryptedPin, 10);
};