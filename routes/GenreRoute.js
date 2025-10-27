import express from "express";
import {
  getGenres,
  addGenre,
  removeGenre,
  editGenre,
} from "../controller/GenreController.js";

const router = express.Router();

router.get("/", getGenres);
router.post("/", addGenre);
router.delete("/:id", removeGenre);
router.put("/", editGenre);

export default router;
