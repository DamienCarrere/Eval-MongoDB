import Product from "../Model/Product.js";

export const createProduct = async (req, res) => {
	try {
		const { title, description, price, category, stock } = req.body;

		if (!title || !price || !category) {
			return res.status(400).json({
				message: "Le titre, le prix et la catégorie sont obligatoires",
			});
		}

		const product = new Product({
			title,
			description,
			price,
			category,
			stock,
		});

		const saveProduct = await product.save();
		res.status(200).json(saveProduct);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find().populate("category", "name");
		res.status(200).json(products);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const getProductByID = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id).populate(
			"category",
			"name"
		);
		if (!product) {
			return res.status(404).json({ message: "Produit Introuvable" });
		}
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const updateProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!product) {
			return res.status(404).json({ message: "Produit Introuvable" });
		}
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Produit Introuvable" });
		}
		res.status(200).json({ message: "Produit supprimé" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
