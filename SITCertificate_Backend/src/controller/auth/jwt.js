import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

export const compare = (password, querryPassword) => {
    return bcrypt.compareSync(password, querryPassword);
};

export const signToken = (tokenData) => {
    return jwt.sign(tokenData, process.env.JWTSecretKey);
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWTSecretKey);
};

export const encryptPin = (pin) => {
    const ciphertext = CryptoJS.AES.encrypt(
        pin.toString(),
        process.env.PINSecretKey
    ).toString();
    return ciphertext;
};

export const decryptPin = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.PINSecretKey);
    const decryptedPin = bytes.toString(CryptoJS.enc.Utf8);
    return parseInt(decryptedPin, 10);
};

export const hashedPassword = (password) => {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
    return bcrypt.hashSync(password, salt);
};