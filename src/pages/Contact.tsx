import { useState } from "react";
import SEO from "../components/SEO";

const faqs = [
  {
    q: "Can I download notes for free?",
    a: "Yes. All publicly available notes on BCSIT Study Hub can be accessed and downloaded without any cost."
  },
  {
    q: "Who maintains the portal?",
    a: "The portal is developed and maintained by BCSIT students as an academic project."
  },
  {
    q: "Can I contribute notes or resources?",
    a: "Yes. Students can submit notes, question papers, and useful resources through the contact form."
  },
  {
    q: "Do I need an account?",
    a: "Basic resources are available without login. Some personalized features require authentication."
  }
];

const teamMembers = [
  {
    name: "Saroj Dhital",
    role: "Project & Frontend Lead",
    initials: "SD",
    color: "bg-indigo-100 text-indigo-700"
  },
  {
    name: "Saksham Khadka",
    role: "Backend Lead",
    initials: "SK",
    color: "bg-violet-100 text-violet-700"
  },
  {
    name: "Aadarsha Tolangi",
    role: "Documentation Lead",
    initials: "AT",
    color: "bg-violet-100 text-violet-700"
  },
  {
    name: "Milan Bishwokarma",
    role: "Quality Assurance Lead",
    initials: "MB",
    color: "bg-emerald-100 text-emerald-700"
  },
  {
    name: "Rijan Maharjan",
    role: "Community Manager",
    initials: "RM",
    color: "bg-amber-100 text-amber-700"
  }
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Contact | BCSIT Study Hub"
        description="Get in touch with the BCSIT Study Hub team. We welcome feedback, suggestions, and contributions from BCSIT and CSIT students at Pokhara University."
        keywords="contact BCSIT Study Hub, BCSIT feedback, BCSIT support"
        canonical="/contact"
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
            Get In Touch
          </p>

          <h1 className="font-display text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Contact Us
          </h1>

          <p className="max-w-2xl text-slate-500 leading-relaxed">
            Have questions, suggestions, or study resources to contribute?
            We'd love to hear from you. Reach out to the BCSIT Study Hub team.
          </p>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Top Section */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Contact Form */}
          <div className="lg:col-span-2">

            <div className="bg-white border border-slate-100 rounded-3xl p-8">

              <div className="mb-8">
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
                  Send a Message
                </h2>

                <p className="text-slate-500 text-sm">
                  We typically respond within 24-48 hours.
                </p>
              </div>

              <form className="space-y-6">

                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>

                </div>

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>

                  <textarea
                    rows={7}
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />

                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3 rounded-xl transition-all"
                >
                  Send Message
                  <span>→</span>
                </button>

              </form>

            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            <div className="bg-white border border-slate-100 rounded-3xl p-6">
              <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
                Contact Information
              </h3>

              <div className="space-y-4">

                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                    Email
                  </div>

                  <div className="text-sm font-medium text-slate-700">
                    bcsithub@quest.edu.np
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                    College
                  </div>

                  <div className="text-sm font-medium text-slate-700">
                    Quest International College
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                    University
                  </div>

                  <div className="text-sm font-medium text-slate-700">
                    Pokhara University
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                    Location
                  </div>

                  <div className="text-sm font-medium text-slate-700">
                    Gwarko, Lalitpur, Nepal
                  </div>
                </div>

              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-6 text-white">

              <div className="text-sm uppercase tracking-wider text-indigo-200 mb-2">
                Study Hub
              </div>

              <h3 className="font-display text-2xl font-bold mb-3">
                Built for BCSIT Students
              </h3>

              <p className="text-indigo-100 text-sm leading-relaxed">
                Access notes, syllabus, quizzes, videos, tools,
                and career resources from a single platform.
              </p>

            </div>

          </div>

        </div>

        {/* Team Section */}
        <section className="mt-20">

          <div className="mb-10">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
              Development Team
            </p>

            <h2 className="font-display text-3xl font-bold text-slate-900">
              Meet The Team
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {teamMembers.map(member => (
              <div
                key={member.name}
                className="bg-white border border-slate-100 rounded-2xl p-6 text-center hover:border-indigo-100 hover:shadow-md transition-all"
              >

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-lg ${member.color}`}
                >
                  {member.initials}
                </div>

                <h3 className="font-semibold text-slate-800">
                  {member.name}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {member.role}
                </p>

              </div>
            ))}

          </div>

        </section>

        {/* FAQ */}
        <section className="mt-20">

          <div className="mb-10">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
              Frequently Asked Questions
            </p>

            <h2 className="font-display text-3xl font-bold text-slate-900">
              Common Questions
            </h2>
          </div>

          <div className="space-y-4">

            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden"
              >

                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >

                  <span className="font-medium text-slate-800">
                    {faq.q}
                  </span>

                  <span
                    className={`transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>

                </button>

                {openFaq === index && (
                  <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed">
                    {faq.a}
                  </div>
                )}

              </div>
            ))}

          </div>

        </section>

      </div>
    </div>
  );
}