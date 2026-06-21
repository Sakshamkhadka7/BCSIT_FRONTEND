import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const teamMembers = [
  {
    initials: "SD",
    name: "Saroj Dhital",
    role: "Project & Frontend Lead",
    description:
      "Responsible for project workflow and features demonstration,user interface design, React development, responsive layouts, component architecture, and overall user experience.",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    initials: "SK",
    name: "Saksham Khadka",
    role: "Backend Lead",
    description:
      "Handles APIs, server-side logic, database integration, authentication systems, and backend architecture.",
    color: "bg-violet-100 text-violet-700",
  },
  {
    initials: "AT",
    name: "Aadarsha Tolangi",
    role: "Documentation Lead",
    description:
      "Responsible for creating and maintaining comprehensive documentation, user guides, and technical specifications.",
    color: "bg-violet-100 text-violet-700",
  },
  {
    initials: "MB",
    name: "Milan Bishwokarma",
    role: "Quality Assurance Lead",
    description:
      "Contributes to implementation, testing, quality assurance, and overall project development activities.",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    initials: "RM",
    name: "Rijan Maharjan",
    role: "Community Manager",
    description:
      "Supports features idea development, research, and project refinement.",
    color: "bg-amber-100 text-amber-700",
  },
];

const objectives = [
  "Provide semester-wise notes in one organized platform.",
  "Offer complete syllabus coverage for all semesters.",
  "Help students practice through quizzes and assessments.",
  "Collect previous question papers in a single repository.",
  "Guide students toward internships and career opportunities.",
  "Reduce the time students spend searching for study materials.",
];

const features = [
  {
    title: "Semester Notes",
    icon: "📄",
    description:
      "Structured notes organized semester-wise and subject-wise.",
  },
  {
    title: "PU Syllabus",
    icon: "📚",
    description:
      "Complete Pokhara University syllabus with unit breakdowns.",
  },
  {
    title: "Past Questions",
    icon: "🗂️",
    description:
      "Board, pre-board and internal examination questions.",
  },
  {
    title: "Quiz System",
    icon: "⚡",
    description:
      "Interactive quizzes with instant scoring and feedback.",
  },
  {
    title: "Video Resources",
    icon: "🎬",
    description:
      "Curated educational videos for major BCSIT subjects.",
  },
  {
    title: "Career Support",
    icon: "💼",
    description:
      "Career guidance, internship information and learning paths.",
  },
];

const stats = [
  {
    value: "8",
    label: "Semesters",
  },
  {
    value: "35+",
    label: "Subjects",
  },
  {
    value: "100+",
    label: "Quiz Questions",
  },
  {
    value: "1",
    label: "Student Hub",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="About BCSIT Study Hub | Built by BCSIT Students"
        description="Learn about BCSIT Study Hub — a free academic portal built by BCSIT students at Quest International College, Pokhara University. Our mission is to make quality study resources accessible to every BCSIT and CSIT student."
        keywords="about BCSIT Study Hub, BCSIT students project, Quest International College, Pokhara University BCSIT project"
        canonical="/about"
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 border-b border-slate-100">
        <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-indigo-100 blur-3xl opacity-50" />
        <div className="absolute -bottom-40 left-0 w-96 h-96 rounded-full bg-violet-100 blur-3xl opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              About The Project
            </p>

            <h1 className="font-display text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
              BCSIT Study Hub
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              A centralized academic platform developed by BCSIT students
              to simplify learning, resource sharing, exam preparation,
              and career development throughout the entire BCSIT journey.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-50 rounded-2xl border border-slate-100 p-6 text-center"
              >
                <div className="font-display text-3xl font-bold text-indigo-600">
                  {stat.value}
                </div>

                <div className="text-sm text-slate-500 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
                Project Overview
              </p>

              <h2 className="font-display text-4xl font-bold text-slate-900 mb-6">
                Why We Built This Platform
              </h2>

              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>
                  Throughout our academic journey, we noticed that
                  students often struggle to find reliable notes,
                  previous questions, syllabus documents, and
                  study materials.
                </p>

                <p>
                  Resources are usually scattered across different
                  social media groups, cloud drives, and personal
                  collections. This creates confusion and wastes
                  valuable study time.
                </p>

                <p>
                  BCSIT Study Hub was developed as a Project II
                  initiative to solve this problem by bringing
                  everything into one organized, modern platform.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <h3 className="font-display text-2xl font-semibold text-slate-900 mb-6">
                Project Objectives
              </h3>

              <div className="space-y-4">
                {objectives.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mt-0.5">
                      ✓
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
              Platform Features
            </p>

            <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Everything In One Place
            </h2>

            <p className="max-w-2xl mx-auto text-slate-500">
              Designed around the actual needs of BCSIT students.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">
                  {feature.icon}
                </div>

                <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
              Development Team
            </p>

            <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Meet The Team
            </h2>

            <p className="text-slate-500 max-w-2xl mx-auto">
              Students behind the design, development, and implementation
              of BCSIT Study Hub.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-slate-100 rounded-3xl p-8 text-center hover:border-indigo-200 hover:shadow-md transition-all"
              >
                <div
                  className={`w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center text-xl font-bold ${member.color}`}
                >
                  {member.initials}
                </div>

                <h3 className="font-display text-lg font-semibold text-slate-900 mb-1">
                  {member.name}
                </h3>

                <p className="text-indigo-600 text-sm font-medium mb-4">
                  {member.role}
                </p>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* College Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
            Academic Project
          </p>

          <h2 className="font-display text-4xl font-bold text-slate-900 mb-6">
            Quest International College
          </h2>

          <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto">
            This platform is being developed as a Project II initiative
            by BCSIT Semester-IV students under Pokhara University. The goal is to
            create a practical academic solution that benefits current
            and future students by improving access to learning resources.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-indigo-600 rounded-3xl p-10 lg:p-14 text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              Start Exploring Resources
            </h2>

            <p className="text-indigo-200 max-w-2xl mx-auto mb-8">
              Access notes, syllabus, quizzes, videos, and learning
              materials from one centralized platform.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/notes"
                className="px-6 py-3 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-slate-100 transition-colors"
              >
                Explore Notes
              </Link>

              <Link
                to="/quiz"
                className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Take Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}