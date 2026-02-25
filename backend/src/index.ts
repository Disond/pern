import express from "express";
import cors from "cors";
import path from "path";
import { toNodeHandler } from "better-auth/node";
// asdasd

import { ENV } from "./config/env";
import { auth } from "./auth";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

// Middleware
app.use(
    cors({
        origin: ENV.FRONTEND_URL,
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth
app.use("/api/auth", toNodeHandler(auth));

// Health
app.get("/api/health", (req, res) => {
    res.json({
        message: "Welcome to API",
        endpoints: [
            "/api/auth",
            "/api/users",
            "/api/products",
            "/api/comments",
        ],
    });
});

// API rute
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

// PRODUCTION: Serve frontend
if (ENV.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

app.listen(ENV.PORT, () => console.log("Server running on PORT:", ENV.PORT));
