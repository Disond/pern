import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAuth } from "../middleware/auth";

const router = Router();

// ✅ Protected route (requires authentication)
router.get("/my", requireAuth, productController.getMyProducts);

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Protected routes
router.post("/", requireAuth, productController.createProduct);
router.put("/:id", requireAuth, productController.updateProduct);
router.delete("/:id", requireAuth, productController.deleteProduct);

export default router;
