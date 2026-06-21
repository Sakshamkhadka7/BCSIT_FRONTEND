import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const semesters = [
  { num: "01", label: "Semester I",    subjects: ["English", "Fundamentals of Computer Systems", "Internet Technology I", "Mathematics I", "Programming Language"] },
  { num: "02", label: "Semester II",   subjects: ["Business Communication", "Data Structure and Algorithm", "Digital Systems", "Mathematics II", "Object-Oriented Language (Java)", "Project I"] },
  { num: "03", label: "Semester III",  subjects: ["Database Management System", "Internet Technology II", "Linear Algebra and Probability", "Object-Oriented Analysis and Design", "Principles of Management"] },
  { num: "04", label: "Semester IV",   subjects: ["Computer Architecture and Microprocessor", "Data Communication and Network", "Fundamentals of Financial Management", "Numerical Methods", "Project II", "Software Engineering and Project Management"] },
  { num: "05", label: "Semester V",    subjects: ["Artificial Intelligence", "Concentration I", "Digital Marketing", "Operating System", "Organizational Behavior"] },
  { num: "06", label: "Semester VI",   subjects: ["Applied Economics", "Cloud Computing", "Computer Graphics", "Concentration II", "Research Methods"] },
  { num: "07", label: "Semester VII",  subjects: ["Concentration III", "Digital Economy", "Information System Security", "Major Project", "Management of Human Resources", "Strategic Management"] },
  { num: "08", label: "Semester VIII", subjects: ["Concentration IV", "Innovation and Entrepreneurship", "Internship", "Legal Aspects of Business and Technology"] },
];

const features = [
  { icon: "📄", title: "Semester-wise Notes",  desc: "Well-structured notes for all 8 semesters. Download PDF or read online, always syllabus-aligned.", badge: "8 Semesters",               badgeCls: "bg-indigo-100 text-indigo-700",   iconCls: "bg-indigo-50 text-indigo-500",   link: "/notes"          },
  { icon: "📋", title: "Full PU Syllabus",     desc: "Pokhara University syllabus with unit breakdowns, credit hours, and learning objectives.",          badge: "PU Aligned",               badgeCls: "bg-violet-100 text-violet-700",   iconCls: "bg-violet-50 text-violet-500",   link: "/syllabus"       },
  { icon: "🗂️", title: "Past Questions",       desc: "Board, Pre-Board, and Mid-Term papers organised by year and semester. Spot exam patterns.",         badge: "Board · Pre-Board · Mid-term", badgeCls: "bg-amber-100 text-amber-700", iconCls: "bg-amber-50 text-amber-500",     link: "/past-questions" },
  { icon: "⚡", title: "Quiz Engine",           desc: "Subject-wise questions from a growing pool. Instant feedback and full review every session.",       badge: "100+ Questions",            badgeCls: "bg-emerald-100 text-emerald-700", iconCls: "bg-emerald-50 text-emerald-500", link: "/quiz"           },
  { icon: "🎬", title: "Video Guides",          desc: "Subject-wise curated YouTube playlists. The right tutorial, one click away.",                       badge: "Subject-wise",             badgeCls: "bg-red-100 text-red-700",         iconCls: "bg-red-50 text-red-400",         link: "/videos"         },
  { icon: "🛠️", title: "Developer Tools",      desc: "Curated tools every BCSIT student should know — from IDEs to deployment platforms.",               badge: "Curated List",             badgeCls: "bg-sky-100 text-sky-700",         iconCls: "bg-sky-50 text-sky-500",         link: "/tools"          },
  { icon: "💼", title: "Career Guide",          desc: "Job roles, resume tips, LinkedIn optimization, and internship platforms for BCSIT grads.",          badge: "Login required",           badgeCls: "bg-teal-100 text-teal-700",       iconCls: "bg-teal-50 text-teal-500",       link: "/career-guide"   },
  { icon: "📊", title: "Dashboard",             desc: "Track your quiz history, save notes, and manage your study progress in one place.",                  badge: "Login required",           badgeCls: "bg-orange-100 text-orange-700",   iconCls: "bg-orange-50 text-orange-400",   link: "/dashboard"      },
];

const team = [
  { photo: "/srjbcsit.png",  name: "Saroj Dhital",      role: "Project & Frontend Lead", linkedin: "https://www.linkedin.com/in/sarojdhital71/",                    github: "https://github.com/Joras-Latihd",         skills: ["Project Manager", "Frontend Developer"]  },
  { photo: "/skmbcsit.png",  name: "Saksham Khadka",    role: "Backend Lead",            linkedin: "https://www.linkedin.com/in/saksham-khadka-9981a4328/",         github: "https://github.com/Sakshamkhadka7",       skills: ["Javascript Developer", "MERN Developer"] },
  { photo: "/mlnbcsit.jpeg", name: "Milan Bishwokarma", role: "Quality Assurance Lead",  linkedin: "https://www.linkedin.com/in/milan-bishwakarma-1b352535b/",      github: "https://github.com/mmilanquery55-dev",    skills: ["Python Developer"]                       },
  { photo: "/adsbcsit.png",  name: "Aadarsha Tolangi",  role: "Documentation Lead",      linkedin: "https://www.linkedin.com/in/adarsha-tolangi-588317374/",        github: "https://github.com/adarsha401",           skills: ["Video Editor"]                           },
  { photo: "/rjnbcsit.png",  name: "Rijan Maharjan",    role: "Community Manager",       linkedin: "https://www.linkedin.com/in/rijan-maharjan-766316378/",         github: "https://github.com/Sakshamkhadka7",       skills: ["Digital Marketing"]                      },
];

const stats = [
  { num: "8",    label: "Semesters"      },
  { num: "35+",  label: "Subjects"       },
  { num: "100+", label: "Quiz Questions" },
  { num: "Free", label: "Forever"        },
];

export default function Home() {

  return (
    <div className="bg-white">
      <SEO
        title="BCSIT Study Hub — Free Notes, Syllabus & Past Questions"
        description="Free academic portal for BCSIT (Bachelor of Computer Science and Information Technology) students at Pokhara University. Notes, PU syllabus, past questions, quiz engine, video guides and career resources — all free."
        keywords="BCSIT, CSIT, IT, BCSIT course, BCSIT notes, BCSIT syllabus, BCSIT past questions, Pokhara University BCSIT, Quest International College, BCSIT study materials, BCSIT exam, CSIT notes, IT course Nepal, BIT Nepal, BCSIT question papers"
        canonical="/"
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/60 border-b border-slate-100">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-violet-100/40 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-7">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Innovation Group · Quest International College · Pokhara University
            </span>

            {/* Headline */}
            <h1 className="font-display text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.06] tracking-tight mb-6">
              One platform for<br />every{" "}
              <span className="text-indigo-600 relative">
                BCSIT
                <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 100 4" preserveAspectRatio="none">
                  <path d="M0,3 Q50,0 100,3" stroke="#6366f1" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}student
            </h1>

            {/* Subtext */}
            <p className="text-xl text-slate-500 leading-relaxed mb-9 max-w-lg">
              Notes, syllabus, past questions, quizzes, and career resources —
              built by students, for students , No paywalls.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/notes" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base transition-all hover:-translate-y-0.5 shadow-sm shadow-indigo-200">
                Explore Notes →
              </Link>
              <Link to="/quiz" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-semibold text-base transition-all hover:-translate-y-0.5">
                Take a quiz ⚡
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10 pt-7 border-t border-slate-100">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold text-slate-900">{s.num}</div>
                  <div className="text-sm text-slate-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="hidden lg:flex items-end justify-center">
            <img
              src="/students-hero.png"
              alt="BCSIT students studying together"
              className="w-full max-w-xl max-h-[32rem] lg:max-h-[38rem] xl:max-h-[44rem] object-contain"
              style={{ mixBlendMode: "multiply" }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        </div>
      </section>

      {/* ── SEMESTERS ── */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-base font-semibold text-indigo-600 uppercase tracking-widest mb-3">Your Academic Journey</p>
            <h2 className="font-display text-5xl font-bold text-slate-900 tracking-tight mb-4">8 Semesters · 35+ Subjects</h2>
            <p className="text-slate-500 text-xl max-w-xl mx-auto">Explore notes, syllabus and past questions for every semester of your BCSIT program.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {semesters.map((s, i) => {
              const palette = [
                { bar: "from-indigo-500 to-indigo-600",   pill: "bg-indigo-50 text-indigo-700 border-indigo-200",    dot: "bg-indigo-500",   num: "text-indigo-400/20",   hover: "hover:border-indigo-200 hover:shadow-indigo-100/60"   },
                { bar: "from-violet-500 to-violet-600",   pill: "bg-violet-50 text-violet-700 border-violet-200",    dot: "bg-violet-500",   num: "text-violet-400/20",   hover: "hover:border-violet-200 hover:shadow-violet-100/60"   },
                { bar: "from-sky-500 to-sky-600",         pill: "bg-sky-50 text-sky-700 border-sky-200",             dot: "bg-sky-500",      num: "text-sky-400/20",      hover: "hover:border-sky-200 hover:shadow-sky-100/60"         },
                { bar: "from-emerald-500 to-emerald-600", pill: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500",  num: "text-emerald-400/20",  hover: "hover:border-emerald-200 hover:shadow-emerald-100/60" },
                { bar: "from-amber-500 to-amber-600",     pill: "bg-amber-50 text-amber-700 border-amber-200",       dot: "bg-amber-500",    num: "text-amber-400/20",    hover: "hover:border-amber-200 hover:shadow-amber-100/60"     },
                { bar: "from-rose-500 to-rose-600",       pill: "bg-rose-50 text-rose-700 border-rose-200",          dot: "bg-rose-500",     num: "text-rose-400/20",     hover: "hover:border-rose-200 hover:shadow-rose-100/60"       },
                { bar: "from-teal-500 to-teal-600",       pill: "bg-teal-50 text-teal-700 border-teal-200",          dot: "bg-teal-500",     num: "text-teal-400/20",     hover: "hover:border-teal-200 hover:shadow-teal-100/60"       },
                { bar: "from-orange-500 to-orange-600",   pill: "bg-orange-50 text-orange-700 border-orange-200",    dot: "bg-orange-500",   num: "text-orange-400/20",   hover: "hover:border-orange-200 hover:shadow-orange-100/60"   },
              ][i];

              const preview = s.subjects.slice(0, 3);
              const extra   = s.subjects.length - 3;

              return (
                <Link
                  key={i}
                  to={`/notes?sem=${i + 1}`}
                  className={`group relative bg-white border border-slate-100 ${palette.hover} rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl block`}
                >
                  {/* Top gradient accent bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${palette.bar}`} />

                  <div className="relative p-6">
                    {/* Watermark number */}
                    <div className={`absolute -top-2 right-4 font-display text-9xl font-black leading-none select-none pointer-events-none ${palette.num}`}>
                      {s.num}
                    </div>

                    {/* Label */}
                    <h3 className="relative font-display font-bold text-slate-800 text-xl leading-snug mb-3 pr-16">{s.label}</h3>

                    {/* Subject count pill */}
                    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold border px-3 py-1 rounded-full mb-5 ${palette.pill}`}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      {s.subjects.length} subjects
                    </span>

                    {/* Subject preview list */}
                    <div className="space-y-2.5">
                      {preview.map(sub => (
                        <div key={sub} className="flex items-center gap-2.5 text-base text-slate-500">
                          <span className={`w-2 h-2 rounded-full ${palette.dot} shrink-0`} />
                          <span className="truncate">{sub}</span>
                        </div>
                      ))}
                      {extra > 0 && (
                        <div className="text-sm text-slate-400 pl-4 font-medium">+{extra} more</div>
                      )}
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="px-6 pb-5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-slate-500 transition-colors">Explore notes</span>
                    <svg className="w-5 h-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-14 flex items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Everything you need</p>
              <h2 className="font-display text-5xl font-bold text-slate-900 tracking-tight mb-4">Built around how you actually study</h2>
              <p className="text-slate-500 text-lg leading-relaxed">Every feature is designed for the real workflow of a BCSIT student — from cramming for board exams to landing your first internship.</p>
            </div>
            <img
              src="/bcsit1.png"
              alt=""
              aria-hidden
              className="hidden lg:block h-52 w-auto object-contain shrink-0"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <Link key={f.title} to={f.link} className="group bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-slate-100 block">
                <div className={`w-14 h-14 rounded-xl ${f.iconCls} flex items-center justify-center text-2xl mb-5`}>{f.icon}</div>
                <h3 className="font-display font-semibold text-slate-800 text-lg mb-2">{f.title}</h3>
                <p className="text-base text-slate-500 leading-relaxed mb-5">{f.desc}</p>
                <span className={`inline-block text-sm font-semibold px-3 py-1.5 rounded-lg ${f.badgeCls}`}>{f.badge}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S AVAILABLE ── */}
      <section className="py-14 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
            <div className="shrink-0 lg:w-72">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-2">Free access</p>
              <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">What's available now</h2>
              <p className="text-slate-500 text-base mt-1 leading-relaxed">Everything you need — no paywalls just learning , forever free.</p>
              <Link to="/register" className="mt-5 inline-block px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold transition-colors">
                Create free account →
              </Link>
            </div>
            <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {[
                { icon: "📄", t: "Notes",         s: "All 8 semesters · PDF download",    to: "/notes"          },
                { icon: "🗂️", t: "Past Questions", s: "Board · Pre-Board · Mid-Term",      to: "/past-questions" },
                { icon: "⚡", t: "Quiz Engine",    s: "Subject-wise questions · Feedback", to: "/quiz"           },
                { icon: "📋", t: "PU Syllabus",    s: "Unit breakdown · Credit hours",     to: "/syllabus"       },
                { icon: "🎬", t: "Video Guides",   s: "Subject-wise curated playlists",    to: "/videos"         },
                { icon: "📊", t: "Dashboard",      s: "Saved notes · Quiz history",        to: "/dashboard"      },
              ].map(item => (
                <Link key={item.t} to={item.to} className="flex items-center gap-4 p-5 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all group">
                  <span className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center text-xl shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-slate-800">{item.t}</div>
                    <div className="text-sm text-slate-400 truncate mt-0.5">{item.s}</div>
                  </div>
                  <svg className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">The team</p>
            <h2 className="font-display text-5xl font-bold text-slate-900 tracking-tight mb-4">Built by students, for students</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-lg leading-relaxed">4th-semester BCSIT students at Quest International College who built the resource they wished existed.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map(m => (
              <div key={m.name} className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden text-center hover:border-indigo-100 hover:shadow-lg transition-all flex flex-col items-center">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-full aspect-[3/4] object-cover object-top"
                />
                <div className="px-6 pt-5 pb-6 w-full flex flex-col items-center">
                <div className="font-display font-semibold text-slate-800 text-xl mb-0.5">{m.name}</div>
                <div className="text-sm text-slate-500 font-medium">{m.role}</div>
                <div className="text-xs text-slate-400 mt-0.5">BCSIT · 4th Semester</div>
                <div className="flex flex-wrap justify-center gap-1.5 mt-3 mb-4">
                  {m.skills.map(skill => (
                    <span key={skill} className="text-[15px] font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href={m.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    GitHub
                  </a>
                </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-10">Innovation Group · Quest International College · Supervised by Faculty</p>
        </div>
      </section>

    </div>
  );
}
