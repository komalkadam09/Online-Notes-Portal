import {
  BookOpen,
  LayoutDashboard,
  Search,
  Upload,
  Bookmark,
  FolderOpen,
  User,
  LogOut,
  Camera,
  Mail,
  GraduationCap,
  Building2,
  CalendarDays,
  Edit3,
  FileText,
  Download,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page">
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

          <Link to="/my-uploads" className="nav-item">
            <FolderOpen size={19} />
            <span>My Uploads</span>
          </Link>

          <p className="nav-label account-label">ACCOUNT</p>

          <Link to="/profile" className="nav-item active">
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
      <main className="profile-main">
        <div className="profile-header">
          <div>
            <p className="page-eyebrow">ACCOUNT SETTINGS</p>
            <h1>My Profile</h1>
            <p className="page-subtitle">
              Manage your personal information and student details.
            </p>
          </div>
        </div>

        {/* Profile Overview */}
        <section className="profile-overview">
          <div className="profile-avatar">
            <span>K</span>
            <button className="camera-btn">
              <Camera size={15} />
            </button>
          </div>

          <div className="profile-basic-info">
            <h2>Komal Kadam</h2>
            <p>Artificial Intelligence & Data Science</p>
            <span className="student-badge">
              <CheckCircle2 size={13} />
              Student Account
            </span>
          </div>

          <button className="edit-profile-btn">
            <Edit3 size={16} />
            Edit Profile
          </button>
        </section>

        <div className="profile-grid">
          {/* Personal Information */}
          <section className="profile-card">
            <div className="card-title">
              <div>
                <h2>Personal Information</h2>
                <p>Your basic account information.</p>
              </div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Full Name</span>
                <div className="info-value">
                  <User size={17} />
                  <span>Komal Kadam</span>
                </div>
              </div>

              <div className="info-item">
                <span className="info-label">Email Address</span>
                <div className="info-value">
                  <Mail size={17} />
                  <span>komal@example.com</span>
                </div>
              </div>
            </div>
          </section>

          {/* Academic Information */}
          <section className="profile-card">
            <div className="card-title">
              <div>
                <h2>Academic Information</h2>
                <p>Your current academic details.</p>
              </div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Course</span>
                <div className="info-value">
                  <GraduationCap size={17} />
                  <span>B.Tech</span>
                </div>
              </div>

              <div className="info-item">
                <span className="info-label">Branch</span>
                <div className="info-value">
                  <BookOpen size={17} />
                  <span>AI & Data Science</span>
                </div>
              </div>

              <div className="info-item">
                <span className="info-label">College</span>
                <div className="info-value">
                  <Building2 size={17} />
                  <span>KBT College of Engineering</span>
                </div>
              </div>

              <div className="info-item">
                <span className="info-label">Current Semester</span>
                <div className="info-value">
                  <CalendarDays size={17} />
                  <span>Semester 5</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Activity */}
        <section className="profile-card activity-card">
          <div className="card-title">
            <div>
              <h2>Contribution Overview</h2>
              <p>Your activity on StudySphere.</p>
            </div>
          </div>

          <div className="activity-grid">
            <div className="activity-item">
              <div className="activity-icon blue">
                <FileText size={19} />
              </div>
              <div>
                <strong>4</strong>
                <span>Notes Uploaded</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon green">
                <CheckCircle2 size={19} />
              </div>
              <div>
                <strong>2</strong>
                <span>Approved Notes</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon purple">
                <Download size={19} />
              </div>
              <div>
                <strong>251</strong>
                <span>Total Downloads</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;