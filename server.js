import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";

//Route importing 
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";

//Dotenv configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

app.set('views', "./views")
app.set("view engine", "ejs");
app.set(express.static('public'))

//Middleware for parsing cookie //
app.use(cookieParser());
// Set up session middleware //
app.use(session({
  secret: 'xdv14nmjad',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes uses
app.use('/user', userRoute);
app.use('/admin', adminRoute);

// Database and Server connection
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database connected");
    app.listen( PORT , () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
