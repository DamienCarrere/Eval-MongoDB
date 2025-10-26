import express from "express";
import {
	createUser,
	getAllUsers,
	getUserByID,
	updateUser,
	deleteUser,
} from "../Controller/UserController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserByID);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
