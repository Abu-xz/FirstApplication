import express from "express";
import {
  adminLog,
  adminPanel,
  adminVerify,
  search,
  editUser,
  updateUser,
  deleteUser,
  createUser,
  newUser
} from "../controller/adminControl.js";

const router = express.Router();

// Admin login
router.get("/login", adminLog);
router.post("/verify", adminVerify);

// Admin Panel
router.get("/panel", adminPanel);

//Admin search
router.post("/search", search);

//Admin edit
router.get("/edit/:userId", editUser);
router.post("/edit/:userId", updateUser);

//Admin delete
router.get("/delete/:userId", deleteUser);

//Admin create
router.get('/create', createUser);
router.post('/create', newUser);

export default router;
