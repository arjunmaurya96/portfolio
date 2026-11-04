import { useState } from "react";
import { ExternalLink, LayoutGrid, Rows3 } from "lucide-react";
import { MORE_PROJECTS, PROJECTS, categoryLabel, hostOf } from "../data/portfolio";
import Section from "./Section";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full stack" },
  { id: "frontend", label: "Frontend" },
];

function Segmented({ label, options, value, onChange }) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-lg border border-line bg-surface p-0.5">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={value === o.id}
          aria-label={o.icon ? o.label : undefined}
          onClick={() => onChange(o.id)}
          className={`h-8 px-3 rounded-md text-sm transition-colors ${
            value === o.id ? "bg-shell text-[#f1f7f3] font-semibold" : "text-muted hover:text-ink"
          }`}
        >
          {o.icon ? <o.icon size={16} aria-hidden="true" /> : o.label}
        </button>
      ))}
    </div>
  );
}

function TableView({ projects, onOpen }) {
  return (
    <div className="rounded-[14px] border border-line bg-surface overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="hidden md:table-header-group">
          <tr className="text-sm text-muted border-b border-line">
            <th scope="col" className="font-medium py-2.5 pl-4">Project</th>
            <th scope="col" className="font-medium py-2.5 px-4">Type</th>
            <th scope="col" className="font-medium py-2.5 px-4">Built with</th>
            <th scope="col" className="font-medium py-2.5 pr-4 text-right">Live site</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr
              key={p.id}
              onClick={() => onOpen(p.id)}
              className="group cursor-pointer border-b border-line last:border-b-0 hover:bg-mist/70 transition-colors"
            >
              <td className="p-3 md:pl-4">
                <div className="flex items-center gap-4">
                  <img src={p.image} alt="" loading="lazy" width="132" height="64" className="w-[104px] sm:w-[132px] h-auto rounded-md border border-line shrink-0" />
                  <div className="min-w-0">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onOpen(p.id); }}
                      className="font-semibold text-left group-hover:underline underline-offset-4"
                    >
                      {p.title}
                    </button>
                    <p className="text-sm text-muted line-clamp-2 max-w-[46ch]">{p.blurb}</p>
                  </div>
                </div>
              </td>
              <td className="hidden md:table-cell px-4 text-sm whitespace-nowrap">{categoryLabel[p.category]}</td>
              <td className="hidden lg:table-cell px-4 text-sm text-muted whitespace-nowrap">
                {p.tech.slice(0, 3).join(", ")}
                {p.tech.length > 3 && ` +${p.tech.length - 3}`}
              </td>
              <td className="hidden md:table-cell pr-4 text-right">
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-link hover:underline underline-offset-4"
                >
                  {p.demo.includes("onrender.com") ? "Live demo" : hostOf(p.demo)}
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Twelfths of the row, so the two full stack apps lead and the rest step down.
const SPANS = ["lg:col-span-6", "lg:col-span-6", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-6", "lg:col-span-6"];

function GalleryView({ projects, onOpen }) {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-12 gap-4">
      {projects.map((p, i) => (
        <li key={p.id} className={SPANS[i] || "lg:col-span-4"}>
          <button type="button" onClick={() => onOpen(p.id)} className="lift group flex flex-col h-full w-full text-left rounded-[14px] border border-line bg-surface overflow-hidden">
            <span className="flex items-center gap-2 h-8 px-3 border-b border-line text-[13px] text-muted">
              <span className="flex gap-1" aria-hidden="true">
                <span className="w-1.5 h-1.5 rounded-full bg-line" />
                <span className="w-1.5 h-1.5 rounded-full bg-line" />
                <span className="w-1.5 h-1.5 rounded-full bg-line" />
              </span>
              <span className="truncate">{p.demo.includes("onrender.com") ? "Live demo" : hostOf(p.demo)}</span>
            </span>
            <img src={p.image} alt="" loading="lazy" width="1440" height="696" className="w-full h-auto" />
            <span className="block p-4 border-t border-line">
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-semibold group-hover:underline underline-offset-4">{p.title}</span>
                <span className="text-[13px] text-muted whitespace-nowrap">{categoryLabel[p.category]}</span>
              </span>
              <span className="mt-1 block text-sm text-muted">{p.blurb}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function MoreProjects() {
  return (
    <div className="mt-6">
      <h3 className="font-semibold">Also live</h3>
      <ul className="mt-3 grid sm:grid-cols-3 gap-3">
        {MORE_PROJECTS.map((p) => (
          <li key={p.url}>
            <a href={p.url} target="_blank" rel="noreferrer" className="lift flex items-center justify-between gap-3 rounded-[10px] border border-line bg-surface px-4 py-3">
              <span className="min-w-0">
                <span className="block font-medium truncate">{p.title}</span>
                <span className="block text-sm text-muted truncate">{p.note}</span>
              </span>
              <ExternalLink size={15} className="shrink-0 text-muted" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Work({ onOpenProject }) {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("gallery");
  const projects = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <Section
      id="work"
      title="Work"
      intro="Everything here is live. Open a project to see what went into it."
      aside={
        <div className="flex flex-wrap gap-2">
          <Segmented label="Filter projects" options={FILTERS} value={filter} onChange={setFilter} />
          <span className="hidden sm:inline-flex">
            <Segmented
              label="Project layout"
              value={view}
              onChange={setView}
              options={[
                { id: "gallery", label: "Gallery", icon: LayoutGrid },
                { id: "table", label: "Table", icon: Rows3 },
              ]}
            />
          </span>
        </div>
      }
    >
      {view === "table" ? (
        <TableView projects={projects} onOpen={onOpenProject} />
      ) : (
        <GalleryView projects={projects} onOpen={onOpenProject} />
      )}
      {filter === "all" && <MoreProjects />}
    </Section>
  );
}
