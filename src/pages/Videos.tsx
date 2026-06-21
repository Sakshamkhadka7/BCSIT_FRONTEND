import { useMemo, useState } from "react";
import { videos, videoSubjects } from "../data/videos";
import SEO from "../components/SEO";

export default function Videos() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("all");

  const filtered = useMemo(() => {
    let data = [...videos];

    if (subject !== "all") {
      data = data.filter(v => v.subject === subject);
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      data = data.filter(
        v =>
          v.title.toLowerCase().includes(q) ||
          v.subject.toLowerCase().includes(q) ||
          v.instructor.toLowerCase().includes(q)
      );
    }

    return data;
  }, [search, subject]);

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="BCSIT Video Guides | Subject-wise YouTube Playlists"
        description="Curated YouTube video playlists for every BCSIT and CSIT subject. Find the right tutorial for programming, networking, databases, AI, and all Pokhara University BCSIT subjects."
        keywords="BCSIT videos, CSIT YouTube tutorials, BCSIT lecture videos, IT course videos Nepal, BCSIT video guides"
        canonical="/videos"
      />

      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

          <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1">
            Learning Resources
          </p>

          <h1 className="font-display text-3xl font-bold text-slate-900">
            Video Guides
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            Curated video lectures and playlists for BCSIT students.
          </p>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <div className="grid md:grid-cols-2 gap-4 mb-8">

          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search videos..."
            className="px-4 py-3 border border-slate-200 rounded-xl"
          />

          <select
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-xl"
          >
            <option value="all">All Subjects</option>

            {videoSubjects.map(subject => (
              <option key={subject}>{subject}</option>
            ))}
          </select>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {filtered.map(video => (
            <div
              key={video.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-all"
            >

              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">

                {video.isFeatured && (
                  <span className="inline-block mb-3 text-[10px] font-bold bg-red-100 text-red-700 px-2 py-1 rounded-md">
                    Featured
                  </span>
                )}

                <h3 className="font-semibold text-slate-800 mb-2">
                  {video.title}
                </h3>

                <p className="text-sm text-slate-500 mb-4">
                  {video.description}
                </p>

                <div className="space-y-1 text-xs text-slate-400 mb-4">
                  <div>Instructor: {video.instructor}</div>
                  <div>Duration: {video.duration}</div>
                  <div>Semester: {video.semester}</div>
                </div>

                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl"
                >
                  Watch Video
                </a>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}