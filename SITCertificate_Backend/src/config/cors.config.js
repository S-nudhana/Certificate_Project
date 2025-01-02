export const corsOptions = {
    origin: ["http://localhost:5173", "https://certificateproject.sit.kmutt.ac.th"],
    // origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};