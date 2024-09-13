import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const compare = (password, querryPassword) => {
    return bcrypt.compareSync(password, querryPassword);
}

export const signToken = (tokenData) => {
    return jwt.sign(tokenData, process.env.JWTSecretKey);
}

export const hashedPassword = (password) => {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
    return bcrypt.hashSync(password, salt);
}