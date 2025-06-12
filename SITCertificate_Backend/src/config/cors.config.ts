import dotenv from 'dotenv';
dotenv.config();

export const corsOptions = {
  origin: [process.env.CORS_ORIGIN_DEVELOPMENT as string],
  credentials: true,
};
