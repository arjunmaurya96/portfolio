import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Check, Copy } from "lucide-react";
import { LEAD_FORM, PROFILE, SHEET_URL, SOCIALS } from "../data/portfolio";

const EMPTY = {
  fullName: "",
  whatsapp: "",
  email: "",
  service: "",
  workType: "",
  details: "",
  timeline: "",
  budget: "",
  website: "", // Hidden from people. Only bots fill it.
};

async function saveToSheet(lead) {
  // A form-encoded body avoids the CORS preflight that Apps Script cannot answer.
  const response = await fetch(SHEET_URL, { method: "POST", body: new URLSearchParams(lead) });
  const result = await response.json();
  if (!result.ok) throw new Error(result.error || "Sheet rejected the lead");
}

function sendEmail(lead) {
  const message = [
    `WhatsApp: ${lead.whatsapp}`,
    `Service: ${lead.service}`,
    `Work type: ${lead.workType}`,
    `Timeline: ${lead.timeline || "Not given"}`,
    `Budget: ${lead.budget || "Not given"}`,
    "",
    lead.details,
  ].join("\n");
  return emailjs.send(
    "service_k41rw8n",
    "template_z8lzzm8",
    { name: lead.fullName, email: lead.email, subject: `${lead.service} (${lead.workType})`, message },
    "gEoYwkl8lrQ1Tekau"
  );
}

// The sheet script saves the lead and emails you. EmailJS is the backup if it fails.
async function deliverLead(lead) {
  if (SHEET_URL) {
    try {
      await saveToSheet(lead);
      return;
    } catch (error) {
      console.warn("Sheet unavailable, sending by EmailJS:", error);
    }
  }
  await sendEmail(lead);
}

function Select({ id, label, value, onChange, placeholder, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" htmlFor={id}>{label}</label>
      <select id={id} className="field" required={required} value={value} onChange={onChange}>
        <option value="">{placeholder}</option>
        {children}
      </select>
    </div>
  );
}

const options = (list) => list.map((o) => <option key={o} value={o}>{o}</option>);

export default function Contact({ prefill }) {
  const [form, setForm] = useState(EMPTY);
  const [source, setSource] = useState("Contact form");
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!prefill) return;
    setForm((f) => ({
      ...f,
      service: prefill.service || f.service,
      workType: prefill.workType || f.workType,
    }));
    setSource(prefill.source);
    setStatus("idle");
  }, [prefill]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.website) return;
    setStatus("sending");
    const lead = { ...form, source };
    try {
      await deliverLead(lead);
      setForm(EMPTY);
      setSource("Contact form");
      setStatus("sent");
    } catch (error) {
      console.warn("Lead not delivered:", error);
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const label = "block text-sm font-medium mb-1.5";

  return (
    <section id="contact" className="py-12 sm:py-16 border-t border-line">
      <div className="on-shell rounded-[20px] grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-x-14 gap-y-10 p-6 sm:p-10">
        <div className="flex flex-col">
          <h2 className="display text-[clamp(2rem,4vw,3.25rem)]">Tell me what you're building.</h2>
          <p className="mt-4 text-[17px] text-muted max-w-[42ch]">
            Full-time, part-time, freelance or a single project. Tell me what you need and I reply within 24 hours.
          </p>
          <div className="mt-8 lg:mt-auto lg:pt-8">
            <p className="text-sm text-muted">Email</p>
            <button type="button" onClick={copyEmail} className="mt-1 inline-flex items-center gap-2 font-semibold text-left break-all">
              {PROFILE.email}
              {copied ? <Check size={15} className="shrink-0" aria-hidden="true" /> : <Copy size={15} className="shrink-0 text-muted" aria-hidden="true" />}
              <span className="sr-only" aria-live="polite">{copied ? "Email copied" : "Copy email"}</span>
            </button>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-[var(--line)] hover:decoration-current">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {status === "sent" ? (
          <div className="grid place-content-center text-center min-h-[320px] rounded-xl border border-line p-6" role="status">
            <p className="text-2xl font-semibold">Details received</p>
            <p className="mt-2 text-muted">I'll reply on WhatsApp or email within 24 hours.</p>
            <button type="button" className="mt-5 btn btn-quiet mx-auto" onClick={() => setStatus("idle")}>
              Send another enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={label} htmlFor="c-name">Full name</label>
                <input id="c-name" className="field" required autoComplete="name" value={form.fullName} onChange={update("fullName")} />
              </div>
              <div>
                <label className={label} htmlFor="c-whatsapp">WhatsApp number</label>
                <input
                  id="c-whatsapp"
                  className="field"
                  type="tel"
                  required
                  autoComplete="tel"
                  pattern="\+?[0-9][0-9 \-]{8,16}[0-9]"
                  title="Enter a phone number with at least 10 digits"
                  value={form.whatsapp}
                  onChange={update("whatsapp")}
                />
              </div>
            </div>
            <div>
              <label className={label} htmlFor="c-email">Email</label>
              <input id="c-email" className="field" type="email" required autoComplete="email" value={form.email} onChange={update("email")} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Select id="c-service" label="Service needed" placeholder="Choose a service" required value={form.service} onChange={update("service")}>
                {LEAD_FORM.serviceGroups.map((g) => (
                  <optgroup key={g.label} label={g.label}>{options(g.options)}</optgroup>
                ))}
              </Select>
              <Select id="c-work" label="Work type" placeholder="Choose a work type" required value={form.workType} onChange={update("workType")}>
                {options(LEAD_FORM.workTypes)}
              </Select>
            </div>
            <div>
              <label className={label} htmlFor="c-details">Project details</label>
              <textarea id="c-details" className="field resize-y" rows={4} required maxLength={3000} value={form.details} onChange={update("details")} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Select id="c-timeline" label="Timeline (optional)" placeholder="Choose a timeline" value={form.timeline} onChange={update("timeline")}>
                {options(LEAD_FORM.timelines)}
              </Select>
              <Select id="c-budget" label="Approximate budget (optional)" placeholder="Choose a budget" value={form.budget} onChange={update("budget")}>
                {options(LEAD_FORM.budgets)}
              </Select>
            </div>

            {/* Honeypot: hidden from people, tempting for bots. */}
            <div className="absolute w-px h-px overflow-hidden opacity-0" aria-hidden="true">
              <label htmlFor="c-website">Website</label>
              <input id="c-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} />
            </div>

            {status === "error" && (
              <p role="alert" className="text-sm font-medium text-marigold">
                Your details didn't send. Try again, or email me at {PROFILE.email}.
              </p>
            )}
            <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-70">
              {status === "sending" ? "Sending" : "Send enquiry"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
