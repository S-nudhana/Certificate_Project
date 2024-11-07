export const corsOptions = {
    // origin: ["http://localhost:5173", "https://domain.com"],
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};