import express from "express";
import {
	createProduct,
	getAllProducts,
	getProductByID,
	updateProduct,
	deleteProduct,
} from "../Controller/ProductController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductByID);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
