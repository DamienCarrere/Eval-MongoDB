import {
  getAllGenres,
  findGenreByName,
  findGenreById,
  createGenre,
  deleteGenre,
  updateGenre,
} from "../model/GenreModel.js";

// GET
export const getGenres = (req, res) => {
  const allGenres = getAllGenres();
  if (allGenres.length === 0)
    return res.status(404).json({ message: "Aucun genre trouvé" });
  res.status(200).json(allGenres);
};

// POST
export const addGenre = (req, res) => {
  const existing = findGenreByName(req.body.name);
  if (existing)
    return res.status(400).json({ message: "Genre déjà existant" });

  const newGenre = createGenre(req.body);
  res.status(201).json({ message: "Genre créé", genre: newGenre });
};

// DELETE
export const removeGenre = (req, res) => {
  const id = parseInt(req.params.id);
  const success = deleteGenre(id);
  if (!success) return res.status(404).json({ message: "Genre non trouvé" });

  res.status(200).json({ message: "Genre supprimé" });
};

// PUT
export const editGenre = (req, res) => {
  const id = parseInt(req.body.id);
  const updated = updateGenre(id, req.body);
  if (!updated) return res.status(404).json({ message: "Genre non trouvé" });

  res.status(200).json({ message: "Genre mis à jour", genre: updated });
};
