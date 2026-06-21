import { useState, useEffect, useCallback, useMemo } from "react";
import { quizQuestionsApi } from "../services/api";

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  subject: string;
  semester: number;
  difficulty: "easy" | "medium" | "hard";
}

export interface QuizState {
  questions: Question[];
  current: number;
  answers: (number | null)[];
  finished: boolean;
  startTime: number;
  endTime: number | null;
  subject: string;
}

function letterToIndex(letter: string): number {
  return { A: 0, B: 1, C: 2 }[letter.toUpperCase()] ?? 0;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useQuiz(subject = "all", semester = 0, count = 999) {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [state,        setState]        = useState<QuizState | null>(null);

  useEffect(() => {
    setLoading(true);
    setError("");
    quizQuestionsApi.getForUser()
      .then(r => r.json())
      .then(data => {
        const raw: Array<{
          quizQuestionId: string;
          question: string;
          answer: string;
          optionA: string;
          optionB: string;
          optionC: string;
          Quiz?: {
            title?: string;
            Subject?: {
              subjectName?: string;
              Semester?: { semesterNumber?: number };
            };
          };
        }> = Array.isArray(data?.data) ? data.data : [];

        const mapped: Question[] = raw.map((q, i) => ({
          id: i + 1,
          question: q.question,
          options: [q.optionA, q.optionB, q.optionC],
          answer: letterToIndex(q.answer),
          explanation: "",
          subject: q.Quiz?.Subject?.subjectName ?? q.Quiz?.title ?? "General",
          semester: q.Quiz?.Subject?.Semester?.semesterNumber ?? 0,
          difficulty: "medium",
        }));

        setAllQuestions(mapped);
      })
      .catch(() => setError("Failed to load questions. Please check your connection."))
      .finally(() => setLoading(false));
  }, []);

  const availableSemesters = useMemo(
    () => [...new Set(allQuestions.map(q => q.semester))].filter(s => s > 0).sort((a, b) => a - b),
    [allQuestions],
  );

  const subjectsBySemester = useMemo(() => {
    const map = new Map<number, string[]>();
    for (const q of allQuestions) {
      if (q.semester <= 0) continue;
      if (!map.has(q.semester)) map.set(q.semester, []);
      const arr = map.get(q.semester)!;
      if (!arr.includes(q.subject)) arr.push(q.subject);
    }
    for (const [sem, subs] of map) map.set(sem, [...subs].sort());
    return map;
  }, [allQuestions]);

  const getAvailableCount = useCallback((sub: string, sem: number) => {
    let pool = allQuestions;
    if (sub !== "all") pool = pool.filter(q => q.subject === sub);
    if (sem > 0)       pool = pool.filter(q => q.semester === sem);
    return pool.length;
  }, [allQuestions]);

  const startQuiz = useCallback(() => {
    let pool = allQuestions;
    if (subject !== "all") pool = pool.filter(q => q.subject === subject);
    if (semester > 0)      pool = pool.filter(q => q.semester === semester);
    const selected = shuffle(pool).slice(0, Math.min(count, pool.length));
    setState({
      questions: selected,
      current: 0,
      answers: new Array(selected.length).fill(null),
      finished: false,
      startTime: Date.now(),
      endTime: null,
      subject: subject === "all" ? "Mixed" : subject,
    });
  }, [allQuestions, subject, semester, count]);

  const answer = useCallback((idx: number) => {
    setState(s => {
      if (!s || s.answers[s.current] !== null) return s;
      const answers = [...s.answers];
      answers[s.current] = idx;
      return { ...s, answers };
    });
  }, []);

  const next = useCallback(() => {
    setState(s => {
      if (!s) return s;
      if (s.current === s.questions.length - 1) return { ...s, finished: true, endTime: Date.now() };
      return { ...s, current: s.current + 1 };
    });
  }, []);

  const prev = useCallback(() => {
    setState(s => (!s || s.current === 0) ? s : { ...s, current: s.current - 1 });
  }, []);

  const jumpTo = useCallback((idx: number) => {
    setState(s => (!s) ? s : { ...s, current: idx });
  }, []);

  const finish = useCallback(() => {
    setState(s => s ? { ...s, finished: true, endTime: Date.now() } : s);
  }, []);

  const reset = useCallback(() => setState(null), []);

  const score = state
    ? state.answers.filter((a, i) => a === state.questions[i]?.answer).length
    : 0;

  const timeTaken = state?.endTime
    ? Math.round((state.endTime - state.startTime) / 1000)
    : state ? Math.round((Date.now() - state.startTime) / 1000) : 0;

  return {
    state, score, timeTaken, loading, error,
    startQuiz, answer, next, prev, jumpTo, finish, reset,
    availableSemesters, subjectsBySemester, getAvailableCount,
  };
}
