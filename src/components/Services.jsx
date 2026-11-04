import { Bot, BrainCircuit, Cable, Check, CreditCard, FileSpreadsheet, Plug, Code2, Contact, Globe, Headset, IdCard, Image, LayoutTemplate, MessageCircle, PenTool, ShoppingCart, Smartphone, Target, TrendingUp } from "lucide-react";
import { CHATBOTS, INTEGRATIONS, SERVICES, WORK_MODES } from "../data/portfolio";
import Section from "./Section";

const ICONS = {
  website: LayoutTemplate,
  webapp: Code2,
  mobile: Smartphone,
  crm: Contact,
  hrms: IdCard,
  seo: TrendingUp,
  posts: Image,
  uiux: PenTool,
};

const OFFER_ICONS = {
  whatsapp: MessageCircle,
  website: Globe,
  ecommerce: ShoppingCart,
  support: Headset,
  leads: Target,
  ai: BrainCircuit,
  api: Cable,
  sheets: FileSpreadsheet,
  payment: CreditCard,
};

function OfferPanel({ icon: PanelIcon, title, summary, items, columns, onPick }) {
  return (
    <div className="mt-4 rounded-[14px] border border-line bg-surface p-5 sm:p-6 grid lg:grid-cols-[250px_minmax(0,1fr)] gap-x-8 gap-y-5">
      <div>
        <span className="grid place-items-center w-10 h-10 rounded-[10px] bg-marigold text-[#10231e]" aria-hidden="true">
          <PanelIcon size={20} />
        </span>
        <h3 className="mt-4 text-2xl font-semibold leading-tight" style={{ fontStretch: "110%" }}>{title}</h3>
        <p className="mt-2 text-[15px] text-muted">{summary}</p>
      </div>
      <ul className={`grid sm:grid-cols-2 ${columns} gap-3`}>
        {items.map((c) => {
          const Icon = OFFER_ICONS[c.icon];
          return (
            <li key={c.name}>
              <button type="button" onClick={() => onPick({ service: c.name, source: title })} className="lift flex gap-3 h-full w-full text-left rounded-[10px] border border-line p-3.5">
                <Icon size={18} className="mt-0.5 shrink-0 text-link" aria-hidden="true" />
                <span>
                  <span className="block font-semibold leading-snug">{c.name}</span>
                  <span className="mt-1 block text-sm text-muted">{c.summary}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Services({ onPick }) {
  return (
    <Section id="services" title="Services" intro="Everything your business needs online. Pick a service and the form below fills itself in.">
      <ul className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {SERVICES.map((s) => {
          const Icon = ICONS[s.icon];
          return (
            <li key={s.name} className="lift flex flex-col rounded-[14px] border border-line bg-surface p-5">
              <span className="grid place-items-center w-10 h-10 rounded-[10px] bg-mist text-link" aria-hidden="true">
                <Icon size={19} />
              </span>
              <h3 className="mt-4 text-lg font-semibold leading-snug" style={{ fontStretch: "108%" }}>{s.name}</h3>
              <p className="mt-1.5 text-[15px] text-muted">{s.summary}</p>
              <ul className="mt-4 space-y-1.5">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2 text-[15px]">
                    <Check size={16} className="mt-1 shrink-0 text-link" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              {s.examples && <p className="mt-4 text-sm text-muted">Past work: {s.examples}</p>}
              <div className="mt-auto pt-5">
                <button type="button" onClick={() => onPick({ service: s.name, source: "Services" })} className="btn btn-quiet w-full">
                  {s.cta}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <OfferPanel
        icon={Bot}
        title="Chatbots"
        summary="Automate replies and catch leads, day and night. Pick the one you need."
        items={CHATBOTS}
        columns="xl:grid-cols-3"
        onPick={onPick}
      />

      <OfferPanel
        icon={Plug}
        title="Integrations"
        summary="Connect your website, WhatsApp, Google Sheets and other tools so data moves by itself."
        items={INTEGRATIONS}
        columns=""
        onPick={onPick}
      />

      <div className="on-shell mt-4 rounded-[14px] p-6 sm:p-7 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-10 gap-y-6">
        <div>
          <h3 className="text-2xl font-semibold leading-tight" style={{ fontStretch: "110%" }}>{WORK_MODES.title}</h3>
          <p className="mt-2 text-[15px] text-muted max-w-[44ch]">{WORK_MODES.summary}</p>
        </div>
        <div className="space-y-4">
          {WORK_MODES.groups.map((g) => (
            <div key={g.label}>
              <p className="text-sm text-muted">{g.label}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {g.options.map((o) => (
                  <li key={o}>
                    <button
                      type="button"
                      onClick={() => onPick({ workType: o, source: "Work options" })}
                      className="h-9 px-3.5 rounded-lg border border-line text-[15px] font-medium hover:bg-marigold hover:border-marigold hover:text-[#10231e] transition-colors"
                    >
                      {o}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
