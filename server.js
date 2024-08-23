import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

app.use(express.urlencoded({extended : false}));

// Database and Server connection
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database connected");
    app.listen(() => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
