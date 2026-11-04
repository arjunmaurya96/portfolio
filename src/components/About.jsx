import { ABOUT, EDUCATION, PROFILE } from "../data/portfolio";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid lg:grid-cols-[260px_minmax(0,1fr)_minmax(0,1fr)] gap-x-10 gap-y-8">
        <figure className="relative overflow-hidden rounded-[14px] bg-marigold w-full max-w-[260px] aspect-[4/5]">
          <img src={PROFILE.portrait} alt={`Portrait of ${PROFILE.name}`} loading="lazy" width="720" height="960" className="absolute inset-x-0 top-[4%] w-full h-auto" />
        </figure>
        <div className="space-y-4 text-[17px] leading-relaxed max-w-[56ch]">
          {ABOUT.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div>
          <h3 className="font-semibold pb-2 border-b-2 border-ink">Education</h3>
          <ul>
            {EDUCATION.map((e) => (
              <li key={e.degree} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 py-3 border-b border-line">
                <div>
                  <p className="font-medium">{e.degree}</p>
                  <p className="text-sm text-muted">{e.place}, {e.year}</p>
                </div>
                <p className="font-semibold tabular-nums">{e.grade}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
