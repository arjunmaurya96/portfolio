import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Check, Copy } from "lucide-react";
import { PROFILE, SOCIALS } from "../data/portfolio";

const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function Contact({ subject }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (subject) {
      setForm((f) => ({ ...f, subject }));
      setStatus("idle");
    }
  }, [subject]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send("service_k41rw8n", "template_z8lzzm8", form, "gEoYwkl8lrQ1Tekau");
      setForm(EMPTY);
      setStatus("sent");
    } catch {
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
            <p className="text-2xl font-semibold">Message sent</p>
            <p className="mt-2 text-muted">I'll reply to your email within 24 hours.</p>
            <button type="button" className="mt-5 btn btn-quiet mx-auto" onClick={() => setStatus("idle")}>
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={label} htmlFor="c-name">Your name</label>
                <input id="c-name" className="field" required autoComplete="name" value={form.name} onChange={update("name")} />
              </div>
              <div>
                <label className={label} htmlFor="c-email">Email</label>
                <input id="c-email" className="field" type="email" required autoComplete="email" value={form.email} onChange={update("email")} />
              </div>
            </div>
            <div>
              <label className={label} htmlFor="c-subject">Subject</label>
              <input id="c-subject" className="field" required value={form.subject} onChange={update("subject")} />
            </div>
            <div>
              <label className={label} htmlFor="c-message">Message</label>
              <textarea id="c-message" className="field resize-y" rows={5} required value={form.message} onChange={update("message")} />
            </div>
            {status === "error" && (
              <p role="alert" className="text-sm font-medium text-marigold">
                The message didn't send. Try again, or email me at {PROFILE.email}.
              </p>
            )}
            <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-70">
              {status === "sending" ? "Sending" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
