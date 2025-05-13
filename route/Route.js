import express from "express";
import {
  createNote,
  getNote,
  updateNote,
  deleteNote
} from "../controller/NoteController.js";


import { refreshToken } from "../controller/RefreshToken.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// ==================== AUTH ROUTES ====================
router.post('/login', loginHandler);
router.delete('/logout', logout);
router.get('/token', refreshToken);
router.post('/register', createUser);

// ==================== USER ROUTES (Protected) ====================
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.put("/edit-user/:id", verifyToken, updateUser);
router.delete("/delete-user/:id", deleteUser); // optional: bisa tambahkan verifyToken

// ==================== NOTE ROUTES (Protected) ====================
router.get('/note', verifyToken, getNote);
router.post('/add', verifyToken, createNote);
router.put('/note-update/:id', verifyToken, updateNote);
router.delete('/note-delete/:id', verifyToken, deleteNote);

export default router;
