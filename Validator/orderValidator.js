import Joi from "joi";

export const orderSchema = Joi.object({
	user: Joi.string().required(),

	items: Joi.array()
		.items(
			Joi.object({
				product: Joi.string().required(),
				quantity: Joi.number().integer().min(1).required(),
			})
		)
		.min(1)
		.required(),

	total: Joi.number().min(0).required(),

	status: Joi.string()
		.valid("En attente", "En cours d'expédition", "Annulé", "Livré")
		.default("En attente"),
});

export const updateOrderSchema = Joi.object({
	items: Joi.array().items(
		Joi.object({
			product: Joi.string(),
			quantity: Joi.number().integer().min(1),
		})
	),

	total: Joi.number().min(0),

	status: Joi.string()
		.valid("En attente", "En cours d'expédition", "Annulé", "Livré")
		.default("En attente"),
}).min(1);
