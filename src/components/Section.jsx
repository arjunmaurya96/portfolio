export default function Section({ id, title, intro, aside, children }) {
  return (
    <section id={id} className="px-1 sm:px-0 py-12 sm:py-16 border-t border-line">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 mb-8">
        <div>
          <h2 className="section-title">{title}</h2>
          {intro && <p className="mt-2 text-[17px] text-muted max-w-[58ch]">{intro}</p>}
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}
