import "../../App.css";

import {
  Users,
  FileText,
  Clock,
  CheckCircle,
  LogOut,
  Trash2,
  Eye,
  X,
  Plus,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  BookOpen,
  AlertCircle,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [actionLoading, setActionLoading] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(null);

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
          navigate("/admin/login", { replace: true });
          return;
        }

        throw new Error(
          data.message || "Failed to fetch notes"
        );
      }

      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
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

      await fetchNotes();
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

      await fetchNotes();
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

      setShowDeleteModal(null);
      await fetchNotes();
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

  const totalNotes = notes.length;

  const pendingNotes = notes.filter(
    (note) => note.status === "pending"
  ).length;

  const approvedNotes = notes.filter(
    (note) => note.status === "approved"
  ).length;

  const rejectedNotes = notes.filter(
    (note) => note.status === "rejected"
  ).length;

  const recentNotes = notes.slice(0, 6);

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
            className="sidebar-link active"
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
            className="sidebar-link"
            onClick={() =>
              navigate("/admin/pending-notes")
            }
          >
            <span className="sidebar-link-icon">
              <Clock size={18} />
            </span>
            Pending Notes

            {pendingNotes > 0 && (
              <span className="menu-badge">
                {pendingNotes}
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

        {/* TOP HEADER */}
        <header className="dashboard-topbar">

          <div>
            <div className="breadcrumb">
              Admin <span>/</span> Dashboard
            </div>

            <h1>Dashboard Overview</h1>

            <p>
              Monitor your study portal and manage
              uploaded materials.
            </p>
          </div>

          <div className="topbar-actions">

            <button
              className="icon-refresh"
              onClick={fetchNotes}
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
              <Plus size={18} />
              Add Material
            </button>

          </div>

        </header>

        {/* WELCOME CARD */}
        <section className="welcome-card">

          <div className="welcome-content">

            <div className="welcome-icon">
              <ShieldCheck size={28} />
            </div>

            <div>
              <span className="welcome-label">
                ADMINISTRATOR
              </span>

              <h2>
                Welcome back! 👋
              </h2>

              <p>
                Your portal is ready. Review new
                submissions and keep study materials
                organized.
              </p>
            </div>

          </div>

          <button
            className="welcome-action"
            onClick={() =>
              navigate("/admin/pending-notes")
            }
          >
            Review Pending
            <ArrowRight size={17} />
          </button>

        </section>

        {/* STATISTICS */}
        <section className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-top">
              <div className="dashboard-stat-icon blue">
                <Users size={21} />
              </div>

              <span className="stat-label">
                STUDENTS
              </span>
            </div>

            <h3>250</h3>

            <p>
              Registered students
            </p>

          </div>

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-top">
              <div className="dashboard-stat-icon purple">
                <FileText size={21} />
              </div>

              <span className="stat-label">
                TOTAL NOTES
              </span>
            </div>

            <h3>{totalNotes}</h3>

            <p>
              All uploaded materials
            </p>

          </div>

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-top">
              <div className="dashboard-stat-icon orange">
                <Clock size={21} />
              </div>

              <span className="stat-label">
                PENDING
              </span>
            </div>

            <h3>{pendingNotes}</h3>

            <p>
              Waiting for review
            </p>

          </div>

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-top">
              <div className="dashboard-stat-icon green">
                <CheckCircle size={21} />
              </div>

              <span className="stat-label">
                APPROVED
              </span>
            </div>

            <h3>{approvedNotes}</h3>

            <p>
              Published materials
            </p>

          </div>

        </section>

        {/* QUICK ACTIONS */}
        <section className="quick-actions">

          <button
            className="quick-action-card"
            onClick={() =>
              navigate(
                "/admin/add-study-material"
              )
            }
          >
            <div className="quick-action-icon blue">
              <Plus size={21} />
            </div>

            <div>
              <strong>
                Add Study Material
              </strong>

              <span>
                Upload a new PDF
              </span>
            </div>

            <ArrowRight size={18} />
          </button>

          <button
            className="quick-action-card"
            onClick={() =>
              navigate("/admin/pending-notes")
            }
          >
            <div className="quick-action-icon orange">
              <Clock size={21} />
            </div>

            <div>
              <strong>
                Review Pending Notes
              </strong>

              <span>
                {pendingNotes} notes waiting
              </span>
            </div>

            <ArrowRight size={18} />
          </button>

          <button
            className="quick-action-card"
            onClick={() =>
              navigate(
                "/admin/study-materials"
              )
            }
          >
            <div className="quick-action-icon green">
              <BookOpen size={21} />
            </div>

            <div>
              <strong>
                View Study Materials
              </strong>

              <span>
                Browse approved materials
              </span>
            </div>

            <ArrowRight size={18} />
          </button>

        </section>

        {/* RECENT NOTES */}
        <section className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>Recent Study Materials</h2>
              <p>
                Latest uploaded notes
              </p>
            </div>

            <button
              className="view-all-btn"
              onClick={() =>
                navigate(
                  "/admin/study-materials"
                )
              }
            >
              View All
              <ArrowRight size={16} />
            </button>

          </div>

          {loading ? (

            <div className="dashboard-empty">
              <RefreshCw
                size={25}
                className="spin-animation"
              />

              <p>
                Loading study materials...
              </p>
            </div>

          ) : recentNotes.length === 0 ? (

            <div className="dashboard-empty">

              <div className="empty-icon">
                <FileText size={25} />
              </div>

              <h3>
                No study materials yet
              </h3>

              <p>
                Start by uploading your first
                study material.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/admin/add-study-material"
                  )
                }
              >
                <Plus size={17} />
                Add Material
              </button>

            </div>

          ) : (

            <div className="recent-material-list">

              {recentNotes.map((note) => (

                <div
                  className="recent-material"
                  key={note._id}
                >

                  <div className="material-file-icon">
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

                  <span
                    className={`dashboard-status ${note.status}`}
                  >
                    {note.status}
                  </span>

                  <div className="recent-actions">

                    <button
                      className="small-view-btn"
                      onClick={() =>
                        setSelectedNote(note)
                      }
                    >
                      <Eye size={16} />
                    </button>

                    {note.status ===
                      "pending" && (
                      <>
                        <button
                          className="small-approve-btn"
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
                          <X size={16} />
                        </button>
                      </>
                    )}

                    <button
                      className="small-delete-btn"
                      onClick={() =>
                        setShowDeleteModal(
                          note
                        )
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

        {/* REJECTED INFORMATION */}
        {rejectedNotes > 0 && (
          <div className="dashboard-info-box">

            <AlertCircle size={19} />

            <span>
              You currently have{" "}
              <strong>
                {rejectedNotes}
              </strong>{" "}
              rejected note
              {rejectedNotes !== 1
                ? "s"
                : ""}.
            </span>

          </div>
        )}

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
                  STUDY MATERIAL
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
                  <span>Subject</span>
                  <strong>
                    {selectedNote.subject}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Uploaded By</span>
                  <strong>
                    {selectedNote.uploadedBy}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Status</span>
                  <strong
                    className={`dashboard-status ${selectedNote.status}`}
                  >
                    {selectedNote.status}
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
      {showDeleteModal && (

        <div
          className="modern-modal-overlay"
          onClick={() =>
            setShowDeleteModal(null)
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
              Delete this material?
            </h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                "{showDeleteModal.title}"
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="delete-modal-actions">

              <button
                className="cancel-delete"
                onClick={() =>
                  setShowDeleteModal(null)
                }
              >
                Cancel
              </button>

              <button
                className="confirm-delete"
                disabled={
                  actionLoading ===
                  showDeleteModal._id
                }
                onClick={() =>
                  handleDelete(
                    showDeleteModal._id
                  )
                }
              >
                <Trash2 size={16} />

                {actionLoading ===
                showDeleteModal._id
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

export default AdminDashboard;