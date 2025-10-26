import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	description: {
		type: String,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
	stock: {
		type: Number,
		default: 1,
		min: 0,
	},
});

const Product = mongoose.model("Product", productSchema);
export default Product;
