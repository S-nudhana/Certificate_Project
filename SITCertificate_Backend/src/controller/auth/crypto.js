import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// export const encryptPin = (pin) => {
//     const ciphertext = CryptoJS.AES.encrypt(
//         pin.toString(),
//         process.env.PINSecretKey
//     ).toString();
//     // const cryptoKey = crypto.createCipheriv('aes-256-ecb', process.env.PINSecretKey, '');
//     // const ciphertext = cryptoKey.update(pin.toString(), 'utf8', 'hex') + cryptoKey.final('hex');
//     return ciphertext;
// };

// export const decryptPin = (ciphertext) => {
//     const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.PINSecretKey);
//     const decryptedPin = bytes.toString(CryptoJS.enc.Utf8);
//     // const cryptoKey = crypto.createDecipheriv('aes-256-ecb', process.env.PINSecretKey, '');
//     // const decryptedPin = cryptoKey.update(ciphertext, 'hex', 'utf8') + cryptoKey.final('utf8');
//     return parseInt(decryptedPin, 10);
// };

export const encryptPin = (pin) => {
    const key = crypto.scryptSync(process.env.PINSecretKey, 'salt', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encrypted = cipher.update(pin.toString(), 'utf8', 'hex') + cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted
    };
};

export const decryptPin = (cipherData, iv) => {
    const key = crypto.scryptSync(process.env.PINSecretKey, 'salt', 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
    const decrypted = decipher.update(cipherData, 'hex', 'utf8') + decipher.final('utf8');
    return parseInt(decrypted, 10);
};
