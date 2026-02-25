import { Request, Response } from "express";
import * as queries from "../db/queries";
// asdasd

const getUserId = (req: Request): string | null => {
    return (req as any).user?.id || null;
};

// GET /api/users/me
export async function getMe(req: Request, res: Response) {
    try {
        const userId = getUserId(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const user = await queries.getUserById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ error: "Server error" });
    }
}

// POST /api/users/sync - sync user posle login-a
export async function syncUser(req: Request, res: Response) {
    try {
        const userId = getUserId(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { email, name, imageUrl } = req.body;
        if (!email || !name) {
            return res.status(400).json({ error: "Email and name required" });
        }

        const user = await queries.upsertUser({
            id: userId,
            email,
            name,
            imageUrl: imageUrl || null,
        });

        res.json(user);
    } catch (error) {
        console.error("Error syncing user:", error);
        res.status(500).json({ error: "Failed to sync user" });
    }
}

// PUT /api/users/me
export async function updateMe(req: Request, res: Response) {
    try {
        const userId = getUserId(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { name, imageUrl } = req.body;
        const user = await queries.updateUser(userId, { name, imageUrl });

        res.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Server error" });
    }
}
