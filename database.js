import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

async function main() {
	try {
		await mongoose.connect(uri);
		console.log("Connecté à MongoDB Atlas !");
	} catch (err) {
		console.error("Erreur :", err);
	}
}
export default mongoose;
main();
