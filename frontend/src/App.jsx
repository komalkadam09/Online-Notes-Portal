import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/student/Login";
import Register from "./pages/student/Register";
import Dashboard from "./pages/student/Dashboard";
import BrowseNotes from "./pages/student/BrowseNotes";
import NoteDetails from "./pages/student/NoteDetails";
import UploadNotes from "./pages/student/UploadNotes";
import MyUploads from "./pages/student/MyUploads";
import Profile from "./pages/student/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/browse-notes" element={<BrowseNotes />} />
        <Route path="/note-details" element={<NoteDetails />} />
        <Route path="/upload-notes" element={<UploadNotes />} />
        <Route path="/my-uploads" element={<MyUploads />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;