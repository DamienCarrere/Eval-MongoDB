import Order from "../Model/Order.js";
import Product from "../Model/Product.js";

// ------------------------- createOrder -----------------------------
export const createOrder = async (req, res) => {
	try {
		const { user, items } = req.body;

		let total = 0;

		if (!user) {
			return res
				.status(400)
				.json({ message: "Utilisateur connecté requis" });
		} else if (!items || items.length === 0) {
			return res.status(400).json({ message: "Commande invalide" });
		}

		for (const item of items) {
			const product = await Product.findById(item.product);

			if (!product) {
				return res
					.status(400)
					.json({ message: `Produit ${item.product} introuvable` });
			} else if (product.stock < item.quantity) {
				return res.status(400).json({
					message: `Stock insuffisant du jeu ${product.title}, Stock disponible: ${product.stock}, Quantité demandée: ${item.quantity}`,
				});
			}

			total += product.price * item.quantity;
		}

		const order = new Order({ user, items, total, status: "En attente" });

		await order.save();

		for (const item of items) {
			await Product.findByIdAndUpdate(item.product, {
				$inc: { stock: -item.quantity },
			});
		}

		res.status(200).json({ message: "Commande créée avec succès", order });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// ------------------------- getAllOrders -----------------------------
export const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find()
			.populate("user", "username email")
			.populate("items.product", "title price");
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// ------------------------- getOrderByID -----------------------------
export const getOrderByID = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id)
			.populate("user", "username email")
			.populate("items.product", "title price");

		if (!order) {
			return res.status(400).json({ message: "Commande introuvable" });
		}
		res.status(200).json(order);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// ------------------------- updateOrderStatus -----------------------------
export const updateOrderStatus = async (req, res) => {
	try {
		const { status } = req.body;

		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{ status },
			{ new: true }
		);

		if (!order) {
			return res.status(400).json({ message: "Commande introuvable" });
		}
		res.status(200).json(order);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// ------------------------- deleteOrder -----------------------------
export const deleteOrder = async (req, res) => {
	try {
		const order = await Order.findByIdAndDelete(req.params.id);

		if (!order) {
			return res.status(400).json({ message: "Commande introuvable" });
		}
		res.status(200).json({ message: "Commande supprimée" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
