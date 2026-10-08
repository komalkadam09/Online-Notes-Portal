import {
  BookOpen,
  ArrowLeft,
  Download,
  Bookmark,
  FileText,
  User,
  CalendarDays,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./NoteDetails.css";

function NoteDetails() {
  return (
    <div className="note-details-page">
      {/* Sidebar */}
      <aside className="details-sidebar">
        <div className="details-logo">
          <BookOpen size={23} />
          <span>StudySphere</span>
        </div>

        <nav className="details-nav">
          <p>MENU</p>

          <Link to="/dashboard">Dashboard</Link>

          <Link to="/browse-notes" className="active">
            Browse Notes
          </Link>

          <a href="#">Upload Notes</a>

          <a href="#">My Bookmarks</a>

          <a href="#">My Uploads</a>
        </nav>

        <div className="details-profile">
          <div className="details-avatar">K</div>

          <div>
            <strong>Komal Kadam</strong>
            <span>Student</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="details-main">
        <Link to="/browse-notes" className="back-link">
          <ArrowLeft size={16} />
          Back to Browse Notes
        </Link>

        <div className="details-layout">
          {/* Note information */}
          <section className="note-info-panel">
            <div className="details-file-icon">
              <FileText size={28} />
            </div>

            <span className="details-subject">Data Science</span>

            <h1>Machine Learning Fundamentals</h1>

            <p className="details-description">
              Comprehensive study material covering the fundamental concepts
              of machine learning, including supervised learning,
              unsupervised learning, model evaluation, and common algorithms.
            </p>

            <div className="note-meta-grid">
              <div className="note-meta">
                <User size={17} />
                <div>
                  <span>Uploaded by</span>
                  <strong>Student Community</strong>
                </div>
              </div>

              <div className="note-meta">
                <CalendarDays size={17} />
                <div>
                  <span>Uploaded on</span>
                  <strong>October 5, 2026</strong>
                </div>
              </div>

              <div className="note-meta">
                <Eye size={17} />
                <div>
                  <span>Downloads</span>
                  <strong>124 downloads</strong>
                </div>
              </div>

              <div className="note-meta">
                <CheckCircle2 size={17} />
                <div>
                  <span>Status</span>
                  <strong>Verified resource</strong>
                </div>
              </div>
            </div>

            <div className="details-actions">
              <button className="download-button">
                <Download size={18} />
                Download PDF
              </button>

              <button className="bookmark-details-button">
                <Bookmark size={18} />
                Save
              </button>
            </div>
          </section>

          {/* Preview */}
          <aside className="note-preview-panel">
            <div className="preview-header">
              <div>
                <span>DOCUMENT</span>
                <h2>Preview</h2>
              </div>

              <span className="pdf-badge">PDF</span>
            </div>

            <div className="document-preview">
              <FileText size={42} />
              <h3>Machine Learning Fundamentals</h3>
              <p>
                PDF preview will appear here when the actual document is
                connected to the backend.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default NoteDetails;