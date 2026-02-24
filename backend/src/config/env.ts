import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const ENV = {
    // PORT: process.env.PORT,
    // DB_URL: process.env.DB_URL,
    // NODE_ENV: process.env.NODE_ENV,

    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV || "development",
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL:
        process.env.BETTER_AUTH_URL ||
        `http://localhost:${process.env.PORT || 3000}/api/auth`,
};
