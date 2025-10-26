import express from "express";
import {
	createCategory,
	getAllCategories,
	getCategoryByID,
	updateCategory,
	deleteCategory,
} from "../Controller/CategoryController.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryByID);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
