import { useMemo, useState } from "react";
import { tools } from "../data/tools";
import SEO from "../components/SEO";

export default function Tools() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return tools.filter(
      tool =>
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Developer Tools for BCSIT Students | BCSIT Study Hub"
        description="Curated list of developer tools every BCSIT and CSIT student should know — IDEs, deployment platforms, databases, design tools and more."
        keywords="BCSIT tools, CSIT developer tools, IT tools Nepal, tools for BCSIT students, programming tools BCSIT"
        canonical="/tools"
      />

      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

          <p className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-1">
            Developer Resources
          </p>

          <h1 className="font-display text-3xl font-bold text-slate-900">
            Tools for BCSIT Students
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            Recommended software, platforms and services.
          </p>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tools..."
          className="w-full px-4 py-3 border border-slate-200 rounded-xl mb-8"
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {filtered.map(tool => (
            <div
              key={tool.id}
              className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all"
            >

              <div className="flex justify-between mb-3">

                <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-md font-semibold">
                  {tool.category}
                </span>

                {tool.free && (
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md font-semibold">
                    Free
                  </span>
                )}

              </div>

              <h3 className="font-semibold text-slate-800 mb-2">
                {tool.name}
              </h3>

              <p className="text-sm text-slate-500 mb-4">
                {tool.description}
              </p>

              <a
                href={tool.website}
                target="_blank"
                rel="noreferrer"
                className="block text-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-xl"
              >
                Visit Website
              </a>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}