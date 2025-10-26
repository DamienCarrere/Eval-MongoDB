import Order from "../Model/Order.js";

// ------------------------- createOrder -----------------------------
export const createOrder = async (req, res) => {
	try {
		const { user, items, total } = req.body;

		if (!user) {
			return res
				.status(400)
				.json({ message: "Utilisateur connecté requis" });
		} else if (!items || items.length === 0) {
			return res.status(400).json({ message: "Commande invalide" });
		}

		const order = new Order({ user, items, total });

		const saveOrder = await order.save();
		res.status(200).json(saveOrder);
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
		res.json(orders);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// ------------------------- getOrderByID -----------------------------
export const getOrderByID = async (req, res) => {
	try {
		const order = await Order.findById()
			.populate("user", "username email")
			.populate("items.product", "title price");

		if (!order)
			return res.status(400).json({ message: "Commande introuvable" });
		res.json(order);
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

		if (!order)
			return res.status(400).json({ message: "Commande introuvable" });

		res.json(order);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// ------------------------- deleteOrder -----------------------------
export const deleteOrder = async (req, res) => {
	try {
		const order = await Order.findByIdAndDelete(req.params.id);

		if (!order)
			return res.status(400).json({ message: "Commande introuvable" });
		res.status(200).json({ message: "Commande supprimée" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
