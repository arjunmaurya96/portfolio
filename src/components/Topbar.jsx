import { Moon, Search, Sun } from "lucide-react";
import { NAV, PROFILE } from "../data/portfolio";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

export default function Topbar({ active, theme, onToggleTheme, onSearch }) {
  const current = NAV.find((n) => n.id === active)?.label;
  return (
    <header className="sticky top-0 z-10 bg-mist border-b border-line shell:rounded-tl-[20px]">
      <div className="mx-auto max-w-[1240px] h-[60px] px-4 sm:px-6 flex items-center gap-3">
        <a href="#overview" className="shell:hidden" aria-label="Arjun Maurya, go to top">
          <img src={PROFILE.avatar} alt="" width="32" height="32" className="w-8 h-8 rounded-full" />
        </a>
        <p className="text-[15px] font-semibold" aria-live="off">
          {current}
        </p>

        <button
          type="button"
          onClick={onSearch}
          className="ml-auto hidden sm:flex items-center gap-2 h-9 w-[230px] px-3 rounded-lg border border-line bg-surface text-sm text-muted hover:border-muted transition-colors"
        >
          <Search size={15} aria-hidden="true" />
          <span>Jump to anything</span>
          <kbd className="ml-auto text-xs font-sans border border-line rounded px-1.5 py-0.5">{isMac ? "⌘K" : "Ctrl K"}</kbd>
        </button>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          className="ml-auto sm:ml-0 grid place-items-center w-9 h-9 rounded-lg border border-line text-muted hover:text-ink hover:border-muted transition-colors"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <a href="#contact" className="btn btn-primary !min-h-[36px] !px-3.5 !text-sm">
          Hire me
        </a>
      </div>
    </header>
  );
}
