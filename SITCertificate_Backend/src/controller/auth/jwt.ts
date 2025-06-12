import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const compare = (password: string, querryPassword: string) => {
    return bcryptjs.compareSync(password, querryPassword);
};

export const hashedPassword = (password: string) => {
    if (!process.env.SALT) {
        throw new Error("SALT is not defined in environment variables");
    }
    const saltRounds = parseInt(process.env.SALT, 10);
    return bcryptjs.hashSync(password, saltRounds);
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
