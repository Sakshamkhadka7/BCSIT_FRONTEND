import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../services/api";
import { UserContext } from "../context/AuthContext";

export default function Register() {
  const navigate  = useNavigate();
  const context   = useContext(UserContext);

  const [name,            setName]            = useState("");
  const [email,           setEmail]           = useState("");
  const [phoneNumber,     setPhoneNumber]     = useState("");
  const [college,         setCollege]         = useState("");
  const [password,        setPassword]        = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo,           setPhoto]           = useState<File | null>(null);
  const [photoPreview,    setPhotoPreview]    = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!photo) {
      setError("Please upload a profile photo.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!college.trim()) {
      setError("Please enter your college name.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // photo is narrowed to File here after all null checks above
    const selectedPhoto: File = photo;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name",         name);
      formData.append("email",        email);
      formData.append("password",     password);
      formData.append("phoneNumber",  phoneNumber);
      formData.append("college",      college);
      formData.append("profilePhoto", selectedPhoto);

      const response = await authApi.register(formData);
      const data     = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      // Backend set the JWT cookie — push user into context so the app
      // is immediately logged in without a separate login step.
      if (context && data.data) {
        context.setUser(data.data);
      }

      setSuccess("Account created! Redirecting…");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
            Join BCSIT Study Hub
          </p>
          <h1 className="font-display text-4xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 mt-3">
            Save notes, track quizzes, and manage your study progress.
          </p>
        </div>

        <div className="bg-white border rounded-3xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">

            {error   && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>}
            {success && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3">{success}</div>}

            {/* Profile photo upload */}
            <div className="flex flex-col items-center gap-2 pb-2">
              <p className="text-sm font-medium text-slate-700 self-start">
                Profile Photo <span className="text-red-500">*</span>
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group relative w-24 h-24 rounded-full border-2 border-dashed border-slate-300 hover:border-indigo-400 overflow-hidden bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                {photoPreview ? (
                  <>
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1 text-slate-400 group-hover:text-indigo-500 transition-colors h-full">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-[11px] font-medium">Add Photo</span>
                  </div>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              {photoPreview && (
                <p className="text-xs text-indigo-600 font-medium">Click to change photo</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="10-digit phone number"
                className="w-full px-4 py-3 border rounded-xl"
                maxLength={10}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">College</label>
              <input
                type="text"
                value={college}
                onChange={e => setCollege(e.target.value)}
                placeholder="Your college name"
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? "Creating Account…" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-medium">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
