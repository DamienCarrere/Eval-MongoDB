import express from "express";
import { validateReq } from "../Middleware/validateReqMiddleware.js";
import {
	productSchema,
	updateProductSchema,
} from "../Validator/productValidator.js";

import {
	createProduct,
	getAllProducts,
	getProductByID,
	updateProduct,
	deleteProduct,
} from "../Controller/ProductController.js";

const router = express.Router();

router.post("/", validateReq(productSchema), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductByID);
router.put("/:id", updateProduct);
router.delete("/:id", validateReq(updateProductSchema), deleteProduct);

export default router;
