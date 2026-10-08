import "../../App.css";

import {
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  RefreshCw,
  ArrowLeft,
  FileText,
  Search,
  X,
  LogOut,
  BookOpen,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PendingNotes() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [actionLoading, setActionLoading] = useState("");
  const [deleteNote, setDeleteNote] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const fetchPendingNotes = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/admin/notes/pending",
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
          data.message || "Failed to fetch pending notes"
        );
      }

      setNotes(data);
    } catch (error) {
      console.error(
        "Error fetching pending notes:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingNotes();
  }, []);

  const handleApprove = async (id) => {
    try {
      setActionLoading(id);

      const response = await fetch(
        `http://localhost:5000/api/admin/notes/${id}/approve`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Failed to approve note"
        );
        return;
      }

      setSelectedNote(null);

      await fetchPendingNotes();
    } catch (error) {
      console.error("Approve error:", error);

      alert("Unable to connect to server");
    } finally {
      setActionLoading("");
    }
  };

  const handleReject = async (id) => {
    try {
      setActionLoading(id);

      const response = await fetch(
        `http://localhost:5000/api/admin/notes/${id}/reject`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Failed to reject note"
        );
        return;
      }

      setSelectedNote(null);

      await fetchPendingNotes();
    } catch (error) {
      console.error("Reject error:", error);

      alert("Unable to connect to server");
    } finally {
      setActionLoading("");
    }
  };

  const handleDelete = async (id) => {
    try {
      setActionLoading(id);

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
          data.message || "Failed to delete note"
        );
        return;
      }

      setDeleteNote(null);
      setSelectedNote(null);

      await fetchPendingNotes();
    } catch (error) {
      console.error("Delete error:", error);

      alert("Unable to connect to server");
    } finally {
      setActionLoading("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.clear();

    navigate("/admin/login", {
      replace: true,
    });
  };

  const filteredNotes = notes.filter((note) => {
    const searchText = search.toLowerCase();

    return (
      note.title?.toLowerCase().includes(searchText) ||
      note.subject?.toLowerCase().includes(searchText) ||
      note.uploadedBy?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="admin-shell">

      {/* SIDEBAR */}

      <aside className="modern-sidebar">

        <div className="brand-area">
          <div className="brand-icon">
            <BookOpen size={22} />
          </div>

          <div>
            <h2>Study Portal</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="sidebar-menu">

          <button
            className="sidebar-link"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <span className="sidebar-link-icon">
              <FileText size={18} />
            </span>

            Dashboard
          </button>

          <button
            className="sidebar-link"
            onClick={() =>
              alert(
                "Student Management will be added when the Student module is completed."
              )
            }
          >
            <span className="sidebar-link-icon">
              <Users size={18} />
            </span>

            Students
          </button>

          <button
            className="sidebar-link"
            onClick={() =>
              navigate("/admin/study-materials")
            }
          >
            <span className="sidebar-link-icon">
              <BookOpen size={18} />
            </span>

            Study Materials
          </button>

          <button
            className="sidebar-link active"
            onClick={() =>
              navigate("/admin/pending-notes")
            }
          >
            <span className="sidebar-link-icon">
              <Clock size={18} />
            </span>

            Pending Notes

            {notes.length > 0 && (
              <span className="menu-badge">
                {notes.length}
              </span>
            )}
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="admin-mini-profile">

            <div className="mini-avatar">
              A
            </div>

            <div>
              <strong>Administrator</strong>
              <span>Admin account</span>
            </div>

          </div>

          <button
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}

      <main className="modern-main">

        <header className="dashboard-topbar">

          <div>

            <div className="breadcrumb">
              Admin <span>/</span> Pending Notes
            </div>

            <h1>Pending Notes</h1>

            <p>
              Review and manage submitted study
              materials.
            </p>

          </div>

          <div className="topbar-actions">

            <button
              className="icon-refresh"
              onClick={fetchPendingNotes}
              title="Refresh"
            >
              <RefreshCw
                size={18}
                className={
                  loading
                    ? "spin-animation"
                    : ""
                }
              />
            </button>

            <button
              className="add-material-btn"
              onClick={() =>
                navigate(
                  "/admin/add-study-material"
                )
              }
            >
              <FileText size={18} />
              Add Material
            </button>

          </div>

        </header>


        {/* SUMMARY */}

        <section className="welcome-card">

          <div className="welcome-content">

            <div className="welcome-icon">
              <Clock size={28} />
            </div>

            <div>

              <span className="welcome-label">
                REVIEW QUEUE
              </span>

              <h2>
                {notes.length}{" "}
                {notes.length === 1
                  ? "note"
                  : "notes"}{" "}
                waiting
              </h2>

              <p>
                Review submitted materials before
                they become available to students.
              </p>

            </div>

          </div>

          <button
            className="welcome-action"
            onClick={fetchPendingNotes}
          >
            Refresh Queue
            <RefreshCw size={17} />
          </button>

        </section>


        {/* SEARCH */}

        <section className="dashboard-panel pending-panel">

          <div className="panel-header">

            <div>
              <h2>
                Submitted Materials
              </h2>

              <p>
                {filteredNotes.length} result
                {filteredNotes.length !== 1
                  ? "s"
                  : ""}
              </p>
            </div>

            <div className="pending-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {search && (
                <button
                  onClick={() =>
                    setSearch("")
                  }
                >
                  <X size={15} />
                </button>
              )}

            </div>

          </div>


          {/* CONTENT */}

          {loading ? (

            <div className="dashboard-empty">

              <RefreshCw
                size={26}
                className="spin-animation"
              />

              <p>
                Loading pending notes...
              </p>

            </div>

          ) : filteredNotes.length === 0 ? (

            <div className="dashboard-empty">

              <div className="empty-icon">
                <CheckCircle size={25} />
              </div>

              <h3>
                {search
                  ? "No matching notes found"
                  : "No pending notes"}
              </h3>

              <p>
                {search
                  ? "Try searching with another title, subject or uploader."
                  : "You're all caught up! There are no materials waiting for review."}
              </p>

              {search && (
                <button
                  onClick={() =>
                    setSearch("")
                  }
                >
                  Clear Search
                </button>
              )}

            </div>

          ) : (

            <div className="recent-material-list">

              {filteredNotes.map((note) => (

                <div
                  className="recent-material"
                  key={note._id}
                >

                  <div className="material-file-icon pending-file-icon">
                    <FileText size={20} />
                  </div>


                  <div className="recent-material-info">

                    <h3>
                      {note.title}
                    </h3>

                    <div className="material-meta">

                      <span>
                        {note.subject}
                      </span>

                      <span className="meta-dot">
                        •
                      </span>

                      <span>
                        {note.uploadedBy}
                      </span>

                    </div>

                  </div>


                  <span className="dashboard-status pending">
                    Pending
                  </span>


                  <div className="recent-actions">

                    <button
                      className="small-view-btn"
                      title="View details"
                      onClick={() =>
                        setSelectedNote(note)
                      }
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      className="small-approve-btn"
                      title="Approve"
                      disabled={
                        actionLoading ===
                        note._id
                      }
                      onClick={() =>
                        handleApprove(
                          note._id
                        )
                      }
                    >
                      <CheckCircle
                        size={16}
                      />
                    </button>

                    <button
                      className="small-reject-btn"
                      title="Reject"
                      disabled={
                        actionLoading ===
                        note._id
                      }
                      onClick={() =>
                        handleReject(
                          note._id
                        )
                      }
                    >
                      <XCircle size={16} />
                    </button>

                    <button
                      className="small-delete-btn"
                      title="Delete"
                      onClick={() =>
                        setDeleteNote(note)
                      }
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>


      {/* VIEW MODAL */}

      {selectedNote && (

        <div
          className="modern-modal-overlay"
          onClick={() =>
            setSelectedNote(null)
          }
        >

          <div
            className="modern-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modern-modal-header">

              <div>

                <span>
                  PENDING MATERIAL
                </span>

                <h2>
                  {selectedNote.title}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedNote(null)
                }
              >
                <X size={20} />
              </button>

            </div>


            <div className="modern-modal-body">

              <div className="modal-detail-grid">

                <div className="modal-detail">

                  <span>
                    Subject
                  </span>

                  <strong>
                    {selectedNote.subject}
                  </strong>

                </div>


                <div className="modal-detail">

                  <span>
                    Uploaded By
                  </span>

                  <strong>
                    {selectedNote.uploadedBy}
                  </strong>

                </div>


                <div className="modal-detail">

                  <span>
                    Status
                  </span>

                  <strong className="dashboard-status pending">
                    Pending
                  </strong>

                </div>

              </div>


              <div className="modal-description">

                <span>
                  Description
                </span>

                <p>
                  {selectedNote.description ||
                    "No description available."}
                </p>

              </div>

            </div>


            <div className="modern-modal-footer">

              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedNote(null)
                }
              >
                Close
              </button>

              <button
                className="modal-close-btn"
                onClick={() =>
                  handleReject(
                    selectedNote._id
                  )
                }
                disabled={
                  actionLoading ===
                  selectedNote._id
                }
              >
                <XCircle size={16} />
                Reject
              </button>

              <button
                className="modal-open-btn"
                onClick={() =>
                  handleApprove(
                    selectedNote._id
                  )
                }
                disabled={
                  actionLoading ===
                  selectedNote._id
                }
              >
                <CheckCircle size={16} />
                Approve
              </button>

              <a
                href={selectedNote.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-open-btn"
              >
                <Eye size={17} />
                Open PDF
              </a>

            </div>

          </div>

        </div>

      )}


      {/* DELETE MODAL */}

      {deleteNote && (

        <div
          className="modern-modal-overlay"
          onClick={() =>
            setDeleteNote(null)
          }
        >

          <div
            className="delete-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="delete-icon">
              <Trash2 size={23} />
            </div>

            <h2>
              Delete this note?
            </h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                "{deleteNote.title}"
              </strong>
              ?
            </p>

            <div className="delete-modal-actions">

              <button
                className="cancel-delete"
                onClick={() =>
                  setDeleteNote(null)
                }
              >
                Cancel
              </button>

              <button
                className="confirm-delete"
                disabled={
                  actionLoading ===
                  deleteNote._id
                }
                onClick={() =>
                  handleDelete(
                    deleteNote._id
                  )
                }
              >
                <Trash2 size={16} />

                {actionLoading ===
                deleteNote._id
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default PendingNotes;