import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { EXPERIENCES } from "../data/portfolio";
import Section from "./Section";

export default function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <Section id="experience" title="Experience" intro="Newest first. Open any role to see what I did there.">
      <ol className="relative rounded-[14px] border border-line bg-surface p-5 sm:p-7">
        <span className="absolute left-[25px] sm:left-[33px] md:left-[193px] top-8 bottom-16 w-px bg-line" aria-hidden="true" />
        {EXPERIENCES.map((e, i) => {
          const isOpen = open === i;
          return (
            <li key={e.company} className="relative grid md:grid-cols-[150px_minmax(0,1fr)] gap-x-[46px] pl-7 md:pl-0 pb-7 last:pb-0">
              <span
                className={`absolute left-0 md:left-[160px] top-[7px] z-[1] w-[11px] h-[11px] rounded-full border-2 ${
                  e.current ? "bg-marigold border-marigold" : "bg-surface border-muted"
                }`}
                aria-hidden="true"
              />
              <p className="text-sm text-muted md:text-right md:pt-0.5 tabular-nums">{e.period}</p>
              <div className="min-w-0">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group w-full flex items-start justify-between gap-4 text-left"
                  >
                    <span>
                      <span className="block text-lg font-semibold leading-snug group-hover:underline underline-offset-4">{e.role}</span>
                      <span className="block text-[15px] text-muted">{e.company}, {e.type.toLowerCase()}</span>
                    </span>
                    <ChevronDown size={18} className={`mt-1 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                </h3>
                {isOpen && (
                  <div className="swap">
                    <ul className="mt-3 space-y-1.5 max-w-[68ch] list-disc pl-[18px] marker:text-muted">
                      {e.achievements.map((a) => (
                        <li key={a} className="text-[15px]">{a}</li>
                      ))}
                    </ul>
                    {e.tech.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {e.tech.map((t) => (
                          <li key={t} className="chip">{t}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
