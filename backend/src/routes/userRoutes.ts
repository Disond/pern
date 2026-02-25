import { Router } from "express";
import { syncUser, getMe, updateMe } from "../controllers/userController";

const router = Router();

router.get("/me", getMe);
router.put("/me", updateMe);
router.post("/sync", syncUser);

export default router;
