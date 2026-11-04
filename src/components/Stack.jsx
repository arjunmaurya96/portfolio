import { Braces, Cloud, Code2 } from "lucide-react";
import { SKILLS, SKILL_TIERS } from "../data/portfolio";
import { SKILL_ICONS } from "../data/skillIcons";
import Section from "./Section";

function Meter({ tier }) {
  return (
    <span className="flex gap-[3px]" role="img" aria-label={SKILL_TIERS[tier]}>
      {[3, 2, 1].map((step) => (
        <span key={step} className={`w-[14px] h-1.5 rounded-[2px] ${tier <= step ? "bg-link" : "bg-line"}`} />
      ))}
    </span>
  );
}

const FALLBACK = { "REST APIs": Braces, "VS Code": Code2, "AWS (EC2, S3)": Cloud };

function Logo({ name }) {
  const Icon = FALLBACK[name];
  return (
    <span className="grid place-items-center w-8 h-8 rounded-lg bg-mist text-link shrink-0" aria-hidden="true">
      {Icon ? (
        <Icon size={16} />
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d={SKILL_ICONS[name]} /></svg>
      )}
    </span>
  );
}

export default function Stack() {
  return (
    <Section
      id="stack"
      title="Stack"
      intro="What I reach for every day, and what I'm still learning."
      aside={
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          {[1, 2, 3].map((tier) => (
            <li key={tier} className="flex items-center gap-2">
              <Meter tier={tier} /> {SKILL_TIERS[tier]}
            </li>
          ))}
        </ul>
      }
    >
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(SKILLS).map(([group, skills]) => (
          <div key={group} className="rounded-[14px] border border-line bg-surface p-5">
            <h3 className="font-semibold">{group}</h3>
            <ul className="mt-3 grid sm:grid-cols-2 gap-x-6">
              {skills.map((s) => (
                <li key={s.name} className="flex items-center gap-2.5 py-2 text-[15px] min-w-0">
                  <Logo name={s.name} />
                  <span className="flex-1 min-w-0">{s.name}</span>
                  <Meter tier={s.tier} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
