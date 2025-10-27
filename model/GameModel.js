let games = [
  { id: 1, name: "Spider-Man", prix: "23 €" },
  { id: 2, name: "Rocket League", prix: "Gratuit" },
  { id: 3, name: "Minecraft", prix: "28 €" },
];

// GET
export const getAllGames = () => games;

export const findGamesByName = (name) =>
  games.find((jeux) => jeux.name === name);

export const findGamesById = (id) => games.find((jeux) => jeux.id === id);

// POST
export const createGames = (data) => {
  const newGames = {
    id: games.length + 1,
    name: data.name,
    prix: data.prix,
  };
  games.push(newGames);
  return newGames;
};

// DELETE
export const deleteGames = (id) => {
  const index = games.findIndex((jeux) => jeux.id === id);
  if (index === -1) return false;
  games.splice(index, 1);
  return true;
};

// PUT
export const updateGames = (id, data) => {
  const jeu = findGamesById(id);
  if (!jeu) return null;
  jeu.name = data.name;
  jeu.prix = data.prix;
  return jeu;
};
