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
  MoreVertical,
  Plus,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./MyUploads.css";

function MyUploads() {
  const uploads = [
    {
      title: "Machine Learning Fundamentals",
      subject: "Machine Learning",
      semester: "Semester 5",
      date: "Oct 5, 2026",
      downloads: 124,
      status: "Approved",
    },
    {
      title: "Database Management System Notes",
      subject: "DBMS",
      semester: "Semester 5",
      date: "Oct 2, 2026",
      downloads: 86,
      status: "Approved",
    },
    {
      title: "Operating System Unit 3",
      subject: "Operating System",
      semester: "Semester 4",
      date: "Sep 28, 2026",
      downloads: 0,
      status: "Pending",
    },
    {
      title: "Data Science Important Questions",
      subject: "Data Science",
      semester: "Semester 5",
      date: "Sep 21, 2026",
      downloads: 41,
      status: "Rejected",
    },
  ];

  const getStatusIcon = (status) => {
    if (status === "Approved") {
      return <CheckCircle2 size={15} />;
    }

    if (status === "Pending") {
      return <Clock3 size={15} />;
    }

    return <XCircle size={15} />;
  };

  return (
    <div className="my-uploads-page">
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

          <Link to="/dashboard" className="nav-item">
            <Bookmark size={19} />
            <span>My Bookmarks</span>
          </Link>

          <Link to="/my-uploads" className="nav-item active">
            <FolderOpen size={19} />
            <span>My Uploads</span>
          </Link>

          <p className="nav-label account-label">ACCOUNT</p>

          <Link to="/dashboard" className="nav-item">
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
      <main className="my-uploads-main">
        <div className="uploads-header">
          <div>
            <p className="page-eyebrow">YOUR CONTRIBUTIONS</p>
            <h1>My Uploads</h1>
            <p className="page-subtitle">
              Manage the study material you have shared with the community.
            </p>
          </div>

          <Link to="/upload-notes" className="new-upload-btn">
            <Plus size={18} />
            Upload New Note
          </Link>
        </div>

        {/* Stats */}
        <div className="upload-stats">
          <div className="upload-stat-card">
            <div className="stat-icon blue">
              <FileText size={20} />
            </div>
            <div>
              <span>Total Uploads</span>
              <strong>4</strong>
            </div>
          </div>

          <div className="upload-stat-card">
            <div className="stat-icon green">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <span>Approved</span>
              <strong>2</strong>
            </div>
          </div>

          <div className="upload-stat-card">
            <div className="stat-icon orange">
              <Clock3 size={20} />
            </div>
            <div>
              <span>Pending</span>
              <strong>1</strong>
            </div>
          </div>

          <div className="upload-stat-card">
            <div className="stat-icon red">
              <XCircle size={20} />
            </div>
            <div>
              <span>Rejected</span>
              <strong>1</strong>
            </div>
          </div>
        </div>

        {/* Uploads Table */}
        <div className="uploads-card">
          <div className="table-header">
            <div>
              <h2>Uploaded Notes</h2>
              <p>Track the status and performance of your uploads.</p>
            </div>

            <div className="table-filter">
              <select defaultValue="All">
                <option>All</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          <div className="uploads-table-wrapper">
            <table className="uploads-table">
              <thead>
                <tr>
                  <th>NOTE</th>
                  <th>SUBJECT</th>
                  <th>UPLOADED ON</th>
                  <th>DOWNLOADS</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {uploads.map((upload, index) => (
                  <tr key={index}>
                    <td>
                      <div className="note-name">
                        <div className="note-file-icon">
                          <FileText size={18} />
                        </div>

                        <div>
                          <strong>{upload.title}</strong>
                          <span>{upload.semester}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="subject-text">
                        {upload.subject}
                      </span>
                    </td>

                    <td>
                      <span className="date-text">{upload.date}</span>
                    </td>

                    <td>
                      <div className="download-count">
                        <Download size={15} />
                        {upload.downloads}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${upload.status.toLowerCase()}`}
                      >
                        {getStatusIcon(upload.status)}
                        {upload.status}
                      </span>
                    </td>

                    <td>
                      <button className="more-btn">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyUploads;