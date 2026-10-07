import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/student/Login";
import Register from "./pages/student/Register";
import Dashboard from "./pages/student/Dashboard";
import BrowseNotes from "./pages/student/BrowseNotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/browse-notes" element={<BrowseNotes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;