import { Router } from "express";
import { syncUser, getMe, updateMe } from "../controllers/userController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/me", requireAuth, getMe);
router.put("/me", requireAuth, updateMe);
router.post("/sync", requireAuth, syncUser);

export default router;
