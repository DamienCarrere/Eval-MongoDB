let genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Aventure" },
  { id: 3, name: "Sport" },
];

// GET
export const getAllGenres = () => genres;

export const findGenreByName = (name) =>
  genres.find((genre) => genre.name === name);

export const findGenreById = (id) =>
  genres.find((genre) => genre.id === id);

// POST
export const createGenre = (data) => {
  const newGenre = {
    id: genres.length + 1,
    name: data.name,
  };
  genres.push(newGenre);
  return newGenre;
};

// DELETE
export const deleteGenre = (id) => {
  const index = genres.findIndex((genre) => genre.id === id);
  if (index === -1) return false;
  genres.splice(index, 1);
  return true;
};

// PUT
export const updateGenre = (id, data) => {
  const genre = findGenreById(id);
  if (!genre) return null;
  genre.name = data.name;
  return genre;
};
