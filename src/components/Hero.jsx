import { useState } from "react";
import { ExternalLink, Lock } from "lucide-react";
import { CLIENTS, EXPERIENCES, MORE_PROJECTS, PROFILE, PROJECTS, categoryLabel, hostOf } from "../data/portfolio";

const current = EXPERIENCES[0];
const GLANCE = [
  { label: "Live projects", value: PROJECTS.length + MORE_PROJECTS.length, note: "Websites and web apps" },
  { label: "Experience", value: PROFILE.experience, note: "In production work" },
  { label: "Core stack", value: "MERN", note: "MongoDB, Express, React, Node.js" },
  { label: "Right now", value: current.role, note: current.company.replace(" Pvt Ltd", "") },
];

export default function Hero({ onOpenProject }) {
  const [index, setIndex] = useState(0);
  const project = PROJECTS[index];

  return (
    <section id="overview" className="pt-4 sm:pt-6 pb-12">
      <div className="on-shell relative overflow-hidden rounded-[20px] px-5 sm:px-10 lg:px-12 pt-10 sm:pt-14 pb-[150px] sm:pb-[250px] lg:pb-[290px]">
        <div className="dot-field absolute inset-0" aria-hidden="true" />
        {/* The portrait stands behind the product window. */}
        <div className="hidden xl:block absolute inset-y-0 right-[5%] w-[400px]" aria-hidden="true">
          <span className="absolute left-1/2 bottom-[250px] -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-marigold" />
          <img src={PROFILE.portrait} alt="" width="720" height="960" className="absolute inset-x-0 bottom-[70px] w-[400px] h-auto" />
        </div>
        <div className="relative max-w-[640px]">
          <div>
            <img src={PROFILE.avatar} alt={PROFILE.name} width="72" height="72" className="xl:hidden w-[72px] h-[72px] rounded-full mb-4 border-2 border-white/30" />
            {PROFILE.available && (
              <p className="flex w-fit min-h-8 py-1 px-3 rounded-xl sm:rounded-full border border-line text-sm mb-5 items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4fd1a1]" aria-hidden="true" />
                Available for full-time, part-time and freelance work
              </p>
            )}
            <h1 className="display text-[clamp(2.5rem,5.6vw,4.5rem)] max-w-[15ch]">
              I build web apps and ship them.
            </h1>
          </div>
          <div className="mt-5">
            <p className="text-[17px] text-muted max-w-[52ch]">
              I'm {PROFILE.name}, a MERN full stack developer in Gurugram with {PROFILE.experience} of
              production work in React, Node.js and MongoDB.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a href="#work" className="btn btn-primary">See my work</a>
              <a href={PROFILE.resume} download className="btn btn-quiet">Download resume</a>
            </div>
          </div>
        </div>
      </div>

      {/* The product shot. Every tab is a real site, so the work sells itself. */}
      <div className="settle relative mx-2 sm:mx-6 lg:mx-8 -mt-[122px] sm:-mt-[222px] lg:-mt-[262px] rounded-[14px] border border-line bg-surface overflow-hidden shadow-[0_34px_70px_-30px_rgba(7,31,27,0.6)]">
        <div className="flex items-center bg-mist/60 border-b border-line">
          <div className="hidden sm:flex gap-1.5 pl-4 pr-2" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-line" />
            <span className="w-2.5 h-2.5 rounded-full bg-line" />
            <span className="w-2.5 h-2.5 rounded-full bg-line" />
          </div>
          <div className="no-scrollbar flex overflow-x-auto" role="group" aria-label="Choose a project to preview">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
                className={`relative h-11 px-3.5 text-sm whitespace-nowrap border-r border-line transition-colors ${
                  i === index ? "bg-surface text-ink font-semibold" : "text-muted hover:text-ink"
                }`}
              >
                {p.tab}
                {i === index && <span className="absolute inset-x-0 top-0 h-0.5 bg-marigold" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_264px]">
          <div className="min-w-0">
            <div className="flex items-center gap-2 h-10 px-4 border-b border-line text-sm text-muted">
              <Lock size={13} aria-hidden="true" />
              <span className="truncate">{hostOf(project.demo)}</span>
            </div>
            <img
              key={project.id}
              src={project.image}
              alt={`Home page of ${project.title}`}
              width="1440"
              height="696"
              className="swap block w-full h-auto"
            />
          </div>

          <div key={project.id} className="swap flex flex-col border-t lg:border-t-0 lg:border-l border-line p-5">
            <p className="text-sm text-muted">{categoryLabel[project.category]}</p>
            <h2 className="mt-1 text-xl font-semibold leading-snug">{project.title}</h2>
            <p className="mt-2 text-[15px] text-muted">{project.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.slice(0, 5).map((t) => (
                <li key={t} className="chip">{t}</li>
              ))}
            </ul>
            <div className="mt-5 lg:mt-auto lg:pt-5 flex flex-col gap-2">
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-quiet">
                Visit live site <ExternalLink size={15} aria-hidden="true" />
              </a>
              <button type="button" onClick={() => onOpenProject(project.id)} className="text-sm font-semibold text-link h-9 hover:underline underline-offset-4">
                Read project details
              </button>
            </div>
          </div>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 lg:grid-cols-[0.8fr_0.8fr_1.2fr_1.2fr] rounded-[14px] border border-line bg-surface overflow-hidden">
        {GLANCE.map((g, i) => (
          <div key={g.label} className={`p-4 sm:p-5 min-w-0 border-line ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
            <dt className="text-sm text-muted">{g.label}</dt>
            <dd className="mt-1 text-xl sm:text-2xl font-semibold leading-tight" style={{ fontStretch: "112%", letterSpacing: "-0.015em" }}>{g.value}</dd>
            <dd className="mt-1 text-sm text-muted">{g.note}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-7 flex flex-wrap items-baseline gap-x-7 gap-y-2">
        <p className="text-sm text-muted">Built for</p>
        <ul className="flex flex-wrap gap-x-7 gap-y-1">
          {CLIENTS.map((c) => (
            <li key={c} className="text-[15px] font-semibold" style={{ fontStretch: "110%" }}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
