import Category from "../Model/Category.js";

export const createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;

		if (!name) {
			return res.status(400).json({ message: "Nom obligatoire" });
		}

		const category = new Category({ name, description });
		const saveCategory = await category.save();

		res.status(200).json(saveCategory);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find();
		res.status(200).json(categories);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const getCategoryByID = async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);
		if (!category) {
			return res.status(404).json({ message: "Catégorie introuvable" });
		}
		res.status(200).json(category);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const updateCategory = async (req, res) => {
	try {
		const category = await Category.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

		if (!category) {
			return res.status(404).json({ message: "Catégorie introuvable" });
		}
		res.status(200).json(category);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const deleteCategory = async (req, res) => {
	try {
		const category = await Category.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Catégorie supprimée" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
