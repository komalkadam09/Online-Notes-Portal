import { Link } from "react-router-dom";
import {
  BookOpen,
  User,
  Mail,
  Lock,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import "./Register.css";

function Register() {
  return (
    <div className="register-page">
      {/* Left Branding */}
      <section className="register-brand">
        <div className="register-brand-content">
          <div className="brand-logo">
            <BookOpen size={24} />
            <span>StudySphere</span>
          </div>

          <div className="register-brand-main">
            <span className="register-badge">
              <GraduationCap size={16} />
              Your academic workspace
            </span>

            <h1>
              Everything you need
              <br />
              <span>to study better.</span>
            </h1>

            <p>
              Create your account and get access to organized notes,
              study materials, and a smarter way to manage your learning.
            </p>
          </div>

          <p className="register-brand-footer">
            © 2026 StudySphere. Built for students.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="register-form-section">
        <div className="register-card">
          <div className="mobile-register-logo">
            <BookOpen size={22} />
            <span>StudySphere</span>
          </div>

          <div className="register-header">
            <h2>Create your account</h2>
            <p>Join StudySphere and start learning smarter.</p>
          </div>

          <form className="register-form">
            <div className="form-group">
              <label htmlFor="name">Full name</label>

              <div className="register-input-wrapper">
                <User size={18} />
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email address</label>

              <div className="register-input-wrapper">
                <Mail size={18} />
                <input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Password</label>

              <div className="register-input-wrapper">
                <Lock size={18} />
                <input
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm password</label>

              <div className="register-input-wrapper">
                <Lock size={18} />
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="register-submit">
              Create account
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="already-account">
            Already have an account?
            <Link to="/login"> Sign in</Link>
          </p>

          <p className="register-note">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;