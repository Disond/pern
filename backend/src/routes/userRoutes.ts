import { Router } from "express";
import { syncUser, getMe, updateMe } from "../controllers/userController";
//@coderabbitai please review this specific change in the context of the previous commit.
const router = Router();

router.get("/me", getMe);
router.put("/me", updateMe);
router.post("/sync", syncUser);

export default router;
