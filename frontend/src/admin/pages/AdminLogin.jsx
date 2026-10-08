import "../../App.css";

import {
  BookOpen,
  Mail,
  Lock,
  LogIn,
  ShieldCheck,
  FileText,
  Users,
  GraduationCap,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Invalid email or password"
        );

        setLoading(false);
        return;
      }

      localStorage.setItem(
        "adminToken",
        data.token
      );

      sessionStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Admin login error:",
        error
      );

      setError(
        "Unable to connect to server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      {/* LEFT SIDE */}
      <div className="login-brand-section">

        <div className="login-brand-content">

          {/* Logo */}
          <div className="login-logo">
            <BookOpen size={30} />
          </div>

          {/* Title */}
          <h1 className="login-brand-title">
            Study Portal
          </h1>

          <p className="login-brand-subtitle">
            Online Notes & Study Material Portal
          </p>

          {/* Study Image */}
          <div className="login-study-image">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
              alt="Students studying together"
            />

            <div className="study-image-overlay">
              <BookOpen size={22} />
              <span>
                Learn. Share. Succeed.
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="login-feature-list">

            <div className="login-feature">

              <div className="login-feature-icon">
                <FileText size={20} />
              </div>

              <div>
                <strong>
                  Manage Study Materials
                </strong>

                <span>
                  Upload and manage notes easily.
                </span>
              </div>

            </div>

            <div className="login-feature">

              <div className="login-feature-icon">
                <GraduationCap size={20} />
              </div>

              <div>
                <strong>
                  Support Students
                </strong>

                <span>
                  Provide useful study resources.
                </span>
              </div>

            </div>

            <div className="login-feature">

              <div className="login-feature-icon">
                <Users size={20} />
              </div>

              <div>
                <strong>
                  Manage Portal Content
                </strong>

                <span>
                  Keep study material organized.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="login-form-section">

        <div className="login-card">

          <div className="login-card-header">

            <div className="login-mobile-logo">
              <BookOpen size={23} />
            </div>

            <h2>
              Welcome Back
            </h2>

            <p>
              Login to your administrator account
            </p>

          </div>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="login-input-group">

              <label>
                Email Address
              </label>

              <div className="login-input-box">

                <Mail size={18} />

                <input
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div className="login-input-group">

              <label>
                Password
              </label>

              <div className="login-input-box">

                <Lock size={18} />

                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>

          </form>

          <div className="login-security-note">

            <ShieldCheck size={17} />

            <span>
              Secure administrator access
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;