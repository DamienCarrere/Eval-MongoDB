import "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";
import { main } from "./database.js";
import securityRoutes from "./Routes/securityRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";

main();
const port = 3000;
const app = express();
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.set("trust proxy", 1); // trust first proxy
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			httpOnly: true,
			sameSite: "strict",
			maxAge: 1000 * 60 * 60,
		},
	})
);

app.use("/api/security", securityRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.listen(port, () => console.log("Server start on port: " + port));
