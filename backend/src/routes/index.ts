import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../auth";

const router = Router();

router.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

export default router;
