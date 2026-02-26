import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { z } from "zod";

const createCommentSchema = z.object({
    content: z.string().min(1, { message: "Content is required" }),
});

export const createComment = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const productId = req.params.productId as string;

        // Validacija body-a
        const parsed = createCommentSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten() });
        }

        const { content } = parsed.data;

        const product = await queries.getProductById(productId);
        if (!product)
            return res.status(404).json({ error: "Product not found" });

        const comment = await queries.createComment({
            content,
            userId,
            productId,
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Failed to create comment" });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const commentId = req.params.id as string;

        const existingComment = await queries.getCommentById(commentId);
        if (!existingComment)
            return res.status(404).json({ error: "Comment not found" });

        if (existingComment.userId !== userId) {
            return res
                .status(403)
                .json({ error: "You can only delete your own comments" });
        }
        await queries.deleteComment(commentId);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
};

export const getCommentsByProductId = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId as string;

        // Provjeri postoji li produkt
        const product = await queries.getProductById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Vrati samo komentare
        res.status(200).json(product.comments || []);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
};
