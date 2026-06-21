import { Link } from "react-router-dom";

const links = {
  Resources: [
    { label: "Notes", to: "/notes" },
    { label: "Syllabus", to: "/syllabus" },
    { label: "Past Questions", to: "/past-questions" },
    { label: "Video Guides", to: "/videos" },
    { label: "Developer Tools", to: "/tools" },
  ],
  Platform: [
    { label: "Quiz Engine", to: "/quiz" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Career Guide", to: "/career-guide" },
    { label: "Sign In", to: "/login" },
    { label: "Register", to: "/register" },
  ],
  About: [
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
};

const team = [
  "Saroj Dhital",
  "Aadarsha Tolangi",
  "Milan Bishwokarma",
  "Rijan Maharjan",
  "Saksham Khadka"
];

export default function Footer() {
  return (
    <footer className="bg-[#f1f0f8] border-t border-[#d8d6ee] text-[#6b6880]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-14 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              B
            </div>
            <span className="text-[#1e1c2e] font-bold text-base tracking-tight">
              BCSIT Study Hub
            </span>
          </Link>

          <p className="text-sm leading-relaxed text-[#7a7790] mb-5">
            A student-built academic portal for BCSIT learners at Quest International College, Gwarko, Lalitpur.
          </p>

          <div className="mb-2 text-[10px] uppercase tracking-widest text-[#a8a5bc] font-semibold">
            Innovation Group · Sem IV
          </div>

          <div className="space-y-1">
            {team.map((n) => (
              <p key={n} className="text-xs text-[#8f8ca4] font-medium">
                {n}
              </p>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(links).map(([heading, items]) => (
          <div key={heading}>
            <h4 className="text-[11px] font-bold text-[#1e1c2e] uppercase tracking-[0.1em] mb-4">
              {heading}
            </h4>
            <ul className="space-y-2.5">
              {items.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-[#6b6880] hover:text-[#1e1c2e] font-medium transition-colors duration-150 inline-block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#d8d6ee]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#a8a5bc] font-medium">
          <span>
            © {new Date().getFullYear()} BCSIT Study Hub · Quest International College · Pokhara University
          </span>
          <div className="flex gap-4">
            <span className="hover:text-[#6b6880] transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-[#6b6880] transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-[#6b6880] transition-colors cursor-pointer">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}