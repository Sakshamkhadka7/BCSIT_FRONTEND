import { useContext, useState } from "react";
import { useQuiz } from "../hooks/useQuiz";
import { UserContext } from "../context/AuthContext";
import { quizAttemptApi } from "../services/api";
import SEO from "../components/SEO";

const SEM_ROMAN = ["I","II","III","IV","V","VI","VII","VIII"];

const DIFF_STYLE: Record<string, string> = {
  easy:   "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  hard:   "bg-red-100 text-red-700",
};

function formatTime(s: number) {
  const m   = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Quiz() {
  const context = useContext(UserContext);
  const user    = context?.user ?? null;

  const [selSem,     setSelSem]     = useState<number>(0);
  const [selSubject, setSelSubject] = useState<string>("all");
  const [showExpl,   setShowExpl]   = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const {
    state, score, timeTaken, loading, error,
    startQuiz, answer, next, prev, jumpTo, finish, reset,
    availableSemesters, subjectsBySemester, getAvailableCount,
  } = useQuiz(selSubject, selSem);

  async function handleFinish() {
    finish();
    if (user && state) {
      const finalScore = state.answers.filter((a, i) => a === state.questions[i]?.answer).length;
      try { await quizAttemptApi.create(finalScore, state.questions.length, user.userId); }
      catch { /* non-blocking */ }
    }
  }

  function handleSelectSem(sem: number) {
    setSelSem(sem);
    setSelSubject("all");
    reset();
  }

  function handleSelectSubject(sub: string) {
    setSelSubject(sub);
    reset();
  }

  const availableCount = getAvailableCount(selSubject, selSem);
  const subjects       = selSem > 0 ? (subjectsBySemester.get(selSem) ?? []) : [];

  // ── Sidebar ───────────────────────────────────────────────────────────────

  const Sidebar = (
    <aside className="w-64 shrink-0 flex flex-col bg-white border-r border-slate-200 min-h-screen">

      {/* Sidebar header */}
      <div className="relative overflow-hidden bg-slate-900 text-white">
        <img
          src="/bcsit1.png"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-[0.18] pointer-events-none select-none"
          style={{ mixBlendMode: "luminosity" }}
        />
        <div className="relative px-5 py-6">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Test Yourself</p>
          <h2 className="text-xl font-bold">Quiz Engine</h2>
          <p className="text-slate-500 text-xs mt-1">Select a subject to begin</p>
        </div>
      </div>

      {/* Semester section */}
      <div className="px-4 pt-5 pb-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Semester</p>

        {loading && (
          <div className="flex items-center gap-2 px-3 py-4">
            <div className="w-4 h-4 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin shrink-0" />
            <span className="text-xs text-slate-400">Loading questions…</span>
          </div>
        )}

        {!loading && error && (
          <div className="px-3 py-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && availableSemesters.length === 0 && (
          <p className="text-xs text-slate-400 px-3 py-2">No questions in database yet.</p>
        )}

        <div className="space-y-1">
          {availableSemesters.map(sem => (
            <button
              key={sem}
              onClick={() => handleSelectSem(sem)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                selSem === sem
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                selSem === sem ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
              }`}>
                {SEM_ROMAN[sem - 1] ?? sem}
              </span>
              <span className="text-sm font-semibold">Semester {sem}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subject section */}
      {selSem > 0 && subjects.length > 0 && (
        <div className="px-4 pt-4 pb-2 border-t border-slate-100 mt-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
            Subjects · Sem {SEM_ROMAN[selSem - 1]}
          </p>
          <div className="space-y-1">
            {subjects.map(sub => {
              const cnt    = getAvailableCount(sub, selSem);
              const active = selSubject === sub;
              return (
                <button
                  key={sub}
                  onClick={() => handleSelectSubject(sub)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all ${
                    active
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className={`text-base shrink-0 ${active ? "text-indigo-500" : "text-slate-300"}`}>📝</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate leading-tight">{sub}</p>
                    <p className={`text-[10px] mt-0.5 ${active ? "text-indigo-400" : "text-slate-400"}`}>{cnt} questions</p>
                  </div>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* No semester selected hint */}
      {selSem === 0 && (
        <div className="px-5 py-4 mt-2">
          <p className="text-xs text-slate-400 text-center">← Pick a semester to see subjects</p>
        </div>
      )}
    </aside>
  );

  // ── Results screen ────────────────────────────────────────────────────────

  if (state?.finished) {
    const pct   = Math.round((score / state.questions.length) * 100);
    const grade = pct >= 80 ? "Excellent 🎉" : pct >= 60 ? "Good Job 👍" : pct >= 40 ? "Keep Going 💪" : "Needs Practice 📖";
    const gClr  = pct >= 80 ? "from-emerald-500 to-teal-600" : pct >= 60 ? "from-indigo-500 to-violet-600" : pct >= 40 ? "from-amber-500 to-orange-500" : "from-red-500 to-rose-600";

    return (
      <div className="flex min-h-screen bg-slate-50">
        {Sidebar}
        <main className="flex-1 overflow-y-auto py-10 px-6">
          <div className="max-w-2xl mx-auto">

            {/* Score card */}
            <div className={`bg-gradient-to-br ${gClr} rounded-3xl overflow-hidden shadow-lg mb-6 text-white`}>
              <div className="px-8 py-10 text-center">
                <div className="text-7xl font-bold mb-2">{pct}%</div>
                <div className="text-xl font-semibold mb-1 opacity-90">{grade}</div>
                <div className="opacity-70 text-sm">{score} of {state.questions.length} correct · {formatTime(timeTaken)}</div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Correct",   val: score,                          color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "Wrong",     val: state.questions.length - score, color: "text-red-500",     bg: "bg-red-50"     },
                { label: "Time",      val: formatTime(timeTaken),          color: "text-indigo-600",  bg: "bg-indigo-50"  },
              ].map(s => (
                <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-center border border-white shadow-sm`}>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Review */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6">
              <button
                onClick={() => setReviewMode(!reviewMode)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>📋 Review all questions</span>
                <svg className={`w-4 h-4 text-slate-400 transition-transform ${reviewMode ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {reviewMode && (
                <div className="px-5 pb-5 space-y-3 border-t border-slate-100 pt-4">
                  {state.questions.map((q, i) => {
                    const chosen  = state.answers[i];
                    const isRight = chosen === q.answer;
                    return (
                      <div key={q.id} className={`rounded-xl border p-4 ${isRight ? "border-emerald-200 bg-emerald-50/60" : "border-red-200 bg-red-50/60"}`}>
                        <div className="flex items-start gap-2 mb-2">
                          <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold ${isRight ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
                            {isRight ? "✓" : "✗"}
                          </span>
                          <p className="text-sm font-medium text-slate-800">{q.question}</p>
                        </div>
                        <div className="space-y-1 pl-7">
                          {q.options.map((opt, oi) => (
                            <div key={oi} className={`text-xs px-3 py-1.5 rounded-lg ${
                              oi === q.answer ? "bg-emerald-100 text-emerald-800 font-semibold"
                              : oi === chosen && !isRight ? "bg-red-100 text-red-800"
                              : "text-slate-500"
                            }`}>
                              {String.fromCharCode(65 + oi)}. {opt}
                            </div>
                          ))}
                          {q.explanation && (
                            <p className="text-xs text-slate-500 mt-2 italic">💡 {q.explanation}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => { reset(); setReviewMode(false); }}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => { reset(); setReviewMode(false); setSelSubject("all"); }}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
              >
                New Quiz
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── Active quiz ───────────────────────────────────────────────────────────

  if (state) {
    const q        = state.questions[state.current];
    const chosen   = state.answers[state.current];
    const answered = chosen !== null;
    const progress = ((state.current + 1) / state.questions.length) * 100;

    return (
      <div className="flex min-h-screen bg-slate-50">
        {Sidebar}
        <main className="flex-1 overflow-y-auto py-8 px-6">
          <div className="max-w-2xl mx-auto">

            {/* Progress header */}
            <div className="bg-white rounded-2xl border border-slate-200 px-5 py-4 mb-5 shadow-sm">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="font-semibold text-slate-700">
                  Question {state.current + 1} <span className="text-slate-400">of {state.questions.length}</span>
                </span>
                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  {state.subject}
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Question dots */}
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {state.questions.map((_, i) => {
                  const a     = state.answers[i];
                  const done  = a !== null;
                  const right = done && a === state.questions[i].answer;
                  return (
                    <button
                      key={i}
                      onClick={() => jumpTo(i)}
                      className={`w-7 h-7 rounded-lg text-[11px] font-bold transition-all ${
                        i === state.current ? "ring-2 ring-indigo-500 ring-offset-1" : ""
                      } ${
                        done
                          ? right ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
                          : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{q.subject}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${DIFF_STYLE[q.difficulty]}`}>{q.difficulty}</span>
              </div>

              <p className="text-base font-semibold text-slate-800 leading-relaxed mb-5">{q.question}</p>

              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  let cls = "border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer";
                  if (answered) {
                    if (i === q.answer)                  cls = "border-emerald-400 bg-emerald-50 text-emerald-800 cursor-default";
                    else if (i === chosen && i !== q.answer) cls = "border-red-400 bg-red-50 text-red-800 cursor-default";
                    else                                 cls = "border-slate-100 text-slate-400 cursor-default";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => answer(i)}
                      disabled={answered}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all ${cls}`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        answered && i === q.answer ? "bg-emerald-200 text-emerald-800"
                        : answered && i === chosen && i !== q.answer ? "bg-red-200 text-red-800"
                        : "bg-slate-100 text-slate-600"
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {answered && q.explanation && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowExpl(!showExpl)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    {showExpl ? "Hide" : "Show"} explanation
                  </button>
                  {showExpl && (
                    <div className="mt-2 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-sm text-indigo-800 leading-relaxed">
                      💡 {q.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={prev}
                disabled={state.current === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Prev
              </button>
              <div className="flex gap-2">
                {state.current === state.questions.length - 1 ? (
                  <button
                    onClick={handleFinish}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
                  >
                    Finish Quiz ✓
                  </button>
                ) : (
                  <button
                    onClick={() => { setShowExpl(false); next(); }}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
                  >
                    Next →
                  </button>
                )}
                <button
                  onClick={() => { if (confirm("End quiz and see results?")) handleFinish(); }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  End
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── Configure / Welcome screen ────────────────────────────────────────────

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SEO
        title="BCSIT Quiz | Practice Questions for All Subjects"
        description="Test your BCSIT knowledge with subject-wise quizzes. Practice questions with instant feedback for Pokhara University BCSIT and CSIT exams across all 8 semesters."
        keywords="BCSIT quiz, CSIT quiz, BCSIT practice questions, BCSIT MCQ, Pokhara University BCSIT test, IT quiz Nepal, BCSIT mock test"
        canonical="/quiz"
      />
      {Sidebar}

      <main className="flex-1 overflow-y-auto flex items-center justify-center p-8">

        {/* Nothing selected */}
        {selSem === 0 && (
          <div className="max-w-lg text-center">
            <div className="flex items-end justify-center gap-4 mb-8">
              <img
                src="/quizimage.png"
                alt=""
                aria-hidden
                className="w-36 h-28 object-contain"
                style={{ mixBlendMode: "multiply" }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <img
                src="/quizimage2.png"
                alt=""
                aria-hidden
                className="w-48 h-40 object-contain"
                style={{ mixBlendMode: "multiply" }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Ready to Test Yourself?</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Choose a semester from the left panel, then pick a subject to start a focused quiz session.
            </p>
            <div className="grid grid-cols-2 gap-3 text-left">
              {[
                { icon: "⚡", title: "Instant feedback",      desc: "See if you're right after each answer" },
                { icon: "🔀", title: "Randomised order",      desc: "Questions shuffled every time" },
                { icon: "📊", title: "Score tracking",        desc: "Results saved to your dashboard" },
                { icon: "💡", title: "Explanations included", desc: "Learn why the answer is correct" },
              ].map(f => (
                <div key={f.title} className="bg-white rounded-2xl border border-slate-200 p-4">
                  <div className="text-xl mb-2">{f.icon}</div>
                  <div className="font-semibold text-slate-800 text-sm">{f.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Semester selected, no subject */}
        {selSem > 0 && selSubject === "all" && (
          <div className="max-w-md text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl mx-auto mb-5">
              📚
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Semester {SEM_ROMAN[selSem - 1]} selected
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              {subjects.length} subject{subjects.length !== 1 ? "s" : ""} available. Pick one from the left panel to start.
            </p>
            <div className="space-y-2">
              {subjects.map(sub => {
                const cnt = getAvailableCount(sub, selSem);
                return (
                  <button
                    key={sub}
                    onClick={() => handleSelectSubject(sub)}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/40 transition-all text-left"
                  >
                    <span className="text-lg">📝</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{sub}</p>
                      <p className="text-xs text-slate-400">{cnt} questions</p>
                    </div>
                    <span className="text-slate-300 text-sm">→</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Subject selected — ready to start */}
        {selSem > 0 && selSubject !== "all" && (
          <div className="max-w-sm w-full">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              {/* Card header */}
              <div className="relative overflow-hidden bg-slate-900 px-7 py-8 text-white text-center">
                <img
                  src="/bcsit1.png"
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none"
                  style={{ mixBlendMode: "luminosity" }}
                />
                <div className="relative">
                  <div className="text-4xl mb-3">📝</div>
                  <h2 className="text-xl font-bold leading-tight">{selSubject}</h2>
                  <p className="text-slate-400 text-xs mt-1">Semester {SEM_ROMAN[selSem - 1]}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-px bg-slate-100">
                <div className="bg-white px-5 py-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600">{availableCount}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Questions</div>
                </div>
                <div className="bg-white px-5 py-4 text-center">
                  <div className="text-2xl font-bold text-violet-600">{Math.ceil(availableCount * 0.5)}</div>
                  <div className="text-xs text-slate-500 mt-0.5">~{Math.ceil(availableCount * 0.5)} min</div>
                </div>
              </div>

              {/* Tips */}
              <div className="px-7 py-5 space-y-2">
                {[
                  "Questions are shuffled randomly each attempt",
                  "Select an answer to see instant feedback",
                  "Use Prev / Next to navigate freely",
                ].map(tip => (
                  <div key={tip} className="flex items-start gap-2 text-xs text-slate-500">
                    <span className="text-indigo-400 shrink-0 mt-0.5">✓</span>
                    {tip}
                  </div>
                ))}
              </div>

              {/* Start button */}
              <div className="px-7 pb-7">
                {availableCount === 0 ? (
                  <div className="w-full py-4 rounded-2xl bg-slate-100 text-slate-400 text-center text-sm font-medium">
                    No questions available yet
                  </div>
                ) : (
                  <button
                    onClick={startQuiz}
                    className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base transition-all shadow-md hover:shadow-lg active:scale-95"
                  >
                    Start Quiz → {availableCount} Questions
                  </button>
                )}
                {!user && (
                  <p className="text-center text-xs text-slate-400 mt-3">Sign in to save your quiz history</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
