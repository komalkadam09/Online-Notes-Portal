import "../../App.css";

import {
  LayoutDashboard,
  FileText,
  Clock,
  Upload,
  Users,
  LogOut,
  ArrowLeft,
  FileUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStudyMaterial() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.clear();

    navigate("/admin/login", {
      replace: true,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setError("");
    setMessage("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setFile(null);
      e.target.value = "";
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("PDF file must be smaller than 10 MB.");
      setFile(null);
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!title.trim() || !subject.trim() || !uploadedBy.trim() || !file) {
      setError(
        "Please enter all required details and select a PDF file."
      );
      return;
    }

    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login", {
        replace: true,
      });
      return;
    }

    try {
      setLoading(true);

      // Upload PDF to Cloudinary
      const formData = new FormData();

      formData.append("file", file);

      const uploadResponse = await fetch(
        "http://localhost:5000/api/admin/notes/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        if (uploadResponse.status === 401) {
          localStorage.removeItem("adminToken");

          navigate("/admin/login", {
            replace: true,
          });

          return;
        }

        throw new Error(
          uploadData.message || "Failed to upload PDF"
        );
      }

      // Save study material information in MongoDB
      const noteResponse = await fetch(
        "http://localhost:5000/api/admin/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title.trim(),
            subject: subject.trim(),
            description: description.trim(),
            uploadedBy: uploadedBy.trim(),
            fileUrl: uploadData.fileUrl,
            status: "approved",
          }),
        }
      );

      const noteData = await noteResponse.json();

      if (!noteResponse.ok) {
        throw new Error(
          noteData.message ||
            "Failed to save study material"
        );
      }

      setMessage(
        "Study material uploaded successfully!"
      );

      setTitle("");
      setSubject("");
      setDescription("");
      setUploadedBy("");
      setFile(null);

      const fileInput = document.getElementById("pdfFile");

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error(
        "Upload study material error:",
        error
      );

      setError(
        error.message ||
          "Unable to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-shell">

      {/* Sidebar */}
      <aside className="modern-sidebar">

        <div className="brand-area">
          <div className="brand-icon">
            <FileText size={24} />
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
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </button>

          <button
            className="sidebar-link"
            onClick={() =>
              navigate("/admin/study-materials")
            }
          >
            <FileText size={19} />
            <span>Study Materials</span>
          </button>

          <button
            className="sidebar-link"
            onClick={() =>
              navigate("/admin/pending-notes")
            }
          >
            <Clock size={19} />
            <span>Pending Notes</span>
          </button>

          <button className="sidebar-link active">
            <Upload size={19} />
            <span>Add Material</span>
          </button>

          <button
            className="sidebar-link"
            onClick={() =>
              alert("Student Management will be added later.")
            }
          >
            <Users size={19} />
            <span>Students</span>
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="admin-mini-profile">
            <div className="mini-avatar">
              A
            </div>

            <div>
              <strong>Administrator</strong>
              <span>Admin</span>
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

      {/* Main Content */}
      <main className="modern-main">

        {/* Topbar */}
        <div className="dashboard-topbar">

          <div className="breadcrumb">
            <span>Admin</span>
            <span>/</span>
            <strong>Add Study Material</strong>
          </div>

          <button
            className="icon-refresh"
            onClick={() =>
              navigate("/admin/study-materials")
            }
            title="Back to Study Materials"
          >
            <ArrowLeft size={19} />
          </button>

        </div>

        {/* Page Header */}
        <div className="page-title-section">
          <div>
            <p className="welcome-label">
              CONTENT MANAGEMENT
            </p>

            <h1>Add Study Material</h1>

            <p>
              Upload a PDF and add study material details.
            </p>
          </div>
        </div>

        {/* Upload Form */}
        <div className="upload-card">

          <div className="upload-card-header">

            <div className="upload-card-icon">
              <FileUp size={24} />
            </div>

            <div>
              <h2>Upload Study Material</h2>
              <p>
                Add a new study material for students.
              </p>
            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              {/* Title */}
              <div className="form-group">

                <label>
                  Material Title <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="Example: Data Structures Notes"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  required
                />

              </div>

              {/* Subject */}
              <div className="form-group">

                <label>
                  Subject <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="Example: Data Structures"
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.value)
                  }
                  required
                />

              </div>

              {/* Uploaded By */}
              <div className="form-group">

                <label>
                  Uploaded By <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter uploader name"
                  value={uploadedBy}
                  onChange={(e) =>
                    setUploadedBy(e.target.value)
                  }
                  required
                />

              </div>

              {/* Description */}
              <div className="form-group">

                <label>Description</label>

                <textarea
                  placeholder="Write a short description about this material..."
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows="5"
                />

              </div>

            </div>

            {/* File Upload */}
            <div className="form-group file-form-group">

              <label>
                PDF File <span>*</span>
              </label>

              <div className="modern-file-upload">

                <input
                  id="pdfFile"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                />

                <label
                  htmlFor="pdfFile"
                  className="file-upload-label"
                >
                  <div className="file-upload-icon">
                    <Upload size={25} />
                  </div>

                  <div>
                    <strong>
                      Click to select PDF
                    </strong>

                    <span>
                      Only PDF files up to 10 MB
                    </span>
                  </div>
                </label>

              </div>

              {file && (
                <div className="selected-file-box">

                  <FileText size={20} />

                  <div>
                    <strong>{file.name}</strong>

                    <span>
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>

                  <CheckCircle
                    size={20}
                    className="file-success-icon"
                  />

                </div>
              )}

            </div>

            {/* Error */}
            {error && (
              <div className="form-alert error-alert">
                <AlertCircle size={19} />
                <span>{error}</span>
              </div>
            )}

            {/* Success */}
            {message && (
              <div className="form-alert success-alert">
                <CheckCircle size={19} />
                <span>{message}</span>
              </div>
            )}

            {/* Buttons */}
            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() =>
                  navigate("/admin/study-materials")
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="upload-button"
                disabled={loading}
              >
                <Upload size={18} />

                {loading
                  ? "Uploading..."
                  : "Upload Material"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default AddStudyMaterial;