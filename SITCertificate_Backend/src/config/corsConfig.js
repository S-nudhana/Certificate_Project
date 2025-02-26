export const corsOptions = {
    origin: [process.env.CORS_ORIGIN_DEVELOPMENT, process.env.CORS_ORIGIN_PRODUCTION],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
};