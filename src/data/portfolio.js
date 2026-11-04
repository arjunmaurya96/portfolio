// All the text on the site lives here. Edit this file to update your portfolio.
import lms from "../assets/img/lms.webp";
import electro from "../assets/img/ecommerce.webp";
import textsmash from "../assets/img/landingpage.webp";
import cloudgateway from "../assets/img/cloudgateway.webp";
import sdgm from "../assets/img/sdgm.webp";
import nextping from "../assets/img/nextping.webp";
import ntlogix from "../assets/img/ntlogix-img.webp";
import portrait from "../assets/img/arjun-portrait.webp";
import avatar from "../assets/img/arjun-avatar.webp";

export const PROFILE = {
  name: "Arjun Maurya",
  role: "MERN full stack developer",
  location: "Gurugram, India",
  experience: "1.5+ years",
  email: "dev.arjunmaurya@gmail.com",
  resume: "/Arjun_maurya.pdf",
  available: true,
  portrait,
  avatar,
};

export const SOCIALS = [
  { name: "GitHub", href: "https://github.com/arjunmaurya96" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/arjun-maurya-8365a3280/" },
  { name: "Instagram", href: "https://www.instagram.com/arjun_high_level_programmer?igsh=MXFvdmVvdmh5bnR4aA==" },
  { name: "YouTube", href: "https://www.youtube.com/@Coderlifeblogs" },
];

// Names shown in the "Built for" row on the first screen.
export const CLIENTS = ["Sequence Cloud Gateway", "SDGM Tech", "NextPing, Dubai", "NT Logix", "TextSmashZone"];

// category: "fullstack" or "frontend". Leave github as "" until the repo is public.
export const PROJECTS = [
  {
    id: "lms",
    title: "Learning Management System",
    tab: "LMS",
    category: "fullstack",
    image: lms,
    blurb: "Courses, video lectures, progress tracking and payments for students and instructors.",
    desc: "A full-stack Learning Management System where students can enroll in courses, watch lectures and track progress, and instructors can create and manage courses. Includes secure authentication, payment integration and a responsive dashboard.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "JWT", "Cloudinary", "Razorpay/Stripe"],
    highlights: ["Student and instructor dashboards", "Course enrollment system", "Video lecture management", "Secure authentication", "Payment integration", "Fully responsive UI"],
    github: "",
    demo: "https://lms-1-klgy.onrender.com/",
  },
  {
    id: "electro",
    title: "Electro E-Commerce",
    tab: "Electro",
    category: "fullstack",
    image: electro,
    blurb: "An online store with cart, orders, role-based login and an admin dashboard.",
    desc: "A full-stack MERN e-commerce application with role-based authentication. Users browse products, manage their cart, place orders and track purchases, while admins manage users, products, orders and platform activity from a dedicated dashboard.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Context API", "JWT", "Razorpay", "Cloudinary"],
    highlights: ["User dashboard", "Admin dashboard", "Role-based authentication", "Order management"],
    github: "",
    demo: "https://mern-ecommerce-1-0mb5.onrender.com/",
  },
  {
    id: "textsmashzone",
    title: "TextSmashZone",
    tab: "TextSmashZone",
    category: "frontend",
    image: textsmash,
    blurb: "Marketing site for a business messaging platform, with pricing and lead forms.",
    desc: "A modern CPaaS and business messaging website with a highly responsive UI, smooth animations, service showcase sections, pricing plans and lead generation forms. Built with a focus on performance, responsiveness and conversion.",
    tech: ["React.js", "JavaScript", "Bootstrap", "CSS3", "HTML5", "Axios"],
    highlights: ["Responsive UI design", "Lead generation forms", "Modern landing pages", "Service showcase sections", "Pricing modules", "Performance optimization"],
    github: "",
    demo: "https://textsmashzone.online/",
  },
  {
    id: "cloudgateway",
    title: "Cloud Gateway Website",
    tab: "Cloud Gateway",
    category: "frontend",
    image: cloudgateway,
    blurb: "Company website built for search rankings and fast page loads.",
    desc: "A modern business website for Cloud Gateway built with React.js and Tailwind CSS, with a strong focus on SEO, fast page loading, responsive design and a better experience across all devices.",
    tech: ["React.js", "Tailwind CSS", "JavaScript", "SEO", "Performance"],
    highlights: ["SEO optimized", "Fast loading pages", "Responsive design", "Modern UI/UX"],
    github: "",
    demo: "https://cloudgateway.in/",
  },
  {
    id: "sdgm",
    title: "SDGM Tech Business Website",
    tab: "SDGM Tech",
    category: "frontend",
    image: sdgm,
    blurb: "Business website with service pages and responsive layouts.",
    desc: "A modern business website for SDGM Tech built with React.js. Includes responsive layouts, engaging UI sections and service pages, optimized to deliver a smooth experience across all devices.",
    tech: ["React.js", "Tailwind CSS", "JavaScript"],
    highlights: ["Modern business website", "Fully responsive design", "Performance optimized", "Professional user experience"],
    github: "",
    demo: "https://sdgmtech.in/",
  },
  {
    id: "nextping",
    title: "NextPing Business Website",
    tab: "NextPing",
    category: "frontend",
    image: nextping,
    blurb: "Responsive business website for a Dubai-based company.",
    desc: "A fully responsive business website for a Dubai-based company, built with React.js and Bootstrap. Includes modern UI sections and layouts optimized for all devices, with smooth performance throughout.",
    tech: ["React.js", "Bootstrap", "JavaScript"],
    highlights: ["Dubai client project", "Fully responsive", "Modern UI design", "Cross-browser compatibility"],
    github: "",
    demo: "https://nextping.ae/",
  },
  {
    id: "ntlogix",
    title: "NT Logix Company Website",
    tab: "NT Logix",
    category: "frontend",
    image: ntlogix,
    blurb: "Company website with service pages and contact forms.",
    desc: "A responsive business website for NT Logix built with HTML, CSS, Bootstrap and JavaScript. Includes modern UI sections, service pages, contact forms and layouts that work across all devices.",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    highlights: ["Responsive design", "Business website", "Modern UI", "Cross-browser support"],
    github: "",
    demo: "https://www.ntlogix.in/",
  },
];

// Live projects without a screenshot yet. Add one to PROJECTS when you have it.
export const MORE_PROJECTS = [
  { title: "SDGM CRM", note: "Leads management system", url: "https://sdgmcrm.vercel.app/login" },
  { title: "RCS Brand Rise", note: "rcsbrandrise.com", url: "https://rcsbrandrise.com/" },
  { title: "Travel Packages Website", note: "packageslifevistatravels.com", url: "https://packageslifevistatravels.com/" },
];

export const SERVICES = [
  {
    icon: "website",
    name: "Business website",
    summary: "A fast site that explains your business and brings in enquiries.",
    points: ["Responsive React pages", "Service pages and lead forms", "Hosting and launch"],
    examples: "Cloud Gateway, SDGM Tech, NextPing",
    cta: "Discuss a website",
  },
  {
    icon: "webapp",
    name: "Web app",
    summary: "A complete MERN product, from the database to the dashboard.",
    points: ["REST APIs with Node.js and Express", "Login, roles and dashboards", "Payments, uploads and deployment"],
    examples: "LMS, Electro E-Commerce",
    cta: "Discuss a web app",
  },
  {
    icon: "mobile",
    name: "Mobile app",
    summary: "An Android and iOS app connected to your business.",
    points: ["App screens and navigation", "Login and notifications", "API and backend integration"],
    cta: "Discuss a mobile app",
  },
  {
    icon: "crm",
    name: "CRM system",
    summary: "One place to track leads, follow-ups and your sales team.",
    points: ["Lead capture and assignment", "Follow-ups and sales pipeline", "Reports and user roles"],
    examples: "SDGM CRM",
    cta: "Discuss a CRM",
  },
  {
    icon: "hrms",
    name: "HRMS system",
    summary: "Manage employees, attendance, leave and payroll together.",
    points: ["Employee records", "Attendance and leave", "Payroll and HR reports"],
    cta: "Discuss an HRMS",
  },
  {
    icon: "seo",
    name: "SEO",
    summary: "Help your website show up on Google and load faster.",
    points: ["On-page SEO and meta tags", "Page speed improvements", "Google Business Profile updates"],
    examples: "Cloud Gateway",
    cta: "Discuss SEO",
  },
  {
    icon: "posts",
    name: "Social media post design",
    summary: "Posts that keep your brand active and consistent.",
    points: ["Instagram and Facebook posts", "Festival and offer creatives", "Monthly content calendars"],
    cta: "Discuss post design",
  },
  {
    icon: "uiux",
    name: "UI/UX design",
    summary: "Clear screens planned before the code starts.",
    points: ["Wireframes and page layouts", "Landing page design", "Phone and desktop views"],
    examples: "Nickicon",
    cta: "Discuss UI/UX",
  },
];

// Each chatbot fills the contact form with its own name.
export const CHATBOTS = [
  { icon: "whatsapp", name: "WhatsApp chatbot", summary: "Replies to customers on WhatsApp and captures their details." },
  { icon: "website", name: "Website chatbot", summary: "Greets visitors, answers questions and collects enquiries." },
  { icon: "ecommerce", name: "E-commerce chatbot", summary: "Helps shoppers find products and check their orders." },
  { icon: "support", name: "Customer support chatbot", summary: "Handles common questions and passes the rest to your team." },
  { icon: "leads", name: "Lead generation chatbot", summary: "Qualifies new leads and sends them to your sales team." },
  { icon: "ai", name: "AI chatbot", summary: "Answers in natural language from your business information." },
];

export const INTEGRATIONS = [
  { icon: "api", name: "API integration", summary: "Connect your website or app to any third-party service. Used in LMS and Nestfin." },
  { icon: "whatsapp", name: "WhatsApp API integration", summary: "Send messages and alerts from your own systems through the WhatsApp Business API." },
  { icon: "sheets", name: "Google Sheets integration", summary: "Send website leads and form data straight to your Google Sheet." },
  { icon: "payment", name: "Payment gateway integration", summary: "Take online payments with Razorpay or Stripe. Used in LMS and Electro." },
];

// The band under the services grid. Clicking an option fills the contact form.
export const WORK_MODES = {
  title: "Work with me the way that suits you",
  summary: "Tell me how you want to work and I'll fit in. Pick an option to start.",
  groups: [
    { label: "How we work", options: ["Full-time", "Part-time", "Freelance", "Contract", "Project-based", "Monthly retainer"] },
    { label: "Where I work", options: ["Remote", "On-site", "Hybrid"] },
  ],
};

// Paste your Google Apps Script Web app URL here. See google-apps-script/Code.gs.
export const SHEET_URL = "https://script.google.com/macros/s/AKfycbz6Lp6JoXTATLTDZbPJvYTxnreJX4XFbFHCFonn8mdUxaQvBMOji-lM-bEN-Z62mDrk/exec";

const WORK_TYPES = WORK_MODES.groups.flatMap((g) => g.options);

export const LEAD_FORM = {
  serviceGroups: [
    { label: "Services", options: SERVICES.map((s) => s.name) },
    { label: "Chatbots", options: CHATBOTS.map((c) => c.name) },
    { label: "Integrations", options: INTEGRATIONS.map((i) => i.name) },
    { label: "Something else", options: ["Other"] },
  ],
  workTypes: WORK_TYPES,
  timelines: ["Urgent", "Within 1 month", "1 to 3 months", "Flexible"],
  budgets: ["Not sure yet", "Under ₹10,000", "₹10,000 to ₹25,000", "₹25,000 to ₹50,000", "₹50,000 to ₹1 lakh", "Above ₹1 lakh"],
};

// tier 1 = daily driver, 2 = comfortable, 3 = learning
export const SKILL_TIERS = { 1: "Daily driver", 2: "Comfortable", 3: "Learning" };

export const SKILLS = {
  Frontend: [
    { name: "React.js", tier: 1 },
    { name: "HTML5 / CSS3", tier: 1 },
    { name: "Redux / Context", tier: 2 },
    { name: "Tailwind CSS", tier: 2 },
    { name: "TypeScript (basic)", tier: 3 },
    { name: "Next.js", tier: 3 },
  ],
  Backend: [
    { name: "Node.js", tier: 1 },
    { name: "Express.js", tier: 1 },
    { name: "REST APIs", tier: 1 },
    { name: "JWT / Auth", tier: 1 },
    { name: "Cloudinary", tier: 2 },
    { name: "Socket.io", tier: 2 },
    { name: "WhatsApp Business API", tier: 2 },
    { name: "Google Sheets API", tier: 2 },
  ],
  Database: [
    { name: "MongoDB", tier: 1 },
    { name: "Mongoose ODM", tier: 1 },
    { name: "MySQL", tier: 2 },
    { name: "Firebase", tier: 2 },
  ],
  "Tools and hosting": [
    { name: "Git / GitHub", tier: 1 },
    { name: "VS Code", tier: 1 },
    { name: "Postman", tier: 1 },
    { name: "Vercel / Netlify", tier: 1 },
    { name: "AWS (EC2, S3)", tier: 3 },
  ],
};

export const EXPERIENCES = [
  {
    company: "Sequence Cloud Gateway Pvt Ltd",
    role: "Web Developer",
    period: "Oct 2025 to present",
    type: "Full-time",
    current: true,
    achievements: [
      "Develop and maintain React.js frontend features for a CPaaS and WhatsApp Business API platform",
      "Integrate REST APIs to connect frontend interfaces with backend services",
      "Build scalable, maintainable web application components with the development team",
      "Manage company-wide React projects and deliver production-ready releases",
    ],
    tech: ["React.js", "JavaScript", "Bootstrap", "Responsive design", "UI/UX", "Performance"],
  },
  {
    company: "Bizclock Pvt. Ltd.",
    role: "MERN Stack Developer",
    period: "2025, 6 months",
    type: "Full-time",
    achievements: [
      "Integrated APIs for two production projects, Nestfin and LMS",
      "Worked as a full stack developer with a focus on React.js and Context API",
      "Improved existing UI components for better user experience and responsiveness",
      "Built reusable React components to speed up development",
      "Worked on API development and backend functionality when required",
      "Collaborated with team members to optimize application performance",
      "Fixed bugs and enhanced overall application functionality",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Bootstrap"],
  },
  {
    company: "Nickicon Pvt Ltd",
    role: "UI/UX Designer and MERN Stack Intern",
    period: "3 months",
    type: "Internship",
    achievements: [
      "Completed internship focused on MERN stack development",
      "Designed and developed small-scale web pages",
      "Improved the company website interface",
      "Built responsive layouts",
      "Integrated frontend with backend APIs",
      "Optimized user experience",
    ],
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "UI/UX"],
  },
  {
    company: "Ducat Institute",
    role: "MERN Stack Development Intern",
    period: "6 months",
    type: "Internship",
    achievements: [
      "Completed a 6 month intensive MERN stack training program",
      "Built full-stack web applications using React.js, Node.js, Express.js and MongoDB",
      "Learned REST API development and database integration",
      "Worked on authentication systems using JWT",
      "Built responsive frontend interfaces and backend integrations",
      "Created multiple practice projects to strengthen full stack skills",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript", "REST APIs"],
  },
  {
    company: "Softpro India Pvt. Ltd.",
    role: "Summer Training",
    period: "45 days",
    type: "Training",
    achievements: ["Completed 45 days of summer training in web development fundamentals"],
    tech: [],
  },
];

export const ABOUT = [
  "I love turning complex requirements into clean, maintainable code. Most of my work sits in React, and I'm just as comfortable going down into the Node.js API and the MongoDB schema underneath it.",
  "Right now I build React features for a CPaaS and WhatsApp Business API platform at Sequence Cloud Gateway, and I look after the company's web projects from the first layout to the production release.",
];

export const EDUCATION = [
  { degree: "Diploma in Computer Science", place: "Mahatma Jyotiba Phule Government Polytechnic, Kaushambi", year: "2020 to 2023", grade: "71%" },
  { degree: "12th (PCM)", place: "BLSS Convent Inter College, Prayagraj", year: "2020", grade: "60%" },
  { degree: "10th", place: "K.V.M Inter College, Prayagraj", year: "2017", grade: "81%" },
];

// Add real quotes here and a section appears on the site automatically.
// { name: "Client name", role: "Role, Company", text: "What they said." }
export const TESTIMONIALS = [];

export const hostOf = (url) => new URL(url).hostname.replace(/^www\./, "");
export const categoryLabel = { fullstack: "Full stack", frontend: "Frontend" };
export const SKILL_COUNT = Object.values(SKILLS).flat().length;

export const NAV = [
  { id: "overview", label: "Overview" },
  { id: "work", label: "Work", count: PROJECTS.length + MORE_PROJECTS.length },
  { id: "services", label: "Services" },
  { id: "stack", label: "Stack", count: SKILL_COUNT },
  { id: "experience", label: "Experience", count: EXPERIENCES.length },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
