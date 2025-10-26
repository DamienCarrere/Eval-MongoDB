import express from "express";
import { validateReq } from "../Middleware/validateReqMiddleware.js";
import { orderSchema, updateOrderSchema } from "../Validator/orderValidator.js";

import {
	createOrder,
	getAllOrders,
	getOrderByID,
	updateOrderStatus,
	deleteOrder,
} from "../Controller/OrderController.js";

const router = express.Router();

router.post("/", validateReq(orderSchema), createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderByID);
router.put("/:id", validateReq(updateOrderSchema), updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
