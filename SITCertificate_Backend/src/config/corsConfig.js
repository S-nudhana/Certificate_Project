export const corsOptions = {
  origin: [
    "http://10.4.153.187:5173",
    process.env.CORS_ORIGIN_DEVELOPMENT,
    process.env.CORS_ORIGIN_PRODUCTION,
  ],
  credentials: true,
};
