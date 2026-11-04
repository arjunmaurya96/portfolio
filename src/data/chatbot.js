// Everything the chatbot says lives here.
export const CHATBOT = {
  name: "Arjun's Assistant",
  whatsappNumber: "919621192312", // Country code + number, no + or spaces.
  whatsappDisplay: "+91 96211 92312",
  whatsappText: "Hi Arjun, I found you through your portfolio.",
  greeting: "Hi, I'm Arjun's assistant. Choose an option or type your question.",
};

export const MENU = [
  { id: "services", label: "View services" },
  { id: "work", label: "See my work" },
  { id: "experience", label: "Experience and skills" },
  { id: "faq", label: "Common questions" },
  { id: "quote", label: "Get a quote" },
  { id: "hire", label: "Hire me" },
  { id: "whatsapp", label: "Talk on WhatsApp" },
];

export const FAQS = [
  {
    question: "How much does a project cost?",
    answer: "It depends on the features and timeline. Share your requirement and Arjun will send you a quote.",
    next: "quote",
  },
  {
    question: "Which types of work do you accept?",
    answer: "Full-time, part-time, freelance, contract, project-based and monthly retainer work.",
    next: "hire",
  },
  {
    question: "Do you work remotely?",
    answer: "Yes. Arjun works remotely, on-site or in a hybrid setup, and he is based in Gurugram.",
    next: "hire",
  },
  {
    question: "How quickly will I get a reply?",
    answer: "Arjun replies on WhatsApp or email within 24 hours.",
    next: "whatsapp",
  },
];

// Words a visitor might type for each service, most specific first.
export const SERVICE_WORDS = [
  ["WhatsApp API integration", ["whatsapp api", "whatsapp business api"]],
  ["WhatsApp chatbot", ["whatsapp chatbot", "whatsapp bot"]],
  ["Website chatbot", ["website chatbot", "website bot", "site chatbot"]],
  ["E-commerce chatbot", ["e-commerce chatbot", "ecommerce chatbot", "ecommerce bot", "shop chatbot", "store chatbot"]],
  ["Customer support chatbot", ["customer support chatbot", "support chatbot", "support bot"]],
  ["Lead generation chatbot", ["lead generation chatbot", "lead chatbot", "lead bot"]],
  ["AI chatbot", ["ai chatbot", "ai bot"]],
  ["Chatbot", ["chatbot", "chat bot"]],
  ["Google Sheets integration", ["google sheet", "google sheets", "sheet integration", "sheets integration"]],
  ["Payment gateway integration", ["payment gateway", "payment integration", "razorpay", "stripe"]],
  ["API integration", ["api integration", "api"]],
  ["Social media post design", ["post design", "social media", "instagram post", "facebook post", "posts"]],
  ["UI/UX design", ["ui/ux", "uiux", "ui ux", "ux design", "ui design"]],
  ["CRM system", ["crm"]],
  ["HRMS system", ["hrms", "payroll"]],
  ["SEO", ["seo", "google ranking", "search ranking"]],
  ["Mobile app", ["mobile app", "android app", "ios app", "android", "ios"]],
  ["Web app", ["web app", "webapp", "web application", "web development", "web developement", "mern app"]],
  ["Business website", ["business website", "website", "landing page"]],
];
