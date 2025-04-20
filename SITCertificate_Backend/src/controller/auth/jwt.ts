import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const compare = (password: string, querryPassword: string) => {
    return bcrypt.compareSync(password, querryPassword);
};

export const hashedPassword = (password: string) => {
    if (!process.env.SALT) {
        throw new Error("SALT is not defined in environment variables");
    }
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT, 10));
    return bcrypt.hashSync(password, salt);
};

export const signToken = (tokenData:string) => {
    if (!process.env.JWTSecretKey) {
        throw new Error("JWTSecretKey is not defined in environment variables");
    }
    return jwt.sign(tokenData, process.env.JWTSecretKey);
};

export const verifyToken = (token:string) => {
    if (!process.env.JWTSecretKey) {
        throw new Error("JWTSecretKey is not defined in environment variables");
    }
    return jwt.verify(token, process.env.JWTSecretKey);
};