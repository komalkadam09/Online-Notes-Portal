const express = require("express");

const { adminLogin } = require("../controllers/adminController");

const {
  getAllNotes,
  getPendingNotes,
  createNote,
  approveNote,
  rejectNote,
  deleteNote,
  uploadNoteFile,
} = require("../controllers/noteController");

const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/upload");

const router = express.Router();

// Admin login
router.post("/login", adminLogin);

// All routes below require Admin JWT authentication
router.use(adminAuth);

// Upload PDF to Cloudinary
router.post(
  "/notes/upload",
  upload.single("file"),
  uploadNoteFile
);

// Save study material information in MongoDB
router.post("/notes", createNote);

// Get all notes
router.get("/notes", getAllNotes);

// Get pending notes
router.get("/notes/pending", getPendingNotes);

// Approve note
router.put("/notes/:id/approve", approveNote);

// Reject note
router.put("/notes/:id/reject", rejectNote);

// Delete note
router.delete("/notes/:id", deleteNote);

module.exports = router;