import { TESTIMONIALS } from "../data/portfolio";
import Section from "./Section";

export default function Testimonials() {
  return (
    <Section id="testimonials" title="What people say">
      <ul className="grid md:grid-cols-2 gap-x-10 gap-y-8">
        {TESTIMONIALS.map((t) => (
          <li key={t.name}>
            <blockquote className="text-[18px] leading-relaxed">“{t.text}”</blockquote>
            <p className="mt-3 text-sm text-muted">{t.name}, {t.role}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
