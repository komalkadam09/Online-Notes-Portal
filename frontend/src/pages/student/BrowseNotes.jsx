import {
  BookOpen,
  Search,
  SlidersHorizontal,
  Download,
  Bookmark,
  FileText,
  ChevronDown,
} from "lucide-react";
import "./BrowseNotes.css";

function BrowseNotes() {
  const notes = [
    {
      title: "Machine Learning Fundamentals",
      subject: "Data Science",
      semester: "Semester 5",
      downloads: 124,
    },
    {
      title: "SQL & Database Concepts",
      subject: "Database Systems",
      semester: "Semester 5",
      downloads: 98,
    },
    {
      title: "Object Oriented Programming",
      subject: "Programming",
      semester: "Semester 4",
      downloads: 76,
    },
    {
      title: "Operating System Concepts",
      subject: "Computer Science",
      semester: "Semester 5",
      downloads: 65,
    },
    {
      title: "Data Structures & Algorithms",
      subject: "Programming",
      semester: "Semester 4",
      downloads: 91,
    },
    {
      title: "Computer Networks",
      subject: "Computer Science",
      semester: "Semester 5",
      downloads: 58,
    },
  ];

  return (
    <div className="browse-page">
      {/* Sidebar */}
      <aside className="browse-sidebar">
        <div className="browse-logo">
          <BookOpen size={23} />
          <span>StudySphere</span>
        </div>

        <nav className="browse-nav">
          <p className="browse-nav-label">MENU</p>

          <a href="/dashboard">Dashboard</a>

          <a href="/browse-notes" className="active">
            Browse Notes
          </a>

          <a href="#">Upload Notes</a>

          <a href="#">My Bookmarks</a>

          <a href="#">My Uploads</a>
        </nav>

        <div className="browse-profile">
          <div className="browse-avatar">K</div>

          <div>
            <strong>Komal Kadam</strong>
            <span>Student</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="browse-main">
        <div className="browse-header">
          <div>
            <p className="browse-label">STUDY MATERIAL</p>
            <h1>Browse Notes</h1>
            <p>
              Discover notes and study materials shared by students.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="browse-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search notes, subjects or topics..."
          />
        </div>

        {/* Filters */}
        <div className="browse-filters">
          <button className="filter-button">
            <SlidersHorizontal size={16} />
            Filters
          </button>

          <button className="select-filter">
            All Subjects
            <ChevronDown size={15} />
          </button>

          <button className="select-filter">
            All Semesters
            <ChevronDown size={15} />
          </button>

          <span className="notes-count">128 notes available</span>
        </div>

        {/* Notes */}
        <section className="notes-grid">
          {notes.map((note) => (
            <article className="browse-note-card" key={note.title}>
              <div className="note-card-top">
                <div className="browse-file-icon">
                  <FileText size={21} />
                </div>

                <button className="bookmark-button" title="Bookmark">
                  <Bookmark size={17} />
                </button>
              </div>

              <div className="browse-note-content">
                <span className="note-subject">{note.subject}</span>

                <h2>{note.title}</h2>

                <p>{note.semester}</p>
              </div>

              <div className="browse-note-footer">
                <span>
                  <Download size={14} />
                  {note.downloads}
                </span>

                <button className="view-note-button">
                  View note
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default BrowseNotes;