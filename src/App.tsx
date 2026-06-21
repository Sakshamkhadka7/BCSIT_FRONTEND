import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Syllabus from "./pages/Syllabus";
import PastQuestions from "./pages/PastQuestions";
import Quiz from "./pages/Quiz";
import Tools from "./pages/Tools";
import Videos from "./pages/Videos";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CareerGuide from "./pages/CareerGuide";
import NotFound from "./pages/NotFound";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<Layout><Home /></Layout>} />
        <Route path="/notes"          element={<Layout><Notes /></Layout>} />
        <Route path="/syllabus"       element={<Layout><Syllabus /></Layout>} />
        <Route path="/past-questions" element={<Layout><PastQuestions /></Layout>} />
        <Route path="/quiz"           element={<Layout><Quiz /></Layout>} />
        <Route path="/tools"          element={<Layout><Tools /></Layout>} />
        <Route path="/videos"         element={<Layout><Videos /></Layout>} />
        <Route path="/about"          element={<Layout><About /></Layout>} />
        <Route path="/contact"        element={<Layout><Contact /></Layout>} />
        <Route path="/login"          element={<Login />} />
        <Route path="/register"       element={<Register />} />
        <Route path="/dashboard"      element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/career-guide"   element={<ProtectedRoute><Layout><CareerGuide /></Layout></ProtectedRoute>} />
        <Route path="*"               element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}