import express from "express";
import User from "../Model/User.js";
import Product from "../Model/Product.js";
import Category from "../Model/Category.js";
import Order from "../Model/Order.js";
import { authCheck, adminCheck } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/api/admin/users", authCheck, adminCheck, async (req, res) => {
	try {
		const users = await User.find({}, "-password");
		res.json({ ok: true, users });
	} catch (err) {
		res.status(500).json({ ok: false, message: "Erreur" });
	}
});

router.get("/api/admin/products", authCheck, adminCheck, async (req, res) => {
	try {
		const products = await Product.find({})
			.populate("category", "name")
			.lean();

		const formatted = products.map((p) => ({
			_id: p._id,
			title: p.title,
			description: p.description,
			price: p.price,
			stock: p.stock,
			category: p.category?.name,
		}));

		res.json({ ok: true, products: formatted });
	} catch (err) {
		res.status(500).json({
			ok: false,
			message: "Erreur lors de la récupération des produits",
		});
	}
});

router.get("/api/admin/categories", authCheck, adminCheck, async (req, res) => {
	try {
		const categories = await Category.find({});
		res.json({ ok: true, categories });
	} catch (err) {
		res.status(500).json({
			ok: false,
			message: "Erreur lors de la récupération des catégories",
		});
	}
});

router.get("/api/admin/orders", authCheck, adminCheck, async (req, res) => {
	try {
		const orders = await Order.find({})
			.populate("user", "name email")
			.populate("products.product", "title price");
		res.json({ ok: true, orders });
	} catch (err) {
		res.status(500).json({
			ok: false,
			message: "Erreur lors de la récupération des commandes",
		});
	}
});
export default router;
