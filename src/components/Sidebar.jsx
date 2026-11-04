import { Blocks, BriefcaseBusiness, Download, FolderKanban, GitCommitVertical, Home, Mail, Menu, Tags, UserRound } from "lucide-react";
import { NAV, PROFILE, SOCIALS } from "../data/portfolio";

const ICONS = {
  overview: Home,
  work: FolderKanban,
  services: Tags,
  stack: Blocks,
  experience: GitCommitVertical,
  about: UserRound,
  contact: Mail,
};

export function Sidebar({ active }) {
  return (
    <aside className="on-shell hidden shell:flex fixed inset-y-0 left-0 w-[244px] flex-col px-3 py-4 z-20" aria-label="Site">
      <a href="#overview" className="flex items-center gap-3 rounded-lg px-2 py-1.5 mb-6">
        <img src={PROFILE.avatar} alt="" width="40" height="40" className="w-10 h-10 rounded-full" />
        <span className="leading-tight">
          <span className="block font-semibold">{PROFILE.name}</span>
          <span className="block text-[13px] text-muted">Full stack developer</span>
        </span>
      </a>

      <nav>
        <ul className="space-y-0.5">
          {NAV.map(({ id, label, count }) => {
            const Icon = ICONS[id];
            const on = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={on ? "true" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-2.5 h-10 text-[15px] transition-colors ${
                    on ? "bg-[var(--shell-raised)] text-ink font-semibold" : "text-muted hover:text-ink"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  <span className="flex-1">{label}</span>
                  {count != null && <span className="text-[13px] tabular-nums text-muted font-normal">{count}</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto space-y-3">
        {PROFILE.available && (
          <div className="rounded-lg border border-line p-3">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#4fd1a1]" aria-hidden="true" />
              Available for hire
            </p>
            <p className="mt-1 text-[13px] text-muted">{PROFILE.location}</p>
          </div>
        )}
        <a href={PROFILE.resume} download className="flex items-center gap-2 px-2.5 h-9 rounded-lg text-sm text-muted hover:text-ink">
          <Download size={16} aria-hidden="true" /> Download resume
        </a>
        <ul className="flex flex-wrap gap-x-3 gap-y-1 px-2.5 text-[13px] text-muted">
          {SOCIALS.slice(0, 2).map((s) => (
            <li key={s.name}>
              <a className="hover:text-ink" href={s.href} target="_blank" rel="noreferrer">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

const TABS = [
  { id: "overview", label: "Home", icon: Home },
  { id: "work", label: "Work", icon: FolderKanban },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "contact", label: "Contact", icon: Mail },
];

export function MobileBar({ active, onSearch }) {
  const itemClass = (on) =>
    `flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-[11px] ${on ? "text-marigold font-semibold" : "text-muted"}`;
  return (
    <nav className="on-shell shell:hidden fixed bottom-0 inset-x-0 z-30 h-[60px] flex border-t border-line" aria-label="Sections">
      {TABS.map(({ id, label, icon: Icon }) => (
        <a key={id} href={`#${id}`} className={itemClass(active === id)} aria-current={active === id ? "true" : undefined}>
          <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
          {label}
        </a>
      ))}
      <button type="button" onClick={onSearch} className={itemClass(false)}>
        <Menu size={20} strokeWidth={1.8} aria-hidden="true" />
        More
      </button>
    </nav>
  );
}

