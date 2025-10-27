import express from "express";
import {
  getGames,
  addGames,
  removeGames,
  editGames,
} from "../controller/GameController.js";

const router = express.Router();

router.get("/", getGames);
router.post("/", addGames);
router.delete("/:id", removeGames);
router.put("/", editGames);

export default router;
