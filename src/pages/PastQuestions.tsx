import { useMemo, useState, useEffect } from "react";
import { questionsApi } from "../services/api";
import SEO from "../components/SEO";

interface BackendQuestion {
  questionId: string;
  subjectQuestion: string;
  questionFile: string;
  questionYear: number;
  questionLevel: "easy" | "meduim" | "hard";
  subjectId: string;
  createdAt: string;
}

interface QuestionPaper {
  id: string;
  title: string;
  year: number;
  level: string;
  downloadUrl: string;
}

const levelColors: Record<string, string> = {
  easy: "bg-emerald-100 text-emerald-700",
  meduim: "bg-amber-100 text-amber-700",
  hard: "bg-red-100 text-red-700",
};

function mapQuestion(q: BackendQuestion): QuestionPaper {
  return {
    id: q.questionId,
    title: q.subjectQuestion,
    year: q.questionYear,
    level: q.questionLevel,
    downloadUrl: q.questionFile,
  };
}

export default function PastQuestions() {
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [search, setSearch] = useState("");
  const [year, setYear] = useState<number | "all">("all");
  const [level, setLevel] = useState("all");

  const [viewPaper, setViewPaper] = useState<QuestionPaper | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    questionsApi
      .getAll()
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.data)) {
          setPapers(data.data.map(mapQuestion));
        } else {
          setPapers([]);
        }
      })
      .catch(() => setFetchError("Failed to load questions. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const years = useMemo(
    () => [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a),
    [papers],
  );

  const filtered = useMemo(() => {
    let data = [...papers];

    if (year !== "all") data = data.filter((q) => q.year === year);
    if (level !== "all") data = data.filter((q) => q.level === level);

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((p) => p.title.toLowerCase().includes(q));
    }

    return data;
  }, [search, year, level, papers]);

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="BCSIT Past Questions | Previous Year Exam Papers"
        description="Download BCSIT past exam question papers from Pokhara University. Board, Pre-Board and Mid-Term questions organised by year and subject for BCSIT and CSIT students."
        keywords="BCSIT past questions, CSIT past questions, Pokhara University question papers, BCSIT exam papers, BCSIT previous year questions, IT past questions Nepal, BCSIT board questions"
        canonical="/past-questions"
      />

      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
            Examination Archive
          </p>

          <h1 className="font-display text-3xl font-bold text-slate-900">
            Past Questions
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            {loading ? "Loading…" : `${papers.length} question papers available`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search papers..."
            className="px-4 py-3 border border-slate-200 rounded-xl"
          />

          <select
            value={year}
            onChange={(e) =>
              setYear(e.target.value === "all" ? "all" : Number(e.target.value))
            }
            className="px-4 py-3 border border-slate-200 rounded-xl"
          >
            <option value="all">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-xl"
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="meduim">Medium</option>
            <option value="hard">Hard</option>
          </select>

        </div>

        {loading && (
          <p className="text-slate-400 text-center py-12">Loading questions…</p>
        )}

        {fetchError && (
          <p className="text-red-500 text-center py-12">{fetchError}</p>
        )}

        {!loading && !fetchError && filtered.length === 0 && (
          <p className="text-slate-400 text-center py-12">No question papers found.</p>
        )}

        {!loading && !fetchError && filtered.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((paper) => (
              <PaperCard key={paper.id} paper={paper} onView={() => { setViewPaper(paper); setFullscreen(false); }} />
            ))}
          </div>
        )}
      </div>

      {/* PDF Fullscreen */}
      {viewPaper && fullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 bg-slate-800 border-b border-slate-700 shrink-0">
            <div className="min-w-0">
              <p className="text-slate-400 text-xs">{viewPaper.year} · <span className="capitalize">{viewPaper.level === "meduim" ? "Medium" : viewPaper.level}</span></p>
              <h2 className="text-white font-semibold text-base truncate">{viewPaper.title}</h2>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <a
                href={viewPaper.downloadUrl}
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
            <iframe src={viewPaper.downloadUrl} title={viewPaper.title} className="w-full h-full" style={{ border: "none" }} />
          </div>
        </div>
      )}

      {/* PDF Modal */}
      {viewPaper && !fullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setViewPaper(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl flex flex-col"
            style={{ maxHeight: "90vh" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
              <div>
                <p className="text-xs text-slate-400 mb-0.5">
                  Past Question · {viewPaper.year} ·{" "}
                  <span className={`font-semibold px-1.5 py-0.5 rounded ${levelColors[viewPaper.level] ?? "text-slate-600"}`}>
                    {viewPaper.level === "meduim" ? "Medium" : viewPaper.level.charAt(0).toUpperCase() + viewPaper.level.slice(1)}
                  </span>
                </p>
                <h3 className="font-bold text-slate-800">{viewPaper.title}</h3>
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
                  href={viewPaper.downloadUrl}
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
                  onClick={() => setViewPaper(null)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-100"
                >
                  ✕ Close
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-700" style={{ minHeight: "65vh" }}>
              <iframe
                src={viewPaper.downloadUrl}
                title={viewPaper.title}
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

function PaperCard({ paper, onView }: { paper: QuestionPaper; onView: () => void }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-slate-200 hover:shadow-md transition-all">

      <div className="flex justify-between items-center mb-3">
        <span
          className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${
            levelColors[paper.level] ?? "bg-slate-100 text-slate-600"
          }`}
        >
          {paper.level === "meduim" ? "Medium" : paper.level.charAt(0).toUpperCase() + paper.level.slice(1)}
        </span>

        <span className="text-xs text-slate-400">{paper.year}</span>
      </div>

      <h3 className="font-semibold text-slate-800 mb-4">{paper.title}</h3>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
        <button
          onClick={onView}
          className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
        >
          View PDF
        </button>
        <a
          href={paper.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-10 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-colors shrink-0"
          title="Download"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      </div>

    </div>
  );
}
