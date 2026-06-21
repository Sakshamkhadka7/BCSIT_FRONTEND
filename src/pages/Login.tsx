import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const context = useContext(UserContext);

  if (!context) {
    return null;
  }

  const { setUser } = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");

        return;
      }

      setUser(data.data);

      if (remember) {
        localStorage.setItem("remember_login", "true");
      }

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl">

        <div
          className="hidden lg:flex p-12 text-white flex-col justify-between relative overflow-hidden"
          style={{
            backgroundImage: "url('/bcsit1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10">
            <span className="inline-flex bg-white/15 px-4 py-2 rounded-full text-xs font-semibold">
              BCSIT Study Hub
            </span>

            <h1 className="font-display text-5xl font-bold mt-8">
              Welcome
              <br />
              Back
            </h1>

            <p className="mt-6 text-white/90">
              Continue your learning journey with notes, quizzes and study
              resources.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            {[
              "Access your saved notes",
              "Track quiz performance",
              "Monitor study progress",
              "Personalized dashboard",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-white/90"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  ✓
                </div>

                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="p-8 sm:p-12">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                Account Access
              </p>

              <h2 className="font-display text-3xl font-bold text-slate-900">
                Sign In
              </h2>

              <p className="text-slate-500 mt-2">
                Login to continue using BCSIT Study Hub.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 border rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <label className="flex gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                  />
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 font-semibold">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
