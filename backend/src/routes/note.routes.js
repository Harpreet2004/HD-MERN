import express from "express"
import { createNote, deleteNote, getAllNotes } from "../controllers/note.controllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.delete("/:id", deleteNote);

export default router;