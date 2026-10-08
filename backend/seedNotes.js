const mongoose = require("mongoose");
require("dotenv").config();

const Note = require("./models/Note");

const seedNotes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Note.deleteMany({});

    const notes = [
      {
        title: "Machine Learning Unit 1",
        subject: "Machine Learning",
        description: "Introduction to Machine Learning",
        fileUrl: "https://example.com/ml-unit-1.pdf",
        uploadedBy: "Rahul",
        status: "pending",
      },
      {
        title: "DBMS Question Bank",
        subject: "DBMS",
        description: "Important DBMS questions",
        fileUrl: "https://example.com/dbms-question-bank.pdf",
        uploadedBy: "Priya",
        status: "pending",
      },
      {
        title: "Operating System Notes",
        subject: "Operating System",
        description: "OS important concepts",
        fileUrl: "https://example.com/os-notes.pdf",
        uploadedBy: "Amit",
        status: "approved",
      },
      {
        title: "Computer Networks Unit 2",
        subject: "Computer Networks",
        description: "Network layer notes",
        fileUrl: "https://example.com/cn-unit-2.pdf",
        uploadedBy: "Sneha",
        status: "rejected",
      },
    ];

    await Note.insertMany(notes);

    console.log("Test notes added successfully");

    process.exit();
  } catch (error) {
    console.error("Error adding notes:", error.message);
    process.exit(1);
  }
};

seedNotes();