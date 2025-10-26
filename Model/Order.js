import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	items: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
				min: 1,
			},
		},
	],
	total: {
		type: Number,
		required: true,
		default: 0,
	},
	status: {
		type: String,
		enum: ["En attente", "En cours d'expédition", "Annulé", "Livré"],
		default: "En attente",
	},
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
