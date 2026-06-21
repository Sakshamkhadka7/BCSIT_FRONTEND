import { useState, useEffect, useMemo } from "react";
import { syllabusApi } from "../services/api";
import SEO from "../components/SEO";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SemesterInfo { semesterId: string; semesterNumber: number }
interface SubjectInfo  { subjectId: string; subjectName: string; courseCode: string; Semester?: SemesterInfo }

interface BackendSyllabus {
  syallabusId: string;
  syllabusName: string;
  syllabusFile: string;
  creditHours: number | null;
  unit: number | null;
  Subject?: SubjectInfo;
}

const SEM_ROMAN = ["I","II","III","IV","V","VI","VII","VIII"];

const CARD_ACCENTS = [
  { border: "border-t-indigo-500",  badge: "bg-indigo-50 text-indigo-700",   icon: "text-indigo-500"   },
  { border: "border-t-sky-500",     badge: "bg-sky-50 text-sky-700",         icon: "text-sky-500"      },
  { border: "border-t-teal-500",    badge: "bg-teal-50 text-teal-700",       icon: "text-teal-500"     },
  { border: "border-t-violet-500",  badge: "bg-violet-50 text-violet-700",   icon: "text-violet-500"   },
  { border: "border-t-rose-500",    badge: "bg-rose-50 text-rose-700",       icon: "text-rose-500"     },
  { border: "border-t-amber-500",   badge: "bg-amber-50 text-amber-700",     icon: "text-amber-500"    },
  { border: "border-t-emerald-500", badge: "bg-emerald-50 text-emerald-700", icon: "text-emerald-500"  },
  { border: "border-t-fuchsia-500", badge: "bg-fuchsia-50 text-fuchsia-700", icon: "text-fuchsia-500"  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Syllabus() {
  const [syllabuses, setSyllabuses] = useState<BackendSyllabus[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [selSem,     setSelSem]     = useState<number>(1);
  const [pdfUrl,     setPdfUrl]     = useState<string | null>(null);
  const [pdfTitle,   setPdfTitle]   = useState("");
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    syllabusApi.getAll()
      .then(r => r.json())
      .then(data => {
        const arr: BackendSyllabus[] = Array.isArray(data?.data) ? data.data : [];
        setSyllabuses(arr);
        const first = arr
          .map(s => s.Subject?.Semester?.semesterNumber ?? 0)
          .filter(n => n > 0)
          .sort((a, b) => a - b)[0];
        if (first) setSelSem(first);
      })
      .catch(() => setError("Failed to load syllabuses."))
      .finally(() => setLoading(false));
  }, []);

  const semesters = useMemo(() => {
    const nums = syllabuses
      .map(s => s.Subject?.Semester?.semesterNumber ?? 0)
      .filter(n => n > 0);
    return [...new Set(nums)].sort((a, b) => a - b);
  }, [syllabuses]);

  const currentSyllabuses = syllabuses.filter(
    s => s.Subject?.Semester?.semesterNumber === selSem,
  );

  const totalCredits = currentSyllabuses.reduce((a, s) => a + (s.creditHours ?? 0), 0);

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="BCSIT Syllabus | Pokhara University Course Syllabus"
        description="Complete Pokhara University BCSIT syllabus for all 8 semesters. Unit-wise breakdown, credit hours and learning objectives for every BCSIT and CSIT subject."
        keywords="BCSIT syllabus, CSIT syllabus, Pokhara University syllabus, BCSIT course syllabus, IT syllabus Nepal, BCSIT credit hours, PU BCSIT syllabus"
        canonical="/syllabus"
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">Pokhara University</p>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">BCSIT Syllabus</h1>
          <p className="text-slate-500 text-sm">
            {loading ? "Loading…" : `${syllabuses.length} syllabuses · ${semesters.length} semesters`}
          </p>
        </div>

        {/* Semester tabs */}
        {!loading && semesters.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto">
            <div className="flex border-t border-slate-100 min-w-max">
              {semesters.map(sem => (
                <button
                  key={sem}
                  onClick={() => { setSelSem(sem); setPdfUrl(null); }}
                  className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    selSem === sem
                      ? "border-indigo-600 text-indigo-600 bg-indigo-50/60"
                      : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Sem {SEM_ROMAN[sem - 1] ?? sem}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center py-32">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 text-sm">Loading syllabuses…</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-32">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && syllabuses.length === 0 && (
        <div className="flex items-center justify-center py-32 text-center px-4">
          <div>
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-xl font-bold text-slate-300">No syllabus uploaded yet</h2>
            <p className="text-slate-400 text-sm mt-2">Syllabuses uploaded by admin will appear here.</p>
          </div>
        </div>
      )}

      {/* Content */}
      {!loading && !error && syllabuses.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

          {/* Summary cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Semester</div>
              <div className="text-2xl font-bold text-slate-900">Semester {SEM_ROMAN[selSem - 1]}</div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Subjects</div>
              <div className="text-2xl font-bold text-slate-900">{currentSyllabuses.length}</div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Credit Hours</div>
              <div className="text-2xl font-bold text-slate-900">{totalCredits}</div>
            </div>
          </div>

          {currentSyllabuses.length === 0 ? (
            <div className="flex items-center justify-center h-40 rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 text-sm">No syllabus uploaded for this semester yet.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentSyllabuses.map((syl, i) => {
                const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
                const sub    = syl.Subject;
                const abbr   = sub?.courseCode || (sub?.subjectName ?? syl.syllabusName).split(" ").map(w => w[0]).join("").slice(0, 4).toUpperCase();

                return (
                  <div key={syl.syallabusId} className={`bg-white rounded-2xl border border-slate-200 border-t-4 ${accent.border} overflow-hidden hover:shadow-lg transition-all duration-200`}>
                    {/* Card header */}
                    <div className="relative px-5 pt-5 pb-4 overflow-hidden">
                      {/* Watermark */}
                      <span
                        aria-hidden
                        className="absolute right-3 top-1 select-none pointer-events-none font-black text-slate-100 leading-none"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
                      >
                        {abbr}
                      </span>

                      {/* Icon */}
                      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 relative z-10">
                        <svg className={`w-6 h-6 ${accent.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 leading-snug relative z-10 pr-12">
                        {sub?.subjectName ?? syl.syllabusName}
                      </h3>
                      {sub?.courseCode && (
                        <span className={`inline-block mt-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full relative z-10 ${accent.badge}`}>
                          {sub.courseCode}
                        </span>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="px-5 pb-5 border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {syl.creditHours ?? "—"} credit hrs
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                          </svg>
                          {syl.unit ?? "—"} units
                        </span>
                      </div>

                      <p className="text-sm text-slate-400 truncate mb-4">{syl.syllabusName}</p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => { setPdfUrl(syl.syllabusFile); setPdfTitle(sub?.subjectName ?? syl.syllabusName); setFullscreen(false); }}
                          className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
                        >
                          View PDF
                        </button>
                        <a
                          href={syl.syllabusFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50 transition-colors"
                          title="Open in new tab"
                        >
                          ↗
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* PDF Fullscreen */}
      {pdfUrl && fullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 bg-slate-800 border-b border-slate-700 shrink-0">
            <div className="min-w-0">
              <p className="text-slate-400 text-xs">Syllabus</p>
              <h2 className="text-white font-semibold text-base truncate">{pdfTitle}</h2>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 text-xs font-medium hover:bg-slate-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
              <button
                onClick={() => setFullscreen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Exit Fullscreen
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <iframe src={pdfUrl} title={pdfTitle} className="w-full h-full" style={{ border: "none" }} />
          </div>
        </div>
      )}

      {/* PDF Modal */}
      {pdfUrl && !fullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setPdfUrl(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl flex flex-col"
            style={{ maxHeight: "90vh" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Syllabus</p>
                <h3 className="font-bold text-slate-800">{pdfTitle}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFullscreen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-medium hover:bg-slate-100 transition-colors"
                  title="View fullscreen"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  Fullscreen
                </button>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
                <button
                  onClick={() => setPdfUrl(null)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-100"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* PDF viewer */}
            <div className="flex-1 bg-slate-700" style={{ minHeight: "65vh" }}>
              <iframe
                src={pdfUrl}
                title={pdfTitle}
                className="w-full h-full"
                style={{ minHeight: "65vh", border: "none" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
