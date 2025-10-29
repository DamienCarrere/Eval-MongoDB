import express from "express";
import { validateReq } from "../Middleware/validateReqMiddleware.js";
import { categorySchema } from "../Validator/categoryValidator.js";

import {
	createCategory,
	getAllCategories,
	getCategoryByID,
	updateCategory,
	deleteCategory,
} from "../Controller/CategoryController.js";

const router = express.Router();

router.post("/", validateReq(categorySchema), createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryByID);
router.put("/:id", validateReq(categorySchema), updateCategory);
router.delete("/:id", deleteCategory);

export default router;
