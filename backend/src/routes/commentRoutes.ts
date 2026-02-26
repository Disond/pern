import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import * as commentController from "../controllers/commentController";

const router = Router();

// GET /api/comments/product/:productId - dohvati komentare za produkt
router.get("/product/:productId", commentController.getCommentsByProductId);

// POST /api/comments/product/:productId - kreiraj komentar za produkt
router.post(
    "/product/:productId",
    requireAuth,
    commentController.createComment,
);

// DELETE /api/comments/:id - obriši komentar
router.delete("/:id", requireAuth, commentController.deleteComment);

export default router;
