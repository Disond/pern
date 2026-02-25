import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Public rute
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Protected rute (zahtevaju login)
router.get("/my", requireAuth, productController.getMyProducts);
router.post("/", requireAuth, productController.createProduct);
router.put("/:id", requireAuth, productController.updateProduct);
router.delete("/:id", requireAuth, productController.deleteProduct);

export default router;
