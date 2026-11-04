import { useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { MORE_PROJECTS, NAV, PROFILE, PROJECTS, SOCIALS } from "../data/portfolio";
import useDialog from "./useDialog";

export default function CommandPalette({ theme, onClose, onGoTo, onOpenProject, onToggleTheme }) {
  const ref = useDialog(onClose);
  const listRef = useRef(null);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const items = useMemo(() => {
    const all = [
      ...NAV.map((n) => ({ group: "Go to", label: n.label, run: () => onGoTo(n.id) })),
      ...PROJECTS.map((p) => ({ group: "Projects", label: p.title, run: () => onOpenProject(p.id) })),
      ...MORE_PROJECTS.map((p) => ({ group: "Projects", label: p.title, run: () => window.open(p.url, "_blank", "noreferrer") })),
      {
        group: "Actions",
        label: "Copy email address",
        run: () => navigator.clipboard?.writeText(PROFILE.email),
      },
      {
        group: "Actions",
        label: "Download resume",
        run: () => {
          const a = document.createElement("a");
          a.href = PROFILE.resume;
          a.download = "";
          a.click();
        },
      },
      {
        group: "Actions",
        label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        run: onToggleTheme,
      },
      ...SOCIALS.map((s) => ({ group: "Links", label: `Open ${s.name}`, run: () => window.open(s.href, "_blank", "noreferrer") })),
    ];
    const q = query.trim().toLowerCase();
    return q ? all.filter((i) => i.label.toLowerCase().includes(q)) : all;
  }, [query, theme, onGoTo, onOpenProject, onToggleTheme]);

  const run = (item) => {
    onClose();
    // Let the dialog hand focus back before scrolling or opening the drawer.
    setTimeout(item.run, 0);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = (cursor + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      setCursor(next);
      listRef.current?.querySelector(`[data-index="${next}"]`)?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && items[cursor]) {
      e.preventDefault();
      run(items[cursor]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-[12vh]">
      <div className="absolute inset-0 bg-[#071f1b]/55" onClick={onClose} aria-hidden="true" />
      <div ref={ref} role="dialog" aria-modal="true" aria-label="Jump to anything" tabIndex={-1} className="relative w-full max-w-[560px] rounded-[14px] bg-surface text-ink border border-line overflow-hidden outline-none shadow-[0_30px_80px_-20px_rgba(7,31,27,0.7)]">
        <div className="flex items-center gap-3 px-4 h-[54px] border-b border-line">
          <Search size={17} className="text-muted shrink-0" aria-hidden="true" />
          <input
            autoFocus
            value={query}
            onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
            onKeyDown={onKeyDown}
            placeholder="Search projects, sections and actions"
            aria-label="Search projects, sections and actions"
            style={{ outline: "none" }}
            className="flex-1 min-w-0 bg-transparent text-base placeholder:text-muted"
          />
          <button type="button" onClick={onClose} className="text-xs text-muted border border-line rounded px-1.5 py-0.5">Esc</button>
        </div>
        <ul ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {items.length === 0 && <li className="px-3 py-6 text-center text-muted">Nothing matches "{query}". Try a project name.</li>}
          {items.map((item, i) => (
            <li key={item.label}>
              {(i === 0 || items[i - 1].group !== item.group) && (
                <p className="px-2.5 pt-2.5 pb-1 text-[13px] text-muted">{item.group}</p>
              )}
              <button
                type="button"
                data-index={i}
                onMouseMove={() => setCursor(i)}
                onClick={() => run(item)}
                className={`w-full text-left rounded-lg px-2.5 h-10 text-[15px] ${i === cursor ? "bg-shell text-[#f1f7f3]" : ""}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
