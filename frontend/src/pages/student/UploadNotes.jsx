import { useState } from "react";
import {
  Upload,
  FileText,
  BookOpen,
  GraduationCap,
  AlignLeft,
  X,
  CheckCircle2,
  LayoutDashboard,
  Search,
  Bookmark,
  FolderOpen,
  User,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./UploadNotes.css";

function UploadNotes() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="upload-page">
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

          <Link to="/upload-notes" className="nav-item active">
            <Upload size={19} />
            <span>Upload Notes</span>
          </Link>

          <Link to="/my-bookmarks" className="nav-item">
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
      <main className="upload-main">
        <div className="upload-header">
          <div>
            <p className="page-eyebrow">CONTRIBUTE TO THE COMMUNITY</p>
            <h1>Upload Notes</h1>
            <p className="page-subtitle">
              Share your study material and help other students learn better.
            </p>
          </div>
        </div>

        <div className="upload-content">
          <div className="upload-card">
            <div className="card-heading">
              <div className="heading-icon">
                <Upload size={20} />
              </div>

              <div>
                <h2>Note Information</h2>
                <p>Provide details about the study material.</p>
              </div>
            </div>

            <div className="form-grid">
              {/* Note Title */}
              <div className="form-group">
                <label>Note Title</label>

                <div className="input-wrapper">
                  <FileText size={18} />

                  <input
                    type="text"
                    placeholder="e.g. Machine Learning Unit 1"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="form-group">
                <label>Subject</label>

                <div className="input-wrapper">
                  <BookOpen size={18} />

                  <select defaultValue="">
                    <option value="" disabled>
                      Select subject
                    </option>
                    <option>Data Science</option>
                    <option>Machine Learning</option>
                    <option>Database Management System</option>
                    <option>Operating System</option>
                    <option>Computer Networks</option>
                    <option>Artificial Intelligence</option>
                  </select>
                </div>
              </div>

              {/* Semester */}
              <div className="form-group">
                <label>Semester</label>

                <div className="input-wrapper">
                  <GraduationCap size={18} />

                  <select defaultValue="">
                    <option value="" disabled>
                      Select semester
                    </option>
                    <option>Semester 1</option>
                    <option>Semester 2</option>
                    <option>Semester 3</option>
                    <option>Semester 4</option>
                    <option>Semester 5</option>
                    <option>Semester 6</option>
                    <option>Semester 7</option>
                    <option>Semester 8</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="form-group full-width">
                <label>Description</label>

                <div className="textarea-wrapper">
                  <AlignLeft size={18} />

                  <textarea
                    placeholder="Briefly describe what these notes contain..."
                    rows="5"
                  />
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="file-section">
              <label>Upload PDF</label>

              {!file ? (
                <label className="drop-zone">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />

                  <div className="upload-icon">
                    <Upload size={25} />
                  </div>

                  <h3>Drop your PDF here or browse</h3>

                  <p>
                    Upload a PDF file containing your notes.
                  </p>

                  <span className="file-limit">
                    Maximum file size: 10 MB
                  </span>
                </label>
              ) : (
                <div className="selected-file">
                  <div className="file-icon">
                    <FileText size={23} />
                  </div>

                  <div className="file-info">
                    <strong>{file.name}</strong>

                    <span>
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>

                  <CheckCircle2
                    className="file-success"
                    size={21}
                  />

                  <button
                    type="button"
                    className="remove-file"
                    onClick={removeFile}
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="upload-actions">
              <button type="button" className="cancel-btn">
                Cancel
              </button>

              <button
                type="button"
                className="submit-upload-btn"
              >
                <Upload size={18} />
                Upload Notes
              </button>
            </div>
          </div>

          {/* Guidelines */}
          <div className="guidelines-card">
            <div className="guidelines-icon">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <h3>Before you upload</h3>

              <ul>
                <li>Upload only educational study material.</li>
                <li>
                  Make sure the PDF is clear and readable.
                </li>
                <li>
                  Do not upload copyrighted material without
                  permission.
                </li>
                <li>Use an accurate title and subject.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UploadNotes;