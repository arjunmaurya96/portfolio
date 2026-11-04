import { Check, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { PROJECTS, categoryLabel, hostOf } from "../data/portfolio";
import useDialog from "./useDialog";

export default function ProjectDrawer({ project, onChange, onClose }) {
  const ref = useDialog(onClose);
  const index = PROJECTS.findIndex((p) => p.id === project.id);
  const step = (delta) => onChange(PROJECTS[(index + delta + PROJECTS.length) % PROJECTS.length].id);
  const iconBtn = "grid place-items-center w-9 h-9 rounded-lg border border-line text-muted hover:text-ink hover:border-muted transition-colors";

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-[#071f1b]/55" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        tabIndex={-1}
        className="drawer-in absolute inset-y-0 right-0 w-full sm:w-[560px] bg-surface text-ink overflow-y-auto outline-none"
      >
        <div className="sticky top-0 z-10 bg-surface border-b border-line h-[60px] px-4 sm:px-6 flex items-center gap-2">
          <p className="text-sm text-muted tabular-nums">{index + 1} of {PROJECTS.length}</p>
          <button type="button" className={`${iconBtn} ml-auto`} onClick={() => step(-1)} aria-label="Previous project"><ChevronLeft size={17} /></button>
          <button type="button" className={iconBtn} onClick={() => step(1)} aria-label="Next project"><ChevronRight size={17} /></button>
          <button type="button" className={iconBtn} onClick={onClose} aria-label="Close project details"><X size={17} /></button>
        </div>

        <div key={project.id} className="swap px-4 sm:px-6 py-6">
          <img src={project.image} alt={`Home page of ${project.title}`} width="1440" height="696" className="w-full h-auto rounded-[10px] border border-line" />
          <p className="mt-6 text-sm text-muted">{categoryLabel[project.category]}</p>
          <h2 className="mt-1 text-2xl font-semibold leading-tight" style={{ fontStretch: "110%" }}>{project.title}</h2>
          <p className="mt-3 text-muted">{project.desc}</p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
              {project.demo.includes("onrender.com") ? "Open live demo" : `Visit ${hostOf(project.demo)}`}
              <ExternalLink size={15} aria-hidden="true" />
            </a>
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-quiet">View code</a>
            )}
          </div>

          <h3 className="mt-8 font-semibold">What's in it</h3>
          <ul className="mt-2 grid sm:grid-cols-2 gap-x-5 gap-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-[15px]">
                <Check size={16} className="mt-1 shrink-0 text-link" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-semibold">Built with</h3>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li key={t} className="chip">{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
