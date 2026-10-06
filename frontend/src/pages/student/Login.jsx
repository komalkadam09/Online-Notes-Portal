import { Link } from "react-router-dom";
import {
  BookOpen,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Search,
  GraduationCap,
} from "lucide-react";
import "./Login.css";

function Login() {
  return (
    <div className="login-page">
      {/* Left Branding Section */}
      <section className="login-brand">
        <div className="brand-content">
          <div className="brand-logo">
            <BookOpen size={24} />
            <span>StudySphere</span>
          </div>

          <div className="brand-main">
            <span className="brand-badge">
              <GraduationCap size={16} />
              Academic Learning Platform
            </span>

            <h1>
              Learn smarter.
              <br />
              <span>Study better.</span>
            </h1>

            <p>
              Access organized study materials, share knowledge with your
              peers, and keep all your academic resources in one place.
            </p>

            <div className="brand-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <Search size={18} />
                </div>
                <div>
                  <strong>Find what you need</strong>
                  <span>Search notes by subject, semester and topic.</span>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <strong>Trusted resources</strong>
                  <span>Access organized and verified study material.</span>
                </div>
              </div>
            </div>
          </div>

          <p className="brand-footer">
            © 2026 StudySphere. Built for students.
          </p>
        </div>
      </section>

      {/* Right Login Section */}
      <section className="login-form-section">
        <div className="login-card">
          <div className="mobile-logo">
            <BookOpen size={22} />
            <span>StudySphere</span>
          </div>

          <div className="login-header">
            <h2>Welcome back</h2>
            <p>Sign in to continue to your student portal.</p>
          </div>

          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <div className="input-wrapper">
                <Mail size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <div className="input-wrapper">
                <Lock size={18} />
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-button">
              Sign in
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="login-divider">
            <span>New to StudySphere?</span>
          </div>

          <Link to="/register" className="register-button">
            Create an account
          </Link>

          <p className="login-note">
            By continuing, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;