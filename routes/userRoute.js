import express from "express";
import { userCreate, userLog, userLogin, userSignup, userIndex} from "../controller/userControl.js";

const router = express.Router();

//signup route
router.get("/signup", userSignup);
router.post('/signup', userCreate)

//login route
router.get("/login", userLogin);
router.post("/logged", userLog);

// Home route
router.get('/index', userIndex);


export default router;
