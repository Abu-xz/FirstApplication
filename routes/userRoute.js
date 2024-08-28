import express from "express";
import {
  userCreate,
  userLog,
  userLogin,
  userSignup,
  userIndex,
  userLogout
} from "../controller/userControl.js";
import { 
    userAuth,
    isAuthorized
 } from "../middlewares/userAuth.js";

const router = express.Router();

//signup route
router.get("/signup",isAuthorized, userSignup);
router.post("/signup", userCreate);

//login route
router.get("/login", isAuthorized, userLogin);
router.post("/login", userLog);

// Home route
router.get("/index", userAuth, userIndex);
router.get('/logout', userLogout)

export default router;
