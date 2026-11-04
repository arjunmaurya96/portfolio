import { useCallback, useEffect, useMemo, useState } from "react";
import { NAV, PROFILE, PROJECTS, SOCIALS, TESTIMONIALS } from "./data/portfolio";
import { MobileBar, Sidebar } from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import ProjectDrawer from "./components/ProjectDrawer";
import Services from "./components/Services";
import Stack from "./components/Stack";
import Experience from "./components/Experience";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import CommandPalette from "./components/CommandPalette";
import IntroGate from "./components/IntroGate";
import ChatBot from "./components/ChatBot";
import MoneyTrail from "./components/MoneyTrail";

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Private windows can block storage. The theme still works for this visit.
    }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

function useActiveSection() {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [prefill, setPrefill] = useState(null);

  const project = useMemo(() => PROJECTS.find((p) => p.id === projectId) || null, [projectId]);

  const goTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView();
  }, []);

  const pickService = useCallback(
    (choice) => {
      setPrefill(choice);
      goTo("contact");
    },
    [goTo]
  );

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openPalette = () => setPaletteOpen(true);

  return (
    <div className="min-h-screen">
      <IntroGate />
      <MoneyTrail />
      <a href="#overview" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 btn btn-primary">
        Skip to content
      </a>
      <Sidebar active={active} />

      <div className="shell:ml-[244px] shell:pt-2 bg-shell">
        <div className="bg-mist text-ink shell:rounded-tl-[20px] min-h-screen pb-20 shell:pb-0">
          <Topbar active={active} theme={theme} onToggleTheme={toggleTheme} onSearch={openPalette} />
          <main className="mx-auto max-w-[1240px] px-3 sm:px-6">
            <Hero onOpenProject={setProjectId} />
            <Work onOpenProject={setProjectId} />
            <Services onPick={pickService} />
            <Stack />
            <Experience />
            <About />
            {TESTIMONIALS.length > 0 && <Testimonials />}
            <Contact prefill={prefill} />
          </main>

          <footer className="mx-auto max-w-[1240px] px-4 sm:px-6 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-muted">
            <p>© {new Date().getFullYear()} {PROFILE.name}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a className="hover:text-ink underline-offset-4 hover:underline" href={s.href} target="_blank" rel="noreferrer">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        </div>
      </div>

      <MobileBar active={active} onSearch={openPalette} />

      <ChatBot />

      {project && (
        <ProjectDrawer project={project} onChange={setProjectId} onClose={() => setProjectId(null)} />
      )}

      {paletteOpen && (
        <CommandPalette
          theme={theme}
          onClose={() => setPaletteOpen(false)}
          onGoTo={goTo}
          onOpenProject={setProjectId}
          onToggleTheme={toggleTheme}
        />
      )}
    </div>
  );
}
