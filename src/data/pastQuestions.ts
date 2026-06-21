export type PaperType = "board" | "preboard" | "midterm" | "practice";

export interface PastPaper {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  semester: number;
  type: PaperType;
  year: number;
  session?: "regular" | "back";
  pages: number;
  fileSize: string;
  downloadUrl: string;
  uploadedDate: string;
}

export const pastPapers: PastPaper[] = [
  // Board exams
  { id: "board-nm-2023", title: "Numerical Methods Board Exam 2023", subject: "Numerical Methods", subjectCode: "CACS402", semester: 4, type: "board", year: 2023, session: "regular", pages: 4, fileSize: "1.2 MB", downloadUrl: "#", uploadedDate: "2024-02-10" },
  { id: "board-nm-2022", title: "Numerical Methods Board Exam 2022", subject: "Numerical Methods", subjectCode: "CACS402", semester: 4, type: "board", year: 2022, session: "regular", pages: 4, fileSize: "1.1 MB", downloadUrl: "#", uploadedDate: "2024-02-10" },
  { id: "board-nm-2021", title: "Numerical Methods Board Exam 2021", subject: "Numerical Methods", subjectCode: "CACS402", semester: 4, type: "board", year: 2021, session: "regular", pages: 4, fileSize: "1.0 MB", downloadUrl: "#", uploadedDate: "2024-02-10" },
  { id: "board-nm-2020", title: "Numerical Methods Board Exam 2020", subject: "Numerical Methods", subjectCode: "CACS402", semester: 4, type: "board", year: 2020, session: "regular", pages: 4, fileSize: "0.9 MB", downloadUrl: "#", uploadedDate: "2024-02-10" },
  { id: "board-mp-2023", title: "Microprocessor Board Exam 2023", subject: "Microprocessor", subjectCode: "CACS401", semester: 4, type: "board", year: 2023, session: "regular", pages: 4, fileSize: "1.2 MB", downloadUrl: "#", uploadedDate: "2024-02-12" },
  { id: "board-mp-2022", title: "Microprocessor Board Exam 2022", subject: "Microprocessor", subjectCode: "CACS401", semester: 4, type: "board", year: 2022, session: "regular", pages: 4, fileSize: "1.1 MB", downloadUrl: "#", uploadedDate: "2024-02-12" },
  { id: "board-dcn-2023", title: "Data Communication & Networking Board 2023", subject: "Data Communication & Networking", subjectCode: "CACS404", semester: 4, type: "board", year: 2023, session: "regular", pages: 4, fileSize: "1.2 MB", downloadUrl: "#", uploadedDate: "2024-02-14" },
  { id: "board-se-2023", title: "Software Engineering Board Exam 2023", subject: "Software Engineering & PM", subjectCode: "CACS403", semester: 4, type: "board", year: 2023, session: "regular", pages: 4, fileSize: "1.1 MB", downloadUrl: "#", uploadedDate: "2024-02-15" },
  { id: "board-dsa-2023", title: "DSA Board Exam 2023", subject: "Data Structures & Algorithms", subjectCode: "CACS301", semester: 3, type: "board", year: 2023, session: "regular", pages: 4, fileSize: "1.2 MB", downloadUrl: "#", uploadedDate: "2024-02-16" },
  { id: "board-dsa-2022", title: "DSA Board Exam 2022", subject: "Data Structures & Algorithms", subjectCode: "CACS301", semester: 3, type: "board", year: 2022, session: "regular", pages: 4, fileSize: "1.0 MB", downloadUrl: "#", uploadedDate: "2024-02-16" },
  { id: "board-wt-2023", title: "Web Technology Board Exam 2023", subject: "Web Technology", subjectCode: "CACS304", semester: 3, type: "board", year: 2023, session: "regular", pages: 4, fileSize: "1.1 MB", downloadUrl: "#", uploadedDate: "2024-02-17" },
  { id: "board-cp-2022", title: "C Programming Board Exam 2022", subject: "C Programming", subjectCode: "CACS201", semester: 2, type: "board", year: 2022, session: "regular", pages: 4, fileSize: "1.0 MB", downloadUrl: "#", uploadedDate: "2024-02-18" },

  // Pre-board
  { id: "pre-nm-2024", title: "Numerical Methods Pre-Board 2024", subject: "Numerical Methods", subjectCode: "CACS402", semester: 4, type: "preboard", year: 2024, pages: 4, fileSize: "1.0 MB", downloadUrl: "#", uploadedDate: "2024-09-05" },
  { id: "pre-nm-2023", title: "Numerical Methods Pre-Board 2023", subject: "Numerical Methods", subjectCode: "CACS402", semester: 4, type: "preboard", year: 2023, pages: 4, fileSize: "0.9 MB", downloadUrl: "#", uploadedDate: "2024-09-05" },
  { id: "pre-mp-2024", title: "Microprocessor Pre-Board 2024", subject: "Microprocessor", subjectCode: "CACS401", semester: 4, type: "preboard", year: 2024, pages: 4, fileSize: "1.0 MB", downloadUrl: "#", uploadedDate: "2024-09-06" },
  { id: "pre-dcn-2024", title: "DCN Pre-Board 2024", subject: "Data Communication & Networking", subjectCode: "CACS404", semester: 4, type: "preboard", year: 2024, pages: 4, fileSize: "0.9 MB", downloadUrl: "#", uploadedDate: "2024-09-07" },
  { id: "pre-se-2024", title: "SE&PM Pre-Board 2024", subject: "Software Engineering & PM", subjectCode: "CACS403", semester: 4, type: "preboard", year: 2024, pages: 4, fileSize: "0.9 MB", downloadUrl: "#", uploadedDate: "2024-09-08" },
  { id: "pre-dsa-2024", title: "DSA Pre-Board 2024", subject: "Data Structures & Algorithms", subjectCode: "CACS301", semester: 3, type: "preboard", year: 2024, pages: 4, fileSize: "1.0 MB", downloadUrl: "#", uploadedDate: "2024-09-09" },

  // Mid-term
  { id: "mid-nm-2024-1", title: "Numerical Methods Mid-Term I 2024", subject: "Numerical Methods", subjectCode: "CACS402", semester: 4, type: "midterm", year: 2024, pages: 2, fileSize: "0.6 MB", downloadUrl: "#", uploadedDate: "2024-04-20" },
  { id: "mid-nm-2024-2", title: "Numerical Methods Mid-Term II 2024", subject: "Numerical Methods", subjectCode: "CACS402", semester: 4, type: "midterm", year: 2024, pages: 2, fileSize: "0.6 MB", downloadUrl: "#", uploadedDate: "2024-08-20" },
  { id: "mid-mp-2024-1", title: "Microprocessor Mid-Term I 2024", subject: "Microprocessor", subjectCode: "CACS401", semester: 4, type: "midterm", year: 2024, pages: 2, fileSize: "0.6 MB", downloadUrl: "#", uploadedDate: "2024-04-21" },
  { id: "mid-dcn-2024-1", title: "DCN Mid-Term 2024", subject: "Data Communication & Networking", subjectCode: "CACS404", semester: 4, type: "midterm", year: 2024, pages: 2, fileSize: "0.5 MB", downloadUrl: "#", uploadedDate: "2024-04-22" },
  { id: "mid-se-2024-1", title: "SE&PM Mid-Term 2024", subject: "Software Engineering & PM", subjectCode: "CACS403", semester: 4, type: "midterm", year: 2024, pages: 2, fileSize: "0.5 MB", downloadUrl: "#", uploadedDate: "2024-04-23" },
  { id: "mid-dsa-2023-1", title: "DSA Mid-Term 2023", subject: "Data Structures & Algorithms", subjectCode: "CACS301", semester: 3, type: "midterm", year: 2023, pages: 2, fileSize: "0.6 MB", downloadUrl: "#", uploadedDate: "2023-04-20" },

  // Practice sets
  { id: "prac-nm-1", title: "Numerical Methods Practice Set 1 — Root Finding", subject: "Numerical Methods", subjectCode: "CACS402", semester: 4, type: "practice", year: 2024, pages: 3, fileSize: "0.7 MB", downloadUrl: "#", uploadedDate: "2024-10-01" },
  { id: "prac-nm-2", title: "Numerical Methods Practice Set 2 — Interpolation", subject: "Numerical Methods", subjectCode: "CACS402", semester: 4, type: "practice", year: 2024, pages: 3, fileSize: "0.8 MB", downloadUrl: "#", uploadedDate: "2024-10-05" },
  { id: "prac-mp-1", title: "Microprocessor Practice Set — 8085 Programs", subject: "Microprocessor", subjectCode: "CACS401", semester: 4, type: "practice", year: 2024, pages: 4, fileSize: "0.9 MB", downloadUrl: "#", uploadedDate: "2024-10-03" },
  { id: "prac-dcn-1", title: "DCN Practice Set — Subnetting", subject: "Data Communication & Networking", subjectCode: "CACS404", semester: 4, type: "practice", year: 2024, pages: 3, fileSize: "0.7 MB", downloadUrl: "#", uploadedDate: "2024-10-04" },
  { id: "prac-dsa-1", title: "DSA Practice Set — Trees & Graphs", subject: "Data Structures & Algorithms", subjectCode: "CACS301", semester: 3, type: "practice", year: 2024, pages: 4, fileSize: "0.8 MB", downloadUrl: "#", uploadedDate: "2024-10-06" },
];

export const paperSubjects = [...new Set(pastPapers.map(p => p.subject))].sort();
export const paperSemesters = [...new Set(pastPapers.map(p => p.semester))].sort((a, b) => a - b);
export const paperYears = [...new Set(pastPapers.map(p => p.year))].sort((a, b) => b - a);