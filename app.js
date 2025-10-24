import express from "express";
import main from "./database.js";

main();
const port = 3000;
const app = express();
app.use(express.json());
app.listen(port, () => console.log("Server start on port: " + port));
