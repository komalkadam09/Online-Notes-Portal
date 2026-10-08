import {
  BookOpen,
  LayoutDashboard,
  Search,
  Upload,
  Bookmark,
  FolderOpen,
  User,
  LogOut,
  FileText,
  Download,
  Clock3,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./MyBookmarks.css";

function MyBookmarks() {
  const bookmarks = [
    {
      title: "Machine Learning Fundamentals",
      subject: "Machine Learning",
      semester: "Semester 5",
      uploadedBy: "Student Community",
      downloads: 124,
      date: "Oct 5, 2026",
    },
    {
      title: "Database Management System Notes",
      subject: "DBMS",
      semester: "Semester 5",
      uploadedBy: "Student Community",
      downloads: 86,
      date: "Oct 2, 2026",
    },
    {
      title: "Data Science Important Questions",
      subject: "Data Science",
      semester: "Semester 5",
      uploadedBy: "Student Community",
      downloads: 41,
      date: "Sep 21, 2026",
    },
    {
      title: "Operating System Unit 3",
      subject: "Operating System",
      semester: "Semester 4",
      uploadedBy: "Student Community",
      downloads: 68,
      date: "Sep 18, 2026",
    },
  ];

  return (
    <div className="bookmarks-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <BookOpen size={21} />
          </div>
          <span>StudySphere</span>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-label">MENU</p>

          <Link to="/dashboard" className="nav-item">
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </Link>

          <Link to="/browse-notes" className="nav-item">
            <Search size={19} />
            <span>Browse Notes</span>
          </Link>

          <Link to="/upload-notes" className="nav-item">
            <Upload size={19} />
            <span>Upload Notes</span>
          </Link>

          <Link to="/my-bookmarks" className="nav-item active">
            <Bookmark size={19} />
            <span>My Bookmarks</span>
          </Link>

          <Link to="/my-uploads" className="nav-item">
            <FolderOpen size={19} />
            <span>My Uploads</span>
          </Link>

          <p className="nav-label account-label">ACCOUNT</p>

          <Link to="/profile" className="nav-item">
            <User size={19} />
            <span>Profile</span>
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <button className="logout-btn">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="bookmarks-main">
        <div className="bookmarks-header">
          <div>
            <p className="page-eyebrow">SAVED STUDY MATERIAL</p>
            <h1>My Bookmarks</h1>
            <p className="page-subtitle">
              Quickly access the notes you saved for later.
            </p>
          </div>

          <div className="bookmark-count">
            <Bookmark size={17} />
            <span>{bookmarks.length} Saved Notes</span>
          </div>
        </div>

        {/* Bookmark Grid */}
        <div className="bookmarks-grid">
          {bookmarks.map((note, index) => (
            <article className="bookmark-card" key={index}>
              <div className="bookmark-card-top">
                <div className="note-icon">
                  <FileText size={22} />
                </div>

                <button className="bookmark-btn" title="Remove bookmark">
                  <Bookmark size={18} fill="currentColor" />
                </button>
              </div>

              <div className="note-content">
                <span className="subject-badge">{note.subject}</span>

                <h2>{note.title}</h2>

                <p>
                  {note.semester} · Uploaded {note.date}
                </p>
              </div>

              <div className="note-meta">
                <span>
                  <Download size={14} />
                  {note.downloads} downloads
                </span>

                <span>
                  <Clock3 size={14} />
                  {note.uploadedBy}
                </span>
              </div>

              <Link to="/note-details" className="view-note-link">
                View Note
                <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MyBookmarks;