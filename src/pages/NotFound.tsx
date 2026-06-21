import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl font-display font-bold text-slate-100 mb-2">404</div>
      <h1 className="font-display text-2xl font-bold text-slate-800 mb-2">Page not found</h1>
      <p className="text-slate-500 text-sm mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  );
}