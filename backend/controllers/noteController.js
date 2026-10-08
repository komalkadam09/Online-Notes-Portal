const Note = require("../models/Note");
const cloudinary = require("../config/cloudinary");

// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Get notes error:", error);

    res.status(500).json({
      message: "Failed to fetch notes",
    });
  }
};

// Get pending notes
const getPendingNotes = async (req, res) => {
  try {
    const notes = await Note.find({ status: "pending" }).sort({
      createdAt: -1,
    });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Get pending notes error:", error);

    res.status(500).json({
      message: "Failed to fetch pending notes",
    });
  }
};

// Create a new study material
const createNote = async (req, res) => {
  try {
    const {
      title,
      subject,
      description,
      uploadedBy,
      fileUrl,
      status,
    } = req.body;

    if (
      !title ||
      !subject ||
      !uploadedBy ||
      !fileUrl
    ) {
      return res.status(400).json({
        message:
          "Title, subject, uploadedBy and fileUrl are required",
      });
    }

    const note = await Note.create({
      title,
      subject,
      description: description || "",
      fileUrl,
      uploadedBy,
      status: status || "pending",
    });

    res.status(201).json({
      message: "Study material saved successfully",
      note,
    });
  } catch (error) {
    console.error("Create note error:", error);

    res.status(500).json({
      message: "Failed to save study material",
    });
  }
};

// Approve a note
const approveNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note approved successfully",
      note,
    });
  } catch (error) {
    console.error("Approve note error:", error);

    res.status(500).json({
      message: "Failed to approve note",
    });
  }
};

// Reject a note
const rejectNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note rejected successfully",
      note,
    });
  } catch (error) {
    console.error("Reject note error:", error);

    res.status(500).json({
      message: "Failed to reject note",
    });
  }
};

// Delete note
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Delete note error:", error);

    res.status(500).json({
      message: "Failed to delete note",
    });
  }
};

// Upload a PDF to Cloudinary
const uploadNoteFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "online-notes",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    res.status(200).json({
      message: "PDF uploaded successfully",
      fileUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    res.status(500).json({
      message: "Failed to upload PDF",
    });
  }
};

module.exports = {
  getAllNotes,
  getPendingNotes,
  createNote,
  approveNote,
  rejectNote,
  deleteNote,
  uploadNoteFile,
};