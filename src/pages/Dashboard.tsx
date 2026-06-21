import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/AuthContext";
import { quizAttemptApi, savedNoteApi } from "../services/api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Attempt {
  attemptId: string;
  score: number;
  totalMarks: number;
  createdAt: string;
}

interface LeaderEntry {
  userId: string;
  totalAttempts: number;
  bestPct: number;
  totalScore: number;
  User?: { name: string; college?: string };
}

interface SavedEntry {
  savedNoteId: string;
  createdAt: string;
  Note?: {
    noteId: string;
    topic: string;
    noteFile: string;
    Content?: {
      chapterName: string;
      Subject?: { subjectName: string; courseCode: string };
    };
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const context  = useContext(UserContext);
  const navigate = useNavigate();
  if (!context) return null;
  const { user, logout } = context;
  if (!user) return <Navigate to="/login" replace />;

  const [attempts,    setAttempts]    = useState<Attempt[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderEntry[]>([]);
  const [saved,       setSaved]       = useState<SavedEntry[]>([]);
  const [loadingA,    setLoadingA]    = useState(true);
  const [loadingL,    setLoadingL]    = useState(true);
  const [loadingS,    setLoadingS]    = useState(true);

  useEffect(() => {
    quizAttemptApi.myAttempts()
      .then(r => r.json())
      .then(d => setAttempts(Array.isArray(d?.data) ? d.data : []))
      .catch(() => {})
      .finally(() => setLoadingA(false));

    quizAttemptApi.leaderboard()
      .then(r => r.json())
      .then(d => setLeaderboard(Array.isArray(d?.data) ? d.data : []))
      .catch(() => {})
      .finally(() => setLoadingL(false));

    savedNoteApi.getMySaved()
      .then(r => r.json())
      .then(d => setSaved(Array.isArray(d?.data) ? d.data : []))
      .catch(() => {})
      .finally(() => setLoadingS(false));
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  async function handleUnsave(noteId: string) {
    await savedNoteApi.unsave(noteId).catch(() => {});
    setSaved(prev => prev.filter(s => s.Note?.noteId !== noteId));
  }

  const bestScore   = attempts.length
    ? Math.max(...attempts.map(a => Math.round((a.score / (a.totalMarks || 1)) * 100)))
    : 0;
  const avgScore    = attempts.length
    ? Math.round(attempts.reduce((s, a) => s + (a.score / (a.totalMarks || 1)) * 100, 0) / attempts.length)
    : 0;
  const myRank      = leaderboard.findIndex(e => e.userId === user.userId) + 1;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">Student Dashboard</p>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user.name} 👋</h1>
            <p className="text-slate-500 text-sm mt-0.5">{user.email} · {user.college ?? "BCSIT"}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Quiz Attempts",  value: attempts.length,           color: "text-indigo-600",  bg: "bg-indigo-50"  },
            { label: "Best Score",     value: `${bestScore}%`,           color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Average Score",  value: `${avgScore}%`,            color: "text-sky-600",     bg: "bg-sky-50"     },
            { label: "Leaderboard",    value: myRank ? `#${myRank}` : "—", color: "text-violet-600",  bg: "bg-violet-50"  },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-5 border border-white shadow-sm`}>
              <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Two-column layout: Quiz history + Leaderboard */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Quiz History */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 text-lg">Quiz History</h2>
              <Link to="/quiz" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                Take Quiz →
              </Link>
            </div>

            {loadingA ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              </div>
            ) : attempts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                <div className="text-4xl mb-3">📊</div>
                <p className="font-semibold text-slate-700">No quiz attempts yet</p>
                <p className="text-sm text-slate-400 mt-1">Start a quiz to track your progress here.</p>
                <Link to="/quiz" className="mt-4 px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
                  Go to Quiz
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {attempts.map((a, i) => {
                  const pct   = Math.round((a.score / (a.totalMarks || 1)) * 100);
                  const grade = pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-500";
                  const date  = new Date(a.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                  return (
                    <div key={a.attemptId} className="flex items-center gap-4 px-6 py-3.5">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800">{a.score} / {a.totalMarks} correct</p>
                        <p className="text-xs text-slate-400">{date}</p>
                      </div>
                      <span className={`text-lg font-bold ${grade}`}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 text-lg">🏆 Leaderboard</h2>
              <span className="text-xs text-slate-400">Top 10 by best score</span>
            </div>

            {loadingL ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                <div className="text-4xl mb-3">🏅</div>
                <p className="font-semibold text-slate-700">No one on the board yet</p>
                <p className="text-sm text-slate-400 mt-1">Be the first to complete a quiz!</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {leaderboard.map((entry, i) => {
                  const isMe     = entry.userId === user.userId;
                  const medal    = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;
                  const rankText = medal ?? `#${i + 1}`;
                  return (
                    <div
                      key={entry.userId}
                      className={`flex items-center gap-4 px-6 py-3.5 ${isMe ? "bg-indigo-50/60" : ""}`}
                    >
                      <span className="text-lg w-7 text-center shrink-0">{rankText}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${isMe ? "text-indigo-700" : "text-slate-800"}`}>
                          {entry.User?.name ?? "Unknown"} {isMe && <span className="text-xs font-normal text-indigo-400">(you)</span>}
                        </p>
                        <p className="text-xs text-slate-400 truncate">{entry.User?.college ?? ""} · {entry.totalAttempts} attempt{entry.totalAttempts !== 1 ? "s" : ""}</p>
                      </div>
                      <span className={`text-base font-bold ${Number(entry.bestPct) >= 80 ? "text-emerald-600" : Number(entry.bestPct) >= 60 ? "text-amber-600" : "text-slate-600"}`}>
                        {Math.round(Number(entry.bestPct))}%
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Saved Notes */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 text-lg">Saved Notes</h2>
            <Link to="/notes" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
              Browse Notes →
            </Link>
          </div>

          {loadingS ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            </div>
          ) : saved.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-6">
              <div className="text-4xl mb-3">🔖</div>
              <p className="font-semibold text-slate-700">No saved notes yet</p>
              <p className="text-sm text-slate-400 mt-1">Click the bookmark button while reading a note to save it here.</p>
              <Link to="/notes" className="mt-4 px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
                Browse Notes
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
              {saved.map(s => {
                const note    = s.Note;
                const subject = note?.Content?.Subject;
                return (
                  <div key={s.savedNoteId} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        {subject && (
                          <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider mb-1">{subject.courseCode} · {subject.subjectName}</p>
                        )}
                        <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2">{note?.topic ?? "—"}</p>
                        {note?.Content && (
                          <p className="text-xs text-slate-400 mt-1">{note.Content.chapterName}</p>
                        )}
                      </div>
                      <button
                        onClick={() => note?.noteId && handleUnsave(note.noteId)}
                        title="Remove from saved"
                        className="shrink-0 text-indigo-400 hover:text-red-400 transition-colors mt-0.5"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                    {note?.noteFile && (
                      <a
                        href={note.noteFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        Open PDF →
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-800 text-lg mb-4">Profile</h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {[
              { label: "Full Name",  value: user.name      },
              { label: "Email",      value: user.email     },
              { label: "Role",       value: user.role      },
              ...(user.college     ? [{ label: "College",  value: user.college     }] : []),
              ...(user.phoneNumber ? [{ label: "Phone",    value: user.phoneNumber }] : []),
            ].map(f => (
              <div key={f.label} className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">{f.label}</p>
                <p className="font-medium text-slate-800 break-all">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
