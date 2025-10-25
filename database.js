import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

export async function main() {
  try {
    await mongoose.connect(uri);
    console.log("Connecté à MongoDB Atlas !");
  } catch (err) {
    console.error("Erreur :", err);
  }
}
