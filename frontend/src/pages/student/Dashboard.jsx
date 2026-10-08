import {
  BookOpen,
  LayoutDashboard,
  Search,
  Upload,
  Clock3,
  Bookmark,
  Download,
  ChevronRight,
  FileText,
  Code2,
  Database,
  Brain,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const subjects = [
    {
      name: "Data Science",
      notes: 24,
      icon: Brain,
    },
    {
      name: "Database Systems",
      notes: 18,
      icon: Database,
    },
    {
      name: "Programming",
      notes: 31,
      icon: Code2,
    },
  ];

  const recentNotes = [
    {
      title: "Machine Learning Fundamentals",
      subject: "Data Science",
      type: "PDF",
      downloads: 124,
    },
    {
      title: "SQL & Database Concepts",
      subject: "Database Systems",
      type: "PDF",
      downloads: 98,
    },
    {
      title: "Object Oriented Programming",
      subject: "Programming",
      type: "PDF",
      downloads: 76,
    },
  ];

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <BookOpen size={23} />
          <span>StudySphere</span>
        </div>

        <nav className="dashboard-nav">
          <p className="nav-label">MENU</p>

          <Link to="/dashboard" className="nav-item active">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link to="/browse-notes" className="nav-item">
            <Search size={18} />
            Browse Notes
          </Link>

          <Link to="/upload-notes" className="nav-item">
            <Upload size={18} />
            Upload Notes
          </Link>

          <Link to="/my-bookmarks" className="nav-item">
            <Bookmark size={18} />
            My Bookmarks
          </Link>

          <Link to="/my-uploads" className="nav-item">
            <Clock3 size={18} />
            My Uploads
          </Link>

          <p className="nav-label account-label">ACCOUNT</p>

          <Link to="/profile" className="nav-item">
            <User size={18} />
            Profile
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-profile">
            <div className="profile-avatar">K</div>

            <div>
              <strong>Komal Kadam</strong>
              <span>Student</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-greeting">
              Good morning, Komal
            </p>

            <h1>Welcome back!</h1>

            <p className="dashboard-subtitle">
              Find your study materials and continue learning.
            </p>
          </div>

          <Link to="/upload-notes" className="header-upload-btn">
            <Upload size={17} />
            Upload Notes
          </Link>
        </header>

        {/* Search */}
        <section className="dashboard-search">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search notes, subjects, topics..."
          />
        </section>

        {/* Quick Stats */}
        <section className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon blue">
              <FileText size={19} />
            </div>

            <div>
              <span>Total Notes</span>
              <strong>128</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <Download size={19} />
            </div>

            <div>
              <span>Downloads</span>
              <strong>342</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              <Bookmark size={19} />
            </div>

            <div>
              <span>Bookmarks</span>
              <strong>16</strong>
            </div>
          </div>
        </section>

        {/* Subjects */}
        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Explore subjects</h2>
              <p>Browse notes by your favourite subjects.</p>
            </div>

            <Link to="/browse-notes" className="section-view-btn">
              View all
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="subject-grid">
            {subjects.map((subject) => {
              const Icon = subject.icon;

              return (
                <div className="subject-card" key={subject.name}>
                  <div className="subject-icon">
                    <Icon size={21} />
                  </div>

                  <div>
                    <h3>{subject.name}</h3>
                    <p>{subject.notes} notes available</p>
                  </div>

                  <ChevronRight
                    className="subject-arrow"
                    size={18}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent Notes */}
        <section className="dashboard-section recent-section">
          <div className="section-heading">
            <div>
              <h2>Recently added notes</h2>
              <p>Fresh study material from the community.</p>
            </div>

            <Link to="/browse-notes" className="section-view-btn">
              View all
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="notes-list">
            {recentNotes.map((note) => (
              <div className="note-row" key={note.title}>
                <div className="note-file-icon">
                  <FileText size={21} />
                </div>

                <div className="note-info">
                  <h3>{note.title}</h3>

                  <p>
                    {note.subject} · {note.type}
                  </p>
                </div>

                <div className="note-downloads">
                  <Download size={15} />
                  {note.downloads}
                </div>

                <Link
                  to="/note-details"
                  className="note-view-btn"
                >
                  View
                  <ChevronRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;