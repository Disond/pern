import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import * as commentController from "../controllers/commentController";

const router = Router();

router.post("/", requireAuth, commentController.createComment);
router.delete("/:id", requireAuth, commentController.deleteComment);

export default router;
