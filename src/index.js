import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import musicRoutes from "./routes/musicRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use("/music", musicRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running.... go to /music for music and /users for users");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} on ${PORT}`)
);
