import { Request, Response } from "express";
import * as queries from "../db/queries";
import { z } from "zod";

const syncUserSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    name: z.string().min(1, { message: "Name is required" }),
    imageUrl: z.string().url({ message: "Invalid URL" }).optional(),
});

const updateUserSchema = z.object({
    name: z.string().min(1).optional(),
    imageUrl: z.string().url().optional(),
});

// GET /api/users/me
export async function getMe(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
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
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        // ✅ Validacija i korištenje parsed.data
        const parsed = syncUserSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten() });
        }

        const { email, name, imageUrl } = parsed.data;

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
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        // ✅ Validacija i korištenje parsed.data
        const parsed = updateUserSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten() });
        }

        const { name, imageUrl } = parsed.data;
        const user = await queries.updateUser(userId, { name, imageUrl });

        res.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Server error" });
    }
}
