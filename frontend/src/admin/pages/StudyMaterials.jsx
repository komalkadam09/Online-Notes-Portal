import "../../App.css";

import {
  FileText,
  Eye,
  Trash2,
  RefreshCw,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudyMaterials() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/admin/notes",
        {
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("adminToken");

          navigate("/admin/login", {
            replace: true,
          });

          return;
        }

        throw new Error(
          data.message || "Failed to fetch notes"
        );
      }

      setNotes(data);
    } catch (error) {
      console.error(
        "Error fetching study materials:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this study material?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/notes/${id}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to delete material"
        );
        return;
      }

      alert(
        "Study material deleted successfully!"
      );

      fetchNotes();
    } catch (error) {
      console.error("Delete error:", error);

      alert("Unable to connect to server");
    }
  };

  const approvedNotes = notes.filter(
    (note) => note.status === "approved"
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Study Materials</h1>
          <p>Manage approved study materials</p>
        </div>

        <button
          className="refresh-button"
          onClick={fetchNotes}
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      <div className="material-count">
        <FileText size={22} />

        <span>Total Approved Materials:</span>

        <strong>
          {approvedNotes.length}
        </strong>
      </div>

      <div className="materials-grid">
        {loading ? (
          <div className="empty-message">
            Loading study materials...
          </div>
        ) : approvedNotes.length === 0 ? (
          <div className="empty-message">
            No approved study materials found.
          </div>
        ) : (
          approvedNotes.map((note) => (
            <div
              className="material-card"
              key={note._id}
            >
              <div className="material-icon">
                <FileText size={30} />
              </div>

              <div className="material-info">
                <h3>{note.title}</h3>

                <p>
                  <strong>Subject:</strong>{" "}
                  {note.subject}
                </p>

                <p>
                  <strong>Uploaded By:</strong>{" "}
                  {note.uploadedBy}
                </p>

                <p className="material-description">
                  {note.description ||
                    "No description available"}
                </p>
              </div>

              <div className="material-actions">
                <a
                  href={note.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view"
                >
                  <Eye size={16} />
                  View
                </a>

                <button
                  className="delete"
                  onClick={() =>
                    handleDelete(note._id)
                  }
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudyMaterials;