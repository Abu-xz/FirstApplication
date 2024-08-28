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

import {
  isAuthorized,
  isAdmin
} from "../middlewares/adminAuth.js"


const router = express.Router();

// Admin login
router.get("/login", isAuthorized,  adminLog);
router.post("/login", isAuthorized, adminVerify);

// Admin Panel
router.get("/panel", isAdmin, adminPanel);

//Admin search
router.post("/search", isAdmin,  search);

//Admin edit
router.get("/edit/:userId", isAdmin, editUser);
router.post("/edit/:userId", isAdmin, updateUser);

//Admin delete
router.get("/delete/:userId", isAdmin, deleteUser);

//Admin create
router.get('/create', isAdmin, createUser);
router.post('/create', isAdmin, newUser);

export default router;
