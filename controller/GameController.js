import {
  getAllGames,
  findGamesByName,
  findGamesById,
  createGames,
  deleteGames,
  updateGames,
} from "../model/GameModel.js";

// GET
export const getGames = (req, res) => {
  const allGames = getAllGames();
  if (allGames.length === 0)
    return res.status(404).json({ message: "Aucun jeu trouvé" });
  res.status(200).json(allGames);
};

// POST
export const addGames = (req, res) => {
  const existing = findGamesByName(req.body.name);
  if (existing) return res.status(400).json({ message: "Jeu déjà existant" });

  const newGame = createGames(req.body);
  res.status(201).json({ message: "Jeu créé", game: newGame });
};

// DELETE
export const removeGames = (req, res) => {
  const id = parseInt(req.params.id);
  const success = deleteGames(id);
  if (!success) return res.status(404).json({ message: "Jeu non trouvé" });

  res.status(200).json({ message: "Jeu supprimé" });
};

// PUT
export const editGames = (req, res) => {
  const id = parseInt(req.body.id);
  const updated = updateGames(id, req.body);
  if (!updated) return res.status(404).json({ message: "Jeu non trouvé" });

  res.status(200).json({ message: "Jeu mis à jour", game: updated });
};
