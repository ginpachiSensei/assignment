import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import music from "./data/music.js";
import User from "./db-models/userModel.js";
import Music from "./db-models/musicModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Music.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleMusic = music.map((m) => {
      return { ...m, postedBy: adminUser };
    });

    await Music.insertMany(sampleMusic);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Music.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
