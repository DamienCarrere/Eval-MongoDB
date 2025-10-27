import express from "express";
import GameRoute from "./routes/GameRoute.js";
import GenreRoute from "./routes/GenreRoute.js";

const app = express();
const port = 3000;

//ROUTE
app.use(express.json());
app.use("/games", GameRoute);
app.use("/genres", GenreRoute);

app.get("/", (req, res) => {
  res.send(
    "Bienvenue sur l'API de jeux vidéo. Utilise /games et /genres pour accéder aux données."
  );
});

app.listen(port, () => console.log("Server started on port " + port));
