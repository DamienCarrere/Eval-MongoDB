import Joi from "joi";

export const productSchema = Joi.object({
	title: Joi.string().trim.required(),
	description: Joi.string().allow("").optional(),
	price: Joi.number().min(0).required(),
	category: Joi.string().required(),
	stock: Joi.number().integer().min(0).default(1),
});

export const updateProductSchema = Joi.object({
	title: Joi.string().trim(),
	description: Joi.string().allow(""),
	price: Joi.number().min(0),
	category: Joi.string(),
	stock: Joi.number().integer().min(0),
}).min(1);
