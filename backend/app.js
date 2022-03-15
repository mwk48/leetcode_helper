import express from "express";
import config from "./utils/config.js";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

console.log("Connecting to MongoDB");
console.log(config.MONGODB_URI);

(async () => {
    try {
      await mongoose.connect(config.MONGODB_URI);
      console.log("connected to MongoDB");
    } catch (err) {
      console.log('error: ' + err.message);
    }
  })()

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

export default app;