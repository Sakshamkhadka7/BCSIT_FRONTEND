import { useState, useEffect, useMemo, useContext, useCallback } from "react";
import { UserContext } from "../context/AuthContext";
import { notesApi, savedNoteApi } from "../services/api";
import SEO from "../components/SEO";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SemesterInfo { semesterId: string; semesterNumber: number }
interface SubjectInfo  { subjectId: string; subjectName: string; courseCode: string; Semester?: SemesterInfo }
interface ChapterInfo  { contentId: string; chapterName: string; chapterNumber: number; Subject?: SubjectInfo }

interface NoteItem {
  noteId: string;
  topic: string;
  subTopics: string;
  noteFile: string;
  contentId: string;
  Chapter?: ChapterInfo;
}

interface ChapterGroup { contentId: string; chapterName: string; chapterNumber: number; notes: NoteItem[] }
interface SubjectGroup { subjectId: string; subjectName: string; courseCode: string; chapters: ChapterGroup[] }

// ─── Grouping helper ──────────────────────────────────────────────────────────

function groupNotes(notes: NoteItem[]): Map<number, SubjectGroup[]> {
  const semMap = new Map<number, Map<string, SubjectGroup>>();

  for (const note of notes) {
    const ch   = note.Chapter;
    const sub  = ch?.Subject;
    const sem  = sub?.Semester;
    const semN = sem?.semesterNumber ?? 0;
    const subId = sub?.subjectId ?? "__unknown__";

    if (!semMap.has(semN)) semMap.set(semN, new Map());
    const subMap = semMap.get(semN)!;

    if (!subMap.has(subId)) {
      subMap.set(subId, {
        subjectId:   subId,
        subjectName: sub?.subjectName ?? "Uncategorised",
        courseCode:  sub?.courseCode  ?? "",
        chapters:    [],
      });
    }
    const subGroup = subMap.get(subId)!;
    let chGroup = subGroup.chapters.find(c => c.contentId === ch?.contentId);
    if (!chGroup) {
      chGroup = {
        contentId:     ch?.contentId    ?? "__unknown__",
        chapterName:   ch?.chapterName  ?? "Chapter",
        chapterNumber: ch?.chapterNumber ?? 0,
        notes:         [],
      };
      subGroup.chapters.push(chGroup);
    }
    chGroup.notes.push(note);
  }

  const result = new Map<number, SubjectGroup[]>();
  for (const [semN, subMap] of semMap) {
    result.set(
      semN,
      Array.from(subMap.values()).map(s => ({
        ...s,
        chapters: s.chapters.sort((a, b) => a.chapterNumber - b.chapterNumber),
      })),
    );
  }
  return result;
}

const SEM_ROMAN = ["I","II","III","IV","V","VI","VII","VIII"];

// Professional muted card accent colors (border-top accent only)
const CARD_ACCENTS = [
  { border: "border-t-indigo-500",  badge: "bg-indigo-50 text-indigo-700",  icon: "text-indigo-500"  },
  { border: "border-t-sky-500",     badge: "bg-sky-50 text-sky-700",        icon: "text-sky-500"     },
  { border: "border-t-teal-500",    badge: "bg-teal-50 text-teal-700",      icon: "text-teal-500"    },
  { border: "border-t-violet-500",  badge: "bg-violet-50 text-violet-700",  icon: "text-violet-500"  },
  { border: "border-t-rose-500",    badge: "bg-rose-50 text-rose-700",      icon: "text-rose-500"    },
  { border: "border-t-amber-500",   badge: "bg-amber-50 text-amber-700",    icon: "text-amber-500"   },
  { border: "border-t-emerald-500", badge: "bg-emerald-50 text-emerald-700",icon: "text-emerald-500" },
  { border: "border-t-fuchsia-500", badge: "bg-fuchsia-50 text-fuchsia-700",icon: "text-fuchsia-500" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Notes() {
  const context = useContext(UserContext);
  if (!context) return null;
  const { user } = context;

  const [allNotes,   setAllNotes]   = useState<NoteItem[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [savedIds,   setSavedIds]   = useState<Set<string>>(new Set());

  const [selectedSem,     setSelectedSem]     = useState<number>(1);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [selectedNote,    setSelectedNote]    = useState<NoteItem | null>(null);
  const [sidebarOpen,     setSidebarOpen]     = useState(true);

  // Fetch saved note IDs for the logged-in user
  useEffect(() => {
    if (!user) return;
    savedNoteApi.getMySaved()
      .then(r => r.json())
      .then(data => {
        const ids: string[] = (Array.isArray(data?.data) ? data.data : [])
          .map((s: { Note?: { noteId?: string } }) => s.Note?.noteId)
          .filter(Boolean);
        setSavedIds(new Set(ids));
      })
      .catch(() => {});
  }, [user]);

  const toggleSave = useCallback(async (noteId: string) => {
    if (!user) return;
    if (savedIds.has(noteId)) {
      await savedNoteApi.unsave(noteId).catch(() => {});
      setSavedIds(prev => { const s = new Set(prev); s.delete(noteId); return s; });
    } else {
      await savedNoteApi.save(noteId).catch(() => {});
      setSavedIds(prev => new Set(prev).add(noteId));
    }
  }, [user, savedIds]);

  useEffect(() => {
    notesApi.getAll()
      .then(r => r.json())
      .then(data => {
        const arr = Array.isArray(data?.data) ? data.data : [];
        setAllNotes(arr);
        const firstSem = arr
          .map((n: NoteItem) => n.Chapter?.Subject?.Semester?.semesterNumber ?? 0)
          .filter((n: number) => n > 0)
          .sort((a: number, b: number) => a - b)[0];
        if (firstSem) setSelectedSem(firstSem);
      })
      .catch(() => setFetchError("Failed to load notes."))
      .finally(() => setLoading(false));
  }, []);

  const grouped         = useMemo(() => groupNotes(allNotes), [allNotes]);
  const semesters       = useMemo(() => [...grouped.keys()].filter(s => s > 0).sort((a,b)=>a-b), [grouped]);
  const currentSubjects = grouped.get(selectedSem) ?? [];
  const totalNotes      = currentSubjects.reduce((acc, s) => acc + s.chapters.reduce((a,c) => a + c.notes.length, 0), 0);

  function handleSelectNote(note: NoteItem) {
    setSelectedNote(note);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  }

  function handleSemChange(sem: number) {
    setSelectedSem(sem);
    setSelectedNote(null);
    setExpandedSubject(null);
    setSidebarOpen(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <SEO
        title="BCSIT Notes | Semester-wise Study Materials"
        description="Free chapter-wise BCSIT notes for all 8 semesters at Pokhara University. Download PDF study materials for CSIT subjects — programming, networking, database, AI, and more."
        keywords="BCSIT notes, CSIT notes, IT notes, BCSIT study materials, Pokhara University notes, BCSIT PDF notes, semester notes BCSIT, BCSIT subject notes"
        canonical="/notes"
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">Study Resources</p>
            <h1 className="text-3xl font-bold text-slate-900">Notes</h1>
            <p className="text-slate-500 text-sm mt-1">
              {loading ? "Loading…" : `${allNotes.length} notes · ${semesters.length} semesters`}
            </p>
          </div>
          <img
            src="/bcsit1.png"
            alt=""
            aria-hidden
            className="hidden lg:block h-40 w-auto object-contain shrink-0"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>

        {/* Semester tabs */}
        {!loading && semesters.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto">
            <div className="flex min-w-max border-t border-slate-100">
              {semesters.map(sem => (
                <button
                  key={sem}
                  onClick={() => handleSemChange(sem)}
                  className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    selectedSem === sem
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

      {/* Loading */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 text-sm">Loading notes…</p>
          </div>
        </div>
      )}

      {fetchError && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">{fetchError}</p>
        </div>
      )}

      {!loading && !fetchError && semesters.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-xl font-bold text-slate-300">No notes uploaded yet</h2>
            <p className="text-slate-400 text-sm mt-2">Notes uploaded by admin will appear here.</p>
          </div>
        </div>
      )}

      {/* Main layout */}
      {!loading && !fetchError && semesters.length > 0 && (
        <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 gap-5">

          {/* Sidebar */}
          <aside
            className={`
              ${sidebarOpen ? "flex" : "hidden"} lg:flex
              flex-col shrink-0
              w-full lg:w-72 xl:w-80
              bg-white rounded-2xl border border-slate-200
              overflow-hidden
            `}
            style={{ alignSelf: "flex-start", position: "sticky", top: "80px", maxHeight: "calc(100vh - 120px)" }}
          >
            <div className="px-5 py-4 bg-indigo-600 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200 mb-0.5">
                Semester {SEM_ROMAN[selectedSem - 1]}
              </p>
              <h2 className="font-bold text-lg">
                {currentSubjects.length} Subject{currentSubjects.length !== 1 ? "s" : ""}
              </h2>
              <p className="text-indigo-200 text-xs mt-0.5">{totalNotes} note{totalNotes !== 1 ? "s" : ""} available</p>
            </div>

            <div className="overflow-y-auto flex-1 py-2">
              {currentSubjects.length === 0 ? (
                <p className="text-slate-400 text-sm px-5 py-6">No notes for this semester.</p>
              ) : (
                currentSubjects.map(subject => (
                  <SubjectNav
                    key={subject.subjectId}
                    subject={subject}
                    isExpanded={expandedSubject === subject.subjectId}
                    onToggle={() =>
                      setExpandedSubject(expandedSubject === subject.subjectId ? null : subject.subjectId)
                    }
                    selectedNoteId={selectedNote?.noteId ?? null}
                    onSelectNote={handleSelectNote}
                    isAuth={!!user}
                  />
                ))
              )}
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {!sidebarOpen && selectedNote && (
              <button
                onClick={() => { setSelectedNote(null); setSidebarOpen(true); }}
                className="mb-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 lg:hidden"
              >
                ← Back to notes
              </button>
            )}

            {selectedNote ? (
              <PDFPanel
                note={selectedNote}
                isAuth={!!user}
                isSaved={savedIds.has(selectedNote.noteId)}
                onToggleSave={toggleSave}
                onClose={() => setSelectedNote(null)}
              />
            ) : (
              <SubjectCards
                subjects={currentSubjects}
                semLabel={SEM_ROMAN[selectedSem - 1] ?? String(selectedSem)}
                onSelectNote={handleSelectNote}
                onExpandSubject={sid => {
                  setExpandedSubject(sid);
                  setSidebarOpen(true);
                }}
              />
            )}
          </main>
        </div>
      )}
    </div>
  );
}

// ─── Sidebar: subject accordion ───────────────────────────────────────────────

function SubjectNav({
  subject, isExpanded, onToggle, selectedNoteId, onSelectNote, isAuth,
}: {
  subject: SubjectGroup;
  isExpanded: boolean;
  onToggle: () => void;
  selectedNoteId: string | null;
  onSelectNote: (n: NoteItem) => void;
  isAuth: boolean;
}) {
  const noteCount = subject.chapters.reduce((a, c) => a + c.notes.length, 0);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors ${
          isExpanded ? "bg-indigo-50" : "hover:bg-slate-50"
        }`}
      >
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 transition-colors ${
          isExpanded ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
        }`}>
          📚
        </span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold leading-tight truncate ${isExpanded ? "text-indigo-700" : "text-slate-800"}`}>
            {subject.subjectName}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{subject.courseCode} · {noteCount} note{noteCount !== 1 ? "s" : ""}</p>
        </div>
        <svg
          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${isExpanded ? "rotate-180 text-indigo-500" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="bg-slate-50/70 pb-1">
          {subject.chapters.map(chapter => (
            <div key={chapter.contentId} className="px-4 pt-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1">
                Ch {chapter.chapterNumber} · {chapter.chapterName}
              </p>
              {chapter.notes.map(note => {
                const active = note.noteId === selectedNoteId;
                return (
                  <button
                    key={note.noteId}
                    onClick={() => (isAuth ? onSelectNote(note) : null)}
                    title={isAuth ? note.topic : "Sign in to view"}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-1 text-left transition-all ${
                      active
                        ? "bg-indigo-600 text-white shadow-sm"
                        : isAuth
                          ? "hover:bg-white hover:shadow-sm text-slate-700 cursor-pointer"
                          : "text-slate-400 cursor-default"
                    }`}
                  >
                    <span className={`text-sm shrink-0 ${active ? "text-white" : "text-slate-400"}`}>📄</span>
                    <span className="text-xs font-medium truncate leading-tight">{note.topic}</span>
                    {!isAuth && <span className="ml-auto text-[10px] shrink-0 text-slate-300">🔒</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Subject overview cards ───────────────────────────────────────────────────

function SubjectCards({
  subjects, semLabel, onSelectNote, onExpandSubject,
}: {
  subjects: SubjectGroup[];
  semLabel: string;
  onSelectNote: (n: NoteItem) => void;
  onExpandSubject: (sid: string) => void;
}) {
  if (subjects.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 rounded-2xl border-2 border-dashed border-slate-200">
        <p className="text-slate-400">No notes for this semester yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Semester {semLabel}</h2>
      <p className="text-slate-500 mb-6">Select a subject to browse notes</p>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {subjects.map((subject, i) => {
          const noteCount = subject.chapters.reduce((a, c) => a + c.notes.length, 0);
          const accent    = CARD_ACCENTS[i % CARD_ACCENTS.length];
          const firstNote = subject.chapters[0]?.notes[0];
          // Abbreviation from course code or first letters of subject name
          const abbr = subject.courseCode || subject.subjectName.split(" ").map(w => w[0]).join("").slice(0, 4).toUpperCase();

          return (
            <div
              key={subject.subjectId}
              className={`bg-white rounded-2xl border border-slate-200 border-t-4 ${accent.border} overflow-hidden hover:shadow-lg transition-all duration-200 group`}
            >
              {/* Card header — clean white with decorative code watermark */}
              <div className="relative px-5 pt-5 pb-4 overflow-hidden">
                {/* Watermark */}
                <span
                  aria-hidden
                  className="absolute right-3 top-1 select-none pointer-events-none font-black text-slate-100 leading-none"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
                >
                  {abbr}
                </span>

                {/* Subject icon */}
                <div className={`w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 relative z-10`}>
                  <svg className={`w-6 h-6 ${accent.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug relative z-10 pr-12">
                  {subject.subjectName}
                </h3>
                {subject.courseCode && (
                  <span className={`inline-block mt-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full relative z-10 ${accent.badge}`}>
                    {subject.courseCode}
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="px-5 pb-5 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-4 text-slate-500 mb-4">
                  <span className="flex items-center gap-1.5 text-sm">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    {subject.chapters.length} chapter{subject.chapters.length !== 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {noteCount} note{noteCount !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onExpandSubject(subject.subjectId)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                  >
                    Browse
                  </button>
                  {firstNote && (
                    <button
                      onClick={() => onSelectNote(firstNote)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 ${
                        accent.border.replace("border-t-", "bg-")
                      }`}
                    >
                      Open →
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PDF viewer panel ─────────────────────────────────────────────────────────

function PDFPanel({
  note, isAuth, isSaved, onToggleSave, onClose,
}: {
  note: NoteItem;
  isAuth: boolean;
  isSaved: boolean;
  onToggleSave: (noteId: string) => void;
  onClose: () => void;
}) {
  const [fullscreen, setFullscreen] = useState(false);
  const chapter = note.Chapter;
  const subject = chapter?.Subject;

  const PdfFrame = (
    <iframe
      src={note.noteFile}
      title={note.topic}
      className="w-full h-full"
      style={{ border: "none", display: "block" }}
    />
  );

  // Fullscreen overlay
  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col">
        {/* Fullscreen top bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-800 border-b border-slate-700 shrink-0">
          <div className="min-w-0">
            <p className="text-slate-400 text-xs truncate">
              {subject?.subjectName}{chapter ? ` · Ch ${chapter.chapterNumber}: ${chapter.chapterName}` : ""}
            </p>
            <h2 className="text-white font-semibold text-base truncate">{note.topic}</h2>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-4">
            <a
              href={note.noteFile}
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
        <div className="flex-1 overflow-hidden">{PdfFrame}</div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden"
      style={{ minHeight: "calc(100vh - 160px)" }}
    >
      {/* Panel header */}
      <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {subject && (
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                {subject.subjectName}
              </span>
            )}
            {chapter && (
              <span className="text-xs text-slate-400">
                Ch {chapter.chapterNumber} · {chapter.chapterName}
              </span>
            )}
          </div>
          <h2 className="font-bold text-slate-900 text-xl leading-tight">{note.topic}</h2>
          {note.subTopics && (
            <p className="text-slate-500 text-sm mt-1 line-clamp-2">{note.subTopics}</p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isAuth && (
            <>
              {/* Save / unsave bookmark */}
              <button
                onClick={() => onToggleSave(note.noteId)}
                title={isSaved ? "Remove from saved" : "Save note"}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-colors ${
                  isSaved
                    ? "border-indigo-300 bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                    : "border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
              >
                <svg className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {isSaved ? "Saved" : "Save"}
              </button>

              {/* Fullscreen button */}
              <button
                onClick={() => setFullscreen(true)}
                title="View fullscreen"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-medium hover:bg-slate-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Fullscreen
              </button>

              {/* Download button */}
              <a
                href={note.noteFile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
            </>
          )}
          <button
            onClick={onClose}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-100 transition-colors"
          >
            ✕ Close
          </button>
        </div>
      </div>

      {/* PDF viewer */}
      {isAuth ? (
        <div className="flex-1 bg-slate-700" style={{ minHeight: "70vh" }}>
          <iframe
            src={note.noteFile}
            title={note.topic}
            className="w-full h-full"
            style={{ minHeight: "70vh", border: "none" }}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20 text-center px-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl">🔒</div>
          <div>
            <h3 className="font-bold text-slate-800 text-xl">Sign in to view this note</h3>
            <p className="text-slate-500 mt-1">Create a free account to access all study materials.</p>
          </div>
          <a
            href="/login"
            className="mt-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </a>
        </div>
      )}
    </div>
  );
}
