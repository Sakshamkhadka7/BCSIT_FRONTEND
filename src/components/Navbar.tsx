import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";

const navLinks = [
  { label: "Home",           to: "/" },
  { label: "Notes",          to: "/notes" },
  { label: "Syllabus",       to: "/syllabus" },
  { label: "Past Questions", to: "/past-questions" },
  { label: "Quiz",           to: "/quiz" },
  { label: "Tools",          to: "/tools" },
  { label: "Contact",        to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const context = useContext(UserContext);
  if (!context) return null;

  const { user, logout } = context;

  const handleLogout = async () => {
    setDropOpen(false);
    setOpen(false);
    await logout();
    navigate("/login");
  };


  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-display font-bold text-base">B</div>
          <span className="font-display font-bold text-slate-900 text-xl leading-none hidden sm:block">
            BCSIT <span className="text-indigo-600">Study Hub</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to}
              className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${pathname === l.to ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {user && user ? (
            <div className="relative">
              <button onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-2.5 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-base font-medium text-slate-700">
                <span className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold shrink-0">
                  {user.profilePhoto
                    ? <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
                    : user.name.charAt(0).toUpperCase()
                  }
                </span>
                {user.name.split(" ")[0]}
                <svg className={`w-4 h-4 text-slate-400 transition-transform ${dropOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {dropOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-100 py-1.5 z-50">
                  <Link to="/dashboard" onClick={() => setDropOpen(false)} className="flex items-center gap-2.5 px-4 py-3 text-base text-slate-700 hover:bg-slate-50">
                    <span>📊</span> Dashboard
                  </Link>
                  <div className="my-1 border-t border-slate-100" />
                  <button onClick={() => { handleLogout(); }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-base text-red-600 hover:bg-red-50">
                    <span>↗</span> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-base font-medium text-slate-600 hover:text-slate-900">Sign in</Link>
              <Link to="/register" className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold transition-colors">Get started</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pb-5 pt-3 space-y-1">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium ${pathname === l.to ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"}`}>
              {l.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex gap-2 mt-2">
            {user ? (
              <div className="flex items-center gap-3 flex-1">
                <span className="w-10 h-10 rounded-full overflow-hidden bg-indigo-100 text-indigo-700 flex items-center justify-center text-base font-bold shrink-0">
                  {user.profilePhoto
                    ? <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
                    : user.name.charAt(0).toUpperCase()
                  }
                </span>
                <span className="text-base font-medium text-slate-700 truncate">{user.name}</span>
                <button onClick={handleLogout}
                  className="ml-auto py-2 px-4 rounded-lg border border-slate-200 text-slate-600 text-base font-medium hover:bg-slate-50">
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center py-3 rounded-lg border border-slate-200 text-slate-700 text-base font-medium hover:bg-slate-50">Sign in</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="flex-1 text-center py-3 rounded-lg bg-indigo-600 text-white text-base font-semibold hover:bg-indigo-700">Get started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}