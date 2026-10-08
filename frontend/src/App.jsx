import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminProtectedRoute from "./admin/pages/AdminProtectedRoute";
import StudyMaterials from "./admin/pages/StudyMaterials.jsx";
import PendingNotes from "./admin/pages/PendingNotes.jsx";
import AddStudyMaterial from "./admin/pages/AddStudyMaterial.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/study-materials"
          element={
            <AdminProtectedRoute>
              <StudyMaterials />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/pending-notes"
          element={
            <AdminProtectedRoute>
              <PendingNotes />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/add-study-material"
          element={
            <AdminProtectedRoute>
              <AddStudyMaterial />
            </AdminProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;