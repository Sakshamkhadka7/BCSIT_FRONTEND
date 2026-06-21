import { Link } from "react-router-dom";

const careerPaths = [
  {
    title: "Frontend Developer",
    icon: "💻",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    description:
      "Build modern user interfaces and interactive web applications.",
  },
  {
    title: "Backend Developer",
    icon: "⚙️",
    skills: ["Node.js", "Java", "Spring Boot", "Databases", "REST APIs"],
    description:
      "Develop server-side systems, APIs, authentication, and databases.",
  },
  {
    title: "Full Stack Developer",
    icon: "🚀",
    skills: ["React", "Node.js", "Databases", "Git", "Deployment"],
    description:
      "Handle both frontend and backend development of web applications.",
  },
  {
    title: "Mobile App Developer",
    icon: "📱",
    skills: ["Flutter", "React Native", "Firebase", "Mobile UI"],
    description:
      "Create Android and iOS applications for various industries.",
  },
  {
    title: "Data Analyst",
    icon: "📊",
    skills: ["Excel", "SQL", "Python", "Power BI", "Statistics"],
    description:
      "Analyze data and generate business insights through visualization.",
  },
  {
    title: "AI / Machine Learning Engineer",
    icon: "🤖",
    skills: ["Python", "TensorFlow", "Machine Learning", "Deep Learning"],
    description:
      "Build intelligent systems using data, algorithms, and AI models.",
  },
];

const internshipSites = [
  "LinkedIn",
  "InternSathi",
  "MeroJob",
  "JobsNepal",
  "Kumari Job",
  "Indeed",
];

const resumeTips = [
  "Keep your resume to one page(or 2 page max.).",
  "Highlight academic projects.",
  "Add GitHub and portfolio links.",
  "Mention technical skills clearly.",
  "Use action verbs and measurable achievements.",
  "Proofread before submitting.",
];

export default function CareerGuide() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">
            Career Resources
          </p>

          <h1 className="font-display text-3xl font-bold text-slate-900">
            Career Guide
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            Explore career paths, internships, resume tips, and opportunities
            for BCSIT students.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-14">

        {/* Career Paths */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
            Popular Career Paths
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {careerPaths.map((career) => (
              <div
                key={career.title}
                className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:border-slate-200 transition-all"
              >
                <div className="text-4xl mb-4">{career.icon}</div>

                <h3 className="font-semibold text-slate-800 text-lg mb-2">
                  {career.title}
                </h3>

                <p className="text-sm text-slate-500 mb-4">
                  {career.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded-lg bg-slate-100 text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resume Tips */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
            Resume Tips
          </h2>

          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {resumeTips.map((tip) => (
                <div
                  key={tip}
                  className="flex items-start gap-3 text-slate-600"
                >
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internship Platforms */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
            Internship & Job Platforms
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {internshipSites.map((site) => (
              <div
                key={site}
                className="bg-white border border-slate-100 rounded-xl p-5 hover:border-slate-200 transition-colors"
              >
                <h3 className="font-semibold text-slate-800">{site}</h3>

                <p className="text-sm text-slate-500 mt-2">
                  Search internships, entry-level positions, and graduate jobs.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
            Suggested Student Roadmap
          </h2>

          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <div className="grid md:grid-cols-4 gap-6">

              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-3">
                  1
                </div>
                <h3 className="font-semibold mb-2">Learn Fundamentals</h3>
                <p className="text-sm text-slate-500">
                  Programming, DSA, DBMS, Operating Systems, and Networking.
                </p>
              </div>

              <div>
                <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold mb-3">
                  2
                </div>
                <h3 className="font-semibold mb-2">Build Projects</h3>
                <p className="text-sm text-slate-500">
                  Create portfolio projects and upload them to GitHub.
                </p>
              </div>

              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-3">
                  3
                </div>
                <h3 className="font-semibold mb-2">Gain Experience</h3>
                <p className="text-sm text-slate-500">
                  Apply for internships and contribute to team projects.
                </p>
              </div>

              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-3">
                  4
                </div>
                <h3 className="font-semibold mb-2">Get Hired</h3>
                <p className="text-sm text-slate-500">
                  Prepare resume, LinkedIn profile, interviews, and apply.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-teal-600 rounded-3xl p-10 text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-3">
              Start Building Your Career Today
            </h2>

            <p className="text-teal-100 max-w-2xl mx-auto mb-6">
              Learn consistently, build real projects, and showcase your work.
              Small progress every week leads to big opportunities.
            </p>

            <Link
              to="/notes"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-600 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
            >
              Explore Notes →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}