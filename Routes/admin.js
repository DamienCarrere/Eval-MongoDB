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

router.put("/api/admin/users/:id", authCheck, adminCheck, async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		}).select("-password");
		res.json({ ok: true, user });
	} catch {
		res.status(500).json({
			ok: false,
			message: "Erreur modification utilisateur",
		});
	}
});

router.delete(
	"/api/admin/users/:id",
	authCheck,
	adminCheck,
	async (req, res) => {
		try {
			await User.findByIdAndDelete(req.params.id);
			res.json({ ok: true });
		} catch {
			res.status(500).json({
				ok: false,
				message: "Erreur suppression utilisateur",
			});
		}
	}
);

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

router.put(
	"/api/admin/products/:id",
	authCheck,
	adminCheck,
	async (req, res) => {
		try {
			const updated = await Product.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true }
			);
			res.json({ ok: true, product: updated });
		} catch {
			res.status(500).json({
				ok: false,
				message: "Erreur modification produit",
			});
		}
	}
);

router.delete(
	"/api/admin/products/:id",
	authCheck,
	adminCheck,
	async (req, res) => {
		try {
			await Product.findByIdAndDelete(req.params.id);
			res.json({ ok: true });
		} catch {
			res.status(500).json({
				ok: false,
				message: "Erreur suppression produit",
			});
		}
	}
);

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

router.put(
	"/api/admin/categories/:id",
	authCheck,
	adminCheck,
	async (req, res) => {
		try {
			const updated = await Category.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true }
			);
			res.json({ ok: true, category: updated });
		} catch {
			res.status(500).json({
				ok: false,
				message: "Erreur modification catégorie",
			});
		}
	}
);

router.delete(
	"/api/admin/categories/:id",
	authCheck,
	adminCheck,
	async (req, res) => {
		try {
			await Category.findByIdAndDelete(req.params.id);
			res.json({ ok: true });
		} catch {
			res.status(500).json({
				ok: false,
				message: "Erreur suppression catégorie",
			});
		}
	}
);

router.get("/api/admin/orders", authCheck, adminCheck, async (req, res) => {
	try {
		const orders = await Order.find({})
			.populate("user", "email username")
			.populate("items.product", "title price");
		res.json({ ok: true, orders });
	} catch (err) {
		res.status(500).json({
			ok: false,
			message: "Erreur lors de la récupération des commandes",
		});
	}
});

router.put("/api/admin/orders/:id", authCheck, adminCheck, async (req, res) => {
	try {
		const updated = await Order.findByIdAndUpdate(
			req.params.id,
			{ status: req.body.status },
			{ new: true }
		);
		res.json({ ok: true, order: updated });
	} catch {
		res.status(500).json({
			ok: false,
			message: "Erreur modification commande",
		});
	}
});

router.delete(
	"/api/admin/orders/:id",
	authCheck,
	adminCheck,
	async (req, res) => {
		try {
			await Order.findByIdAndDelete(req.params.id);
			res.json({ ok: true, message: "Commande supprimée" });
		} catch (err) {
			res.status(500).json({
				ok: false,
				message: "Erreur lors de la suppression de la commande",
			});
		}
	}
);

export default router;
