import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { CHATBOTS, EXPERIENCES, INTEGRATIONS, LEAD_FORM, MORE_PROJECTS, PROFILE, PROJECTS, SERVICES, SKILLS, SOCIALS, hostOf } from "../data/portfolio";
import { CHATBOT, FAQS, MENU, SERVICE_WORDS } from "../data/chatbot";
import { deliverLead } from "../data/leads";

const THINK_MS = 380;
const TEASER_DELAY_MS = 9000;
const TEASER_KEY = "chat-teaser-seen";
const whatsappUrl = `https://wa.me/${CHATBOT.whatsappNumber}?text=${encodeURIComponent(CHATBOT.whatsappText)}`;

const menuItem = (id) => MENU.find((m) => m.id === id);
const MAIN = { id: "menu", label: "Main menu" };
const BACK = { id: "back", label: "Back" };
const TRY_AGAIN = { id: "tryAgain", label: "Try again" };
const USE_SAME = { id: "useSame", label: "Yes, use them" };
const CHANGE_DETAILS = { id: "changeDetails", label: "Change details" };
const SEND_DETAILS = { id: "send", label: "Send details" };
const EDIT_DETAILS = { id: "edit", label: "Edit details" };
const ALL_SERVICES = { id: "services", label: "All services" };

const STEPS = [
  { key: "fullName", label: "Name", ask: "What's your full name?", kind: "text", autoComplete: "name" },
  {
    key: "whatsapp",
    label: "WhatsApp",
    ask: "What's your WhatsApp number?",
    kind: "tel",
    autoComplete: "tel",
    valid: (v) => /^\+?[0-9][0-9 -]{8,16}[0-9]$/.test(v),
    error: "That doesn't look like a phone number. Enter at least 10 digits, like +91 98765 43210.",
  },
  {
    key: "email",
    label: "Email",
    ask: "What's your email address?",
    kind: "email",
    autoComplete: "email",
    valid: (v) => /^\S+@\S+\.\S+$/.test(v),
    error: "That doesn't look like an email address. Enter one like name@example.com.",
  },
  { key: "service", label: "Service", ask: "Which service do you need?", options: LEAD_FORM.serviceGroups.flatMap((g) => g.options) },
  { key: "workType", label: "Work type", ask: "How would you like to work?", options: LEAD_FORM.workTypes },
  { key: "details", label: "Project details", ask: "Tell me about your project or role.", kind: "text", multiline: true },
];
const CONTACT_KEYS = ["fullName", "whatsapp", "email"];

const ALL_OFFERS = [
  ...SERVICES.map((s) => ({ name: s.name, summary: s.summary, points: s.points, examples: s.examples })),
  ...CHATBOTS.map((c) => ({ name: c.name, summary: c.summary })),
  ...INTEGRATIONS.map((i) => ({ name: i.name, summary: i.summary })),
  {
    name: "Chatbot",
    summary: "Automated replies and lead capture for WhatsApp, websites and online stores.",
    points: CHATBOTS.map((c) => c.name),
  },
];

const uniqueId = (() => {
  let id = 0;
  return () => (id += 1);
})();

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");

function detectService(text) {
  const lower = text.toLowerCase();
  for (const [service, words] of SERVICE_WORDS) {
    if (words.some((w) => new RegExp(`(^|[^a-z0-9])${escapeRegExp(w)}($|[^a-z0-9])`).test(lower))) return service;
  }
  return null;
}

const has = (text, pattern) => pattern.test(text);

function Bubble({ message, onService }) {
  const mine = message.from === "me";
  return (
    <div data-bot={mine ? undefined : true} className={`swap flex ${mine ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[90%] rounded-[12px] px-3 py-2 text-[15px] leading-snug ${mine ? "bg-shell text-[#f1f7f3]" : "bg-mist text-ink"}`}>
        {message.text && <p className="whitespace-pre-wrap break-words">{message.text}</p>}
        {message.sections?.map((section) => (
          <div key={section.title || "list"} className={message.text || section !== message.sections[0] ? "mt-2.5" : ""}>
            {section.title && <p className="text-sm font-semibold text-muted">{section.title}</p>}
            <ul className="mt-1 space-y-1.5">
              {section.items.map((item) => (
                <li key={item.label}>
                  {item.service ? (
                    <button type="button" onClick={() => onService(item.service)} className="font-semibold text-left text-link underline underline-offset-2">
                      {item.label}
                    </button>
                  ) : item.href ? (
                    <a
                      href={item.href}
                      {...(item.download ? { download: true } : { target: "_blank", rel: "noreferrer" })}
                      className="font-semibold text-link underline underline-offset-2"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="font-semibold">{item.label}</span>
                  )}
                  {item.text && <span className="block text-sm text-muted">{item.text}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [choices, setChoices] = useState([]);
  const [typing, setTyping] = useState(false);
  const [lead, setLead] = useState(null);
  const [known, setKnown] = useState(null); // Contact details remembered for this visit.
  const [draft, setDraft] = useState("");
  const [teaser, setTeaser] = useState(false);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const timerRef = useRef(null);

  const step = lead?.mode === "ask" ? STEPS[lead.index] : null;

  const say = useCallback((message, nextChoices = []) => {
    setChoices([]);
    setTyping(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setTyping(false);
      setMessages((list) => [...list, { id: uniqueId(), from: "bot", ...message }]);
      setChoices(nextChoices);
    }, THINK_MS);
  }, []);

  const addMine = (text) => setMessages((list) => [...list, { id: uniqueId(), from: "me", text }]);

  const showMenu = useCallback((text = "What would you like to do next?") => say({ text }, MENU), [say]);

  const exitLead = (text) => {
    setLead(null);
    showMenu(text);
  };

  const reset = () => {
    clearTimeout(timerRef.current);
    setMessages([]);
    setLead(null);
    setDraft("");
    showMenu(CHATBOT.greeting);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  useEffect(() => {
    if (open && messages.length === 0 && !typing) showMenu(CHATBOT.greeting);
  }, [open, messages.length, typing, showMenu]);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    // Long answers open at their first line, so people read from the top.
    const bots = log.querySelectorAll("[data-bot]");
    const latest = bots[bots.length - 1];
    const isLong = latest && !typing && latest.offsetHeight > log.clientHeight * 0.7;
    log.scrollTop = isLong ? latest.offsetTop - 8 : log.scrollHeight;
  }, [messages, typing, choices]);

  useEffect(() => {
    // On phones the keyboard opens only when an answer has to be typed.
    const hasMouse = window.matchMedia("(hover: hover)").matches;
    if (open && !typing && (hasMouse || step?.kind)) inputRef.current?.focus({ preventScroll: true });
  }, [open, typing, step]);

  useEffect(() => {
    if (!open) return undefined;
    setTeaser(false);
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem(TEASER_KEY));
    } catch {
      seen = true;
    }
    if (seen) return undefined;
    const timer = setTimeout(() => {
      setTeaser(true);
      try {
        sessionStorage.setItem(TEASER_KEY, "1");
      } catch {
        // The teaser may show again next time. Nothing else depends on this.
      }
    }, TEASER_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  /* Answers */

  const showServices = () =>
    say(
      {
        text: "Arjun offers these services. Tap one to read more.",
        sections: [
          { title: "Websites, apps and marketing", items: SERVICES.map((s) => ({ label: s.name, text: s.summary, service: s.name })) },
          { title: "Chatbots", items: CHATBOTS.map((c) => ({ label: c.name, text: c.summary, service: c.name })) },
          { title: "Integrations", items: INTEGRATIONS.map((i) => ({ label: i.name, text: i.summary, service: i.name })) },
        ],
      },
      [menuItem("quote"), MAIN]
    );

  const showService = (name) => {
    const offer = ALL_OFFERS.find((o) => o.name === name);
    if (!offer) {
      showServices();
      return;
    }
    const items = (offer.points || []).map((p) => ({ label: p }));
    if (offer.examples) items.push({ label: "Past work", text: offer.examples });
    say(
      { text: `${offer.name}\n${offer.summary}`, sections: items.length ? [{ title: "What's included", items }] : undefined },
      [{ id: "quoteFor", label: `Get a quote for ${offer.name}`, service: offer.name }, ALL_SERVICES, MAIN]
    );
  };

  const showWork = () =>
    say(
      {
        text: "Here are Arjun's live projects:",
        sections: [
          {
            items: [
              ...PROJECTS.map((p) => ({ label: p.title, href: p.demo, text: p.blurb })),
              ...MORE_PROJECTS.map((p) => ({ label: p.title, href: p.url, text: p.note })),
            ],
          },
        ],
      },
      [menuItem("hire"), MAIN]
    );

  const showExperience = () =>
    say(
      {
        text: `Arjun is a MERN full stack developer with ${PROFILE.experience} of experience.`,
        sections: [
          { title: "Experience", items: EXPERIENCES.map((e) => ({ label: e.role, text: `${e.company.replace(" Pvt Ltd", "")}, ${e.period}` })) },
          { title: "Skills", items: Object.entries(SKILLS).map(([group, skills]) => ({ label: group, text: skills.map((s) => s.name).join(", ") })) },
          { title: "Resume", items: [{ label: "Download resume", href: PROFILE.resume, download: true }] },
        ],
      },
      [menuItem("hire"), MAIN]
    );

  const showFaqs = () =>
    say({ text: "Choose a question:" }, [...FAQS.map((f, i) => ({ id: "faqAnswer", label: f.question, faq: i })), MAIN]);

  const showContact = () =>
    say(
      {
        text: "You can reach Arjun here:",
        sections: [
          {
            items: [
              { label: `WhatsApp: ${CHATBOT.whatsappDisplay}`, href: whatsappUrl },
              { label: `Email: ${PROFILE.email}`, href: `mailto:${PROFILE.email}` },
              ...SOCIALS.slice(0, 2).map((s) => ({ label: s.name, href: s.href })),
            ],
          },
        ],
      },
      [menuItem("quote"), MAIN]
    );

  const openWhatsapp = () => {
    window.open(whatsappUrl, "_blank", "noreferrer");
    say({ text: "WhatsApp is opening in a new tab." }, lead ? [TRY_AGAIN, BACK, MAIN] : [MAIN]);
  };

  /* Lead collection */

  const stepChoices = (s) => [...(s.options || []).map((o) => ({ id: "answer", label: o })), BACK, MAIN];

  const nextIndex = (values, from) => {
    let i = from;
    while (STEPS[i] && values[STEPS[i].key]) i += 1;
    return i;
  };

  const askStep = (index, prefix) => {
    const s = STEPS[index];
    say({ text: prefix ? `${prefix}\n\n${s.ask}` : s.ask }, stepChoices(s));
  };

  const showReview = (current) => {
    setLead({ ...current, mode: "review", editing: false });
    say(
      { text: "Please check your details.", sections: [{ items: STEPS.map((s) => ({ label: s.label, text: current.values[s.key] })) }] },
      [SEND_DETAILS, EDIT_DETAILS, MAIN]
    );
  };

  const collect = (current, prefix) => {
    const index = nextIndex(current.values, 0);
    if (index >= STEPS.length) {
      showReview(current);
      return;
    }
    setLead({ ...current, index, mode: "ask" });
    askStep(index, prefix);
  };

  const startLead = (intent, preset = {}) => {
    const values = { ...preset };
    if (intent === "hire") values.service = "Hiring enquiry";
    const prefix = intent === "hire" ? "Great. A few quick details and Arjun will contact you." : "Sure. Answer a few quick questions and Arjun will send you a quote.";
    const current = { intent, values, locked: Object.keys(values), editing: false };

    if (known && CONTACT_KEYS.every((k) => known[k])) {
      setLead({ ...current, mode: "confirmKnown" });
      say(
        { text: "Use the same contact details?", sections: [{ items: CONTACT_KEYS.map((k) => ({ label: STEPS.find((s) => s.key === k).label, text: known[k] })) }] },
        [USE_SAME, CHANGE_DETAILS, MAIN]
      );
      return;
    }
    collect(current, prefix);
  };

  const recordAnswer = (value) => {
    const values = { ...lead.values, [step.key]: value };
    const current = { ...lead, values };
    if (CONTACT_KEYS.includes(step.key)) {
      setKnown((k) => ({ ...k, [step.key]: value }));
    }
    if (lead.editing) {
      showReview(current);
      return;
    }
    const index = nextIndex(values, lead.index + 1);
    if (index >= STEPS.length) {
      showReview(current);
      return;
    }
    setLead({ ...current, index });
    askStep(index);
  };

  const goBack = () => {
    if (lead.editing || lead.mode === "pickField") {
      showReview(lead);
      return;
    }
    let index = lead.index - 1;
    while (index >= 0 && lead.locked.includes(STEPS[index].key)) index -= 1;
    if (index < 0) {
      exitLead("No problem. What would you like to do next?");
      return;
    }
    const values = { ...lead.values };
    delete values[STEPS[index].key];
    setLead({ ...lead, values, index });
    askStep(index);
  };

  const submitLead = async (values) => {
    setLead(null);
    setChoices([]);
    setTyping(true);
    try {
      await deliverLead({
        fullName: values.fullName,
        whatsapp: values.whatsapp,
        email: values.email,
        service: values.service,
        workType: values.workType,
        details: values.details,
        timeline: "",
        budget: "",
        website: "",
        source: "Chatbot",
      });
      setTyping(false);
      showMenu(`Thanks, ${values.fullName.split(" ")[0]}. Arjun will reply on WhatsApp or email within 24 hours.\n\nAnything else I can help with?`);
    } catch (error) {
      console.warn("Chatbot lead not delivered:", error);
      setTyping(false);
      say(
        { text: "Your details didn't send. Try again, or message Arjun on WhatsApp." },
        [{ id: "retrySend", label: "Try again", values }, menuItem("whatsapp"), MAIN]
      );
    }
  };

  /* Input */

  const choose = (choice) => {
    addMine(choice.label);
    switch (choice.id) {
      case "answer":
        recordAnswer(choice.label);
        break;
      case "menu":
        exitLead();
        break;
      case "back":
        goBack();
        break;
      case "tryAgain":
        askStep(lead.index);
        break;
      case "useSame":
        collect({ ...lead, values: { ...lead.values, ...known } }, "Thanks.");
        break;
      case "changeDetails":
        setKnown(null);
        collect(lead);
        break;
      case "send":
        submitLead(lead.values);
        break;
      case "retrySend":
        submitLead(choice.values);
        break;
      case "edit":
        setLead({ ...lead, mode: "pickField" });
        say(
          { text: "What would you like to change?" },
          [...STEPS.filter((s) => !lead.locked.includes(s.key) || CONTACT_KEYS.includes(s.key)).map((s) => ({ id: "editField", label: s.label, key: s.key })), BACK]
        );
        break;
      case "editField": {
        const index = STEPS.findIndex((s) => s.key === choice.key);
        setLead({ ...lead, index, mode: "ask", editing: true });
        askStep(index);
        break;
      }
      case "services":
        setLead(null);
        showServices();
        break;
      case "work":
        showWork();
        break;
      case "experience":
        showExperience();
        break;
      case "faq":
        showFaqs();
        break;
      case "faqAnswer": {
        const faq = FAQS[choice.faq];
        say({ text: faq.answer }, [menuItem(faq.next), menuItem("faq"), MAIN]);
        break;
      }
      case "quote":
      case "hire":
        startLead(choice.id);
        break;
      case "quoteFor":
        startLead("quote", { service: choice.service });
        break;
      case "whatsapp":
        openWhatsapp();
        break;
      default:
        showMenu();
    }
  };

  const noteService = (service) => {
    setLead({ ...lead, values: { ...lead.values, service } });
    askStep(lead.index, `Got it, ${service} noted.`);
  };

  const handleLeadText = (value) => {
    const lower = value.toLowerCase();
    if (/^(main menu|menu|cancel|exit|stop|quit)$/.test(lower)) {
      exitLead("No problem. What would you like to do next?");
      return;
    }
    if (lower === "back") {
      goBack();
      return;
    }
    if (lead.mode !== "ask") {
      say({ text: "Please choose an option below." }, choices);
      return;
    }

    const service = detectService(value);
    if (step.key === "service") {
      const exact = step.options.find((o) => o.toLowerCase() === lower);
      if (exact || service) recordAnswer(exact || service);
      else say({ text: "Please choose a service below, or pick Other." }, stepChoices(step));
      return;
    }
    if (step.options) {
      const match = step.options.find((o) => o.toLowerCase() === lower || lower.includes(o.toLowerCase()));
      if (match) recordAnswer(match);
      else say({ text: "Please choose one of the options below." }, stepChoices(step));
      return;
    }
    if (step.key === "details") {
      recordAnswer(value);
      return;
    }
    if (step.valid) {
      if (step.valid(value)) recordAnswer(value);
      else if (service) noteService(service);
      else say({ text: step.error }, [TRY_AGAIN, menuItem("whatsapp"), BACK, MAIN]);
      return;
    }
    // Name question: a short service word is a service, anything else is the name.
    if (service && value.split(/\s+/).length <= 3) noteService(service);
    else recordAnswer(value);
  };

  const handleText = (value) => {
    const lower = value.toLowerCase();
    if (has(lower, /\b(hi|hello|hey|namaste)\b/) && lower.split(/\s+/).length <= 3) showMenu("Hello. How can I help you today?");
    else if (has(lower, /\b(thanks|thank you|thx|shukriya|dhanyavad)\b/)) showMenu("You're welcome. Anything else I can help with?");
    else if (has(lower, /\b(price|pricing|cost|costs|charge|charges|fee|fees|budget|quote|rate|rates|how much|kitna|kitne|kharcha)\b/)) startLead("quote", detectService(value) ? { service: detectService(value) } : {});
    else if (has(lower, /\b(hire|hiring|job|vacancy|role|full[- ]?time|part[- ]?time|freelance|freelancer)\b/)) startLead("hire");
    else if (has(lower, /\b(remote|on[- ]?site|hybrid|location|located|based|where)\b/)) say({ text: FAQS[2].answer }, [menuItem("hire"), MAIN]);
    else if (has(lower, /\b(resume|cv|experience|skill|skills|stack|tech)\b/)) showExperience();
    else if (has(lower, /\b(project|projects|portfolio|work|demo)\b/)) showWork();
    else if (has(lower, /\b(contact|call|phone|number|email|mail|whatsapp|linkedin|github)\b/) && !detectService(value)) showContact();
    else if (detectService(value)) showService(detectService(value));
    else if (has(lower, /\b(service|services|offer|provide)\b/)) showServices();
    else say({ text: "I didn't catch that. Choose an option below, or message Arjun on WhatsApp." }, MENU);
  };

  const sendDraft = (e) => {
    e.preventDefault();
    const value = draft.trim();
    if (!value || typing) return;
    addMine(value);
    setDraft("");
    if (lead) handleLeadText(value);
    else handleText(value);
  };

  const openFromService = (service) => {
    addMine(service);
    setLead(null);
    showService(service);
  };

  const askable = STEPS.filter((s) => !lead?.locked?.includes(s.key));
  const position = step && !lead.editing ? askable.findIndex((s) => s.key === step.key) + 1 : 0;
  const placeholder = step ? (step.options ? "Choose below or type" : "Type your answer") : "Type a message";

  return (
    <>
      {open && (
        <section
          aria-label={CHATBOT.name}
          className="swap fixed right-3 sm:right-5 bottom-[136px] shell:bottom-[88px] z-[35] flex flex-col w-[min(400px,calc(100vw-24px))] h-[min(620px,calc(100dvh-210px))] shell:h-[min(620px,calc(100dvh-120px))] rounded-[16px] border border-line bg-surface text-ink overflow-hidden shadow-[0_24px_60px_-20px_rgba(7,31,27,0.6)]"
        >
          <header className="on-shell flex items-center gap-3 px-4 h-[62px] shrink-0">
            <img src={PROFILE.avatar} alt="" width="36" height="36" className="w-9 h-9 rounded-full" />
            <div className="flex-1 min-w-0 leading-tight">
              <p className="font-semibold truncate">{CHATBOT.name}</p>
              <p className="flex items-center gap-1.5 text-[13px] text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4fd1a1]" aria-hidden="true" />
                Online
              </p>
            </div>
            <button type="button" onClick={reset} aria-label="Start over" className="grid place-items-center w-8 h-8 rounded-lg text-muted hover:text-ink">
              <RotateCcw size={16} />
            </button>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid place-items-center w-8 h-8 rounded-lg text-muted hover:text-ink">
              <X size={18} />
            </button>
          </header>

          {position > 0 && (
            <div className="px-4 py-2 border-b border-line shrink-0">
              <p className="text-[13px] text-muted">Step {position} of {askable.length}</p>
              <div className="mt-1 h-1 rounded-full bg-line overflow-hidden">
                <div className="h-full rounded-full bg-marigold transition-[width] duration-300" style={{ width: `${(position / askable.length) * 100}%` }} />
              </div>
            </div>
          )}

          <div ref={logRef} role="log" aria-live="polite" className="relative flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m) => (
              <Bubble key={m.id} message={m} onService={openFromService} />
            ))}
            {typing && (
              <div className="flex gap-1 px-3 py-3 w-fit rounded-[12px] bg-mist" role="status" aria-label="Typing">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            )}
            {!typing && choices.length > 0 && (
              <div className="swap flex flex-wrap gap-1.5 pt-1">
                {choices.map((c) => (
                  <button
                    key={`${c.id}-${c.label}`}
                    type="button"
                    onClick={() => choose(c)}
                    className="min-h-[36px] px-3 py-1.5 rounded-[9px] border border-line text-sm font-medium text-left hover:bg-marigold hover:border-marigold hover:text-[#10231e] transition-colors"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form noValidate onSubmit={sendDraft} className="flex items-end gap-2 p-2.5 border-t border-line shrink-0">
            {step?.multiline ? (
              <textarea
                ref={inputRef}
                rows={2}
                maxLength={3000}
                value={draft}
                placeholder={placeholder}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  // Enter sends. Shift + Enter starts a new line.
                  if (e.key === "Enter" && !e.shiftKey) sendDraft(e);
                }}
                aria-label={step.ask}
                className="field !min-h-[44px] resize-none"
              />
            ) : (
              <input
                ref={inputRef}
                type="text"
                inputMode={step?.kind === "tel" ? "tel" : step?.kind === "email" ? "email" : "text"}
                autoComplete={step?.autoComplete || "off"}
                value={draft}
                placeholder={placeholder}
                onChange={(e) => setDraft(e.target.value)}
                aria-label={step ? step.ask : "Type a message"}
                className="field"
              />
            )}
            <button type="submit" aria-label="Send message" className="grid place-items-center w-11 h-11 shrink-0 rounded-lg bg-marigold text-[#10231e]">
              <Send size={17} />
            </button>
          </form>
        </section>
      )}

      {teaser && !open && (
        <div className="swap hidden sm:flex fixed right-5 bottom-[84px] z-[35] items-center gap-2 rounded-[12px] border border-line bg-surface text-ink pl-3 pr-1.5 py-1.5 text-sm shadow-[0_12px_28px_-12px_rgba(7,31,27,0.6)]">
          <button type="button" onClick={() => setOpen(true)} className="font-medium">
            Have a question? Ask me.
          </button>
          <button type="button" onClick={() => setTeaser(false)} aria-label="Dismiss" className="grid place-items-center w-6 h-6 text-muted hover:text-ink">
            <X size={14} />
          </button>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed right-3 sm:right-5 bottom-[72px] shell:bottom-5 z-[35] grid place-items-center w-14 h-14 rounded-full bg-marigold text-[#10231e] shadow-[0_12px_28px_-10px_rgba(7,31,27,0.7)] hover:bg-[#ffc34d] transition-colors"
      >
        {open ? <X size={23} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}
