import express from "express";
import User from "../Model/User.js";
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

export default router;
