const BASE_URL = "http://localhost:3000/api";

function req(path: string, init?: RequestInit) {
  return fetch(`${BASE_URL}${path}`, { credentials: "include", ...init });
}

function json(path: string, method: string, body: unknown) {
  return req(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export const authApi = {
  login: (email: string, password: string) =>
    json("/user/login", "POST", { email, password }),

  // FormData so multer can receive the profile photo file
  register: (formData: FormData) =>
    req("/user/register", { method: "POST", body: formData }),

  logout: () => req("/user/logout", { method: "POST" }),

  getMe: () => req("/user/getuser"),
};

export const notesApi = {
  getAll: () => req("/note/getNote"),
};

export const syllabusApi = {
  getAll: () => req("/syllabus/getsyllabus"),
};

export const quizQuestionsApi = {
  getForUser: () => req("/quizques/getforuser"),
};

export const questionsApi = {
  getAll: () => req("/question/getQuestion"),
};

export const quizAttemptApi = {
  create: (score: number, totalMarks: number, userId: string) =>
    json("/quizattempt/createattempt", "POST", { score, totalMarks, userId }),
  myAttempts:  () => req("/quizattempt/myattempts"),
  leaderboard: () => req("/quizattempt/leaderboard"),
};

export const savedNoteApi = {
  save:      (noteId: string) => json("/savednote/save",            "POST",   { noteId }),
  unsave:    (noteId: string) => req(`/savednote/unsave/${noteId}`, { method: "DELETE" }),
  getMySaved: ()              => req("/savednote/mysaved"),
};
