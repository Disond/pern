import express from "express";
import cors from "cors";
import path from "path";

import { ENV } from "./config/env";
import { auth } from "./auth";
import routes from "./routes";

const app = express();

app.use(
    cors({
        origin: ENV.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", auth.handler);

app.use(routes);

app.get("/api/health", (req, res) => {
    res.json({
        message:
            "Welcome to API - Powered by PostgreSQL, Drizzle ORM & Better Auth",
        endpoints: {
            auth: "/api/auth",
        },
    });
});

if (ENV.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

app.listen(ENV.PORT, () => {
    console.log("Server running on PORT:", ENV.PORT);
});
