const express = require("express");

const NotesCtrl = require("../controllers/notes-controller");

const router = express.Router();

router.post("/note", NotesCtrl.createNote);
router.put("/note/:id", NotesCtrl.updateNote);
router.delete("/note/:id", NotesCtrl.deleteNote);
router.get("/note/:id", NotesCtrl.getNoteById);
router.get("/notes", NotesCtrl.getNotes);
router.get("/deleted", NotesCtrl.getDeletedNotes);
router.get("/history/:id", NotesCtrl.getFullNoteById);
router.get("/setup", NotesCtrl.testSetup);

module.exports = router;
