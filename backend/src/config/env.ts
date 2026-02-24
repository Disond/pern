import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const ENV = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL!,
    NODE_ENV: process.env.NODE_ENV || "development",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",

    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL:
        process.env.BETTER_AUTH_URL ||
        `http://localhost:${process.env.PORT || 3000}/api/auth`,
};
