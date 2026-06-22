import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import resume from '../public/Arjun_maurya.pdf'
import ntlogx from '../src/assets/img/ntlogix-img.webp'
import lms from '../src/assets/img/lms.webp'
// import ecommerce '../src/assets/img/ecommerce.jpg'
import cloudgateway from '../src/assets/img/cloudgateway.webp'
import nextping from '../src/assets/img/nextping.webp'
import ecomm from '../src/assets/img/ecommerce.jpg'
import landingpage from '../src/assets/img/landingpage.jpg'
import sdgmtech from '../src/assets/img/sdgm.jpg'
// ═══════════════════════════════════════════════
// THEME & DATA CONFIGURATION
// ═══════════════════════════════════════════════
const THEMES = {
  orange: { name: "Orange", primary: "#f97316", hover: "#ea580c", glow: "rgba(249,115,22,0.25)", ring: "rgba(249,115,22,0.4)" },
  blue: { name: "Blue", primary: "#3b82f6", hover: "#2563eb", glow: "rgba(59,130,246,0.25)", ring: "rgba(59,130,246,0.4)" },
  purple: { name: "Purple", primary: "#a855f7", hover: "#9333ea", glow: "rgba(168,85,247,0.25)", ring: "rgba(168,85,247,0.4)" },
  green: { name: "Green", primary: "#22c55e", hover: "#16a34a", glow: "rgba(34,197,94,0.25)", ring: "rgba(34,197,94,0.4)" },
  red: { name: "Red", primary: "#ef4444", hover: "#dc2626", glow: "rgba(239,68,68,0.25)", ring: "rgba(239,68,68,0.4)" },
  black: { name: "Black", primary: "#94a3b8", hover: "#64748b", glow: "rgba(148,163,184,0.25)", ring: "rgba(148,163,184,0.4)" },
  gradient: { name: "Gradient", primary: "#8b5cf6", hover: "#7c3aed", glow: "rgba(139,92,246,0.25)", ring: "rgba(139,92,246,0.4)", isGradient: true },
};

const SKILLS = {
  Frontend: [
    { name: "React.js", level: 95 }, { name: "Next.js", level: 50 },
    { name: "TypeScript(Basic)", level: 85 }, { name: "Tailwind CSS", level: 70 },
    { name: "Redux / Context", level: 82 }, { name: "HTML5 / CSS3", level: 97 },
  ],
  Backend: [
    { name: "Node.js", level: 93 }, { name: "Express.js", level: 91 },
    { name: "REST APIs", level: 94 }, { name: "Cloudinary Integration", level: 83 },
    { name: "Socket.io", level: 80 }, { name: "JWT / Auth", level: 88 },
  ],
  Database: [
    { name: "MongoDB", level: 92 },
    { name: "MySQL", level: 82 },
    { name: "Firebase", level: 78 }, { name: "Mongoose ODM", level: 90 },
  ],
  "Tools & DevOps": [
    { name: "Git / GitHub", level: 95 },
    { name: "AWS (EC2/S3)", level: 30 }, { name: "Vercel / Netlify", level: 90 },
    { name: "VS Code", level: 97 }, { name: "Postman", level: 92 },
  ],
};

const EXPERIENCES = [
  {
    company: "Sequence Cloud Gateway Pvt Ltd",
    role: "Web Developer",
    period: "2026 - Present",
    location: "India",
    type: "Full-time",
    color: "blue",
    achievements: [
      "Managing and developing company-wide React JS projects",
      "Built modern and responsive UI/UX interfaces for web applications",
      "Created scalable frontend architecture for multiple projects",
      "Optimized application performance for better user experience",
      "Handled project ownership and delivered production-ready solutions"
    ],
    tech: [
      "React.js",
      "JavaScript",
      "Bootstrap",
      "Responsive Design",
      "UI/UX",
      "Performance Optimization"
    ],
  },
  {
    company: "Bizclock Pvt. Ltd. Company",
    role: "Full Stack Developer",
    period: "2025",
    location: "India",
    type: "Full-time",
    color: "purple",
    achievements: [
      "Integrated backend APIs into frontend applications for seamless data flow",
      "Improved existing UI components for better user experience and responsiveness",
      "Built reusable React components to speed up development",
      "Worked on API development and backend functionality when required",
      "Collaborated with team members to optimize application performance",
      "Fixed bugs and enhanced overall application functionality"
    ],
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Bootstrap"
    ],
  },
  {
    company: "Nickicon Pvt Ltd",
    role: "UI/UX Designer & MERN Stack Intern",
    period: "3 Months Internship",
    location: "India",
    type: "Internship",
    color: "green",
    achievements: [
      "Completed internship focused on MERN Stack development",
      "Designed and developed small-scale web pages",
      "Improved company website interface",
      "Built responsive layouts",
      "Integrated frontend with backend APIs",
      "Optimized user experience"
    ],
    tech: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Express.js",
      "UI/UX",
      "Responsive Design"
    ],
  },
  {
    company: "Ducat Institute",
    role: "MERN Stack Trainee",
    period: "6 Months Training",
    location: "India",
    type: "Training Program",
    color: "orange",
    achievements: [
      "Completed 6 months intensive MERN Stack training program",
      "Built full-stack web applications using React.js, Node.js, Express.js, and MongoDB",
      "Learned REST API development and database integration",
      "Worked on authentication systems using JWT",
      "Built responsive frontend interfaces and backend integrations",
      "Created multiple practice projects to strengthen full stack development skills"
    ],
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "REST APIs"
    ],
  },
];

// const EXPERIENCES = [
//   {
//     company: "TechCorp Solutions", role: "Senior MERN Stack Developer",
//     period: "Jan 2022 – Present", location: "Remote (India)", type: "Full-time",
//     color: "blue",
//     achievements: [
//       "Architected 3 large-scale SaaS applications serving 50,000+ monthly active users",
//       "Reduced API response time by 40% via Redis caching and query optimization",
//       "Led a team of 5 developers using Agile/Scrum — delivered 100% of sprints on time",
//       "Implemented CI/CD pipelines (GitHub Actions + Docker) cutting deploy time by 60%",
//     ],
//     tech: ["React", "Node.js", "MongoDB", "AWS", "Docker", "Redis"],
//   },
//   {
//     company: "Digital Pixel Agency", role: "Full Stack Developer",
//     period: "Mar 2020 – Dec 2021", location: "Hybrid (India)", type: "Full-time",
//     color: "purple",
//     achievements: [
//       "Delivered 15+ client web applications from wireframe to production",
//       "Built real-time chat platform with Socket.io handling 10,000+ concurrent users",
//       "Integrated Stripe & Razorpay payment gateways for multiple e-commerce platforms",
//       "Boosted Core Web Vitals scores by 55% through code splitting and lazy loading",
//     ],
//     tech: ["React", "Express", "MongoDB", "Socket.io", "Stripe", "Razorpay"],
//   },
//   {
//     company: "StartupNest", role: "Junior Full Stack Developer",
//     period: "Jun 2019 – Feb 2020", location: "On-site (India)", type: "Full-time",
//     color: "green",
//     achievements: [
//       "Built RESTful APIs powering iOS/Android and web clients simultaneously",
//       "Developed 30+ reusable React components used across 5 different products",
//       "Optimized MongoDB schema design reducing query complexity by 35%",
//       "Maintained 95% unit test coverage across all Node.js services",
//     ],
//     tech: ["React", "Node.js", "MongoDB", "Bootstrap", "Jest", "REST APIs"],
//   },
// ];

const PROJECTS = [
  {
    id: 1,
    title: "Learning Management System (LMS)",
    category: "fullstack",
    featured: true,
    image: lms,
    desc: "A full-stack Learning Management System where students can enroll in courses, watch lectures, track progress, and instructors can create/manage courses. Includes secure authentication, payment integration, and responsive dashboard.",

    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux Toolkit",
      "JWT",
      "Cloudinary",
      "Razorpay/Stripe"
    ],

    achievements: [
      "Student & Instructor dashboards",
      "Course enrollment system",
      "Video lecture management",
      "Secure authentication",
      "Payment integration",
      "Fully responsive UI"
    ],

    github: "#",
    demo: "https://lms-1-klgy.onrender.com/",
  },
  // {
  //   id: 1, title: "DevConnect Platform", category: "fullstack", featured: true,
  //   desc: "A developer networking platform with real-time chat, job postings, code snippet sharing, and portfolio showcase. Supports 50,000+ registered users with live messaging.",
  //   tech: ["React", "Node.js", "MongoDB", "Socket.io", "Redis", "AWS S3", "JWT"],
  //   achievements: ["50K+ users", "Real-time messaging", "Code snippet sharing", "Job board"],
  //   github: "#", demo: "#",
  // },
  // {
  //   id: 2,
  //   title: "ShopEase E-Commerce",
  //   category: "fullstack",
  //   featured: true,

  //   desc: "Developed a full-stack MERN e-commerce application with role-based authentication where users can browse products, manage cart, place orders, and track purchases, while admins can manage users, products, orders, and platform activities through a dedicated admin dashboard.",

  //   tech: [
  //     "MongoDB",
  //     "Express.js",
  //     "React.js",
  //     "Node.js",
  //     "Context API",
  //     "JWT",
  //     "Razorpay",
  //     "Cloudinary"
  //   ],

  //   achievements: [
  //     "User Dashboard",
  //     "Admin Dashboard",
  //     "Role-Based Authentication",
  //     "Order Management"
  //   ],

  //   github: "#",
  //   demo: "#",
  // },


  {
    id: 2,
    title: "Electro E-Commerce",
    category: "fullstack",
    featured: true,

    image: ecomm,

    desc: "Developed a full-stack MERN e-commerce application with role-based authentication where users can browse products, manage cart, place orders, and track purchases, while admins can manage users, products, orders, and platform activities through a dedicated admin dashboard.",

    tech: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Context API",
      "JWT",
      "Razorpay",
      "Cloudinary"
    ],

    achievements: [
      "User Dashboard",
      "Admin Dashboard",
      "Role-Based Authentication",
      "Order Management"
    ],

    github: "#",
    demo: "https://mern-ecommerce-1-0mb5.onrender.com/",
  },

  {
    id: 3,
    title: "TextSmashZone",
    category: "frontend",
    featured: true,

    image: landingpage,

    desc: "Designed and developed a modern CPaaS and business messaging platform website with a highly responsive UI, smooth animations, service showcase sections, pricing plans, lead generation forms, and optimized user experience. Built using React.js, Bootstrap, and custom CSS with a focus on performance, responsiveness, and conversion-driven design.",

    tech: [
      "React.js",
      "JavaScript",
      "Bootstrap",
      "CSS3",
      "HTML5",
      "Axios",
      "Responsive Design"
    ],

    achievements: [
      "Responsive UI Design",
      "Lead Generation Forms",
      "Modern Landing Pages",
      "Service Showcase Sections",
      "Pricing Modules",
      "Performance Optimization"
    ],

    github: "#",
    demo: "https://textsmashzone.online/"
  },
  {
    id: 4,
    title: "NT Logix Company Website",
    category: "frontend",
    featured: false,
    image: ntlogx,
    desc: "Developed a responsive business website for NT Logix using HTML, CSS, Bootstrap, and JavaScript. Built modern UI sections, service pages, contact forms, responsive layouts, and optimized the website for better user experience across all devices.",

    tech: [
      "HTML",
      "CSS",
      "Bootstrap",
      "JavaScript"
    ],

    achievements: [
      "Responsive Design",
      "Business Website",
      "Modern UI",
      "Cross Browser Support"
    ],

    github: "#",
    demo: "https://www.ntlogix.in/",


  },
  {
    id: 5,
    title: "Cloud Gateway Website",
    category: "frontend",
    featured: false,

    desc: "Developed a modern business website for Cloud Gateway using React.js and Tailwind CSS with a strong focus on SEO optimization, fast page loading, responsive design, and improved user experience across all devices.",

    tech: [
      "React.js",
      "Tailwind CSS",
      "JavaScript",
      "SEO Optimization",
      "Performance Optimization"
    ],
    achievements: [
      "SEO Optimized",
      "Fast Loading Pages",
      "Responsive Design",
      "Modern UI/UX"
    ],
    github: "#",
    demo: "https://cloudgateway.in/",
    image: cloudgateway
  },

  {
  id: 7,
  title: "SDGM Tech Business Website",
  category: "frontend",
  featured: true,
  desc: "Designed and developed a modern business website for SDGM Tech using React.js. Created responsive layouts, engaging UI sections, service pages, and optimized performance to deliver a seamless user experience across all devices.",
  tech: [
    "React.js",
    "Tailwind CSS",
    "JavaScript",
    "Responsive Design"
  ],

  achievements: [
    "Modern Business Website",
    "Fully Responsive Design",
    "Performance Optimized",
    "Professional User Experience"
  ],

  github: "#",
  demo: "https://sdgmtech.in/",
  image: sdgmtech
},

  {
    id: 6,
    title: "NextPing Business Website",
    category: "frontend",
    featured: false,
    desc: "Built a fully responsive business website for a Dubai-based company using React.js and Bootstrap. Developed modern UI sections, optimized layouts for all devices, and ensured smooth performance with a user-friendly experience.",
    tech: [
      "React.js",
      "Bootstrap",
      "JavaScript",
      "Responsive Design"
    ],

    achievements: [
      "Dubai Client Project",
      "Fully Responsive",
      "Modern UI Design",
      "Cross Browser Compatibility"
    ],

    github: "#",
    demo: "https://nextping.ae/",
    image: nextping
  }

];

const TESTIMONIALS = [
  {
    name: "Rahul Sharma", role: "CTO, TechCorp Solutions", initials: "RS",
    text: "Arjun is one of the most talented full-stack developers I've worked with. His ability to architect scalable solutions and consistently deliver high-quality code is exceptional. He transformed our entire backend infrastructure.",
  },
  {
    name: "Priya Mehta", role: "Product Manager, Digital Pixel Agency", initials: "PM",
    text: "Working with Arjun was a game-changer for our agency. He doesn't just write code — he thinks deeply about UX, performance, and scalability. Every client loved what he built. He raised the bar for our entire team.",
  },
  {
    name: "Alex Johnson", role: "Founder, StartupNest", initials: "AJ",
    text: "Arjun has an incredible command of the entire MERN stack. He built our core platform from scratch and it has been running flawlessly for years with minimal maintenance. I'd hire him again in a heartbeat.",
  },
];

const CERTS = [
  { name: "Meta Front-End Developer", issuer: "Meta (Facebook)", year: "2023", icon: "🏆" },
  { name: "Node.js Application Developer", issuer: "OpenJS Foundation", year: "2022", icon: "🎓" },
  { name: "MongoDB Associate Developer", issuer: "MongoDB University", year: "2022", icon: "📜" },
  { name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2023", icon: "☁️" },
  { name: "React Developer Certificate", issuer: "Scrimba", year: "2021", icon: "⚛️" },
  { name: "JavaScript Algorithms & DS", issuer: "freeCodeCamp", year: "2020", icon: "💻" },
];

const EDUCATION = [
  { degree: "Diploma in Computer Science", institution: "Government Polytechnic Institute", year: "2020–2023", grade: "71%", icon: "🎓" },
  { degree: "12th (PCM)", institution: "State Board", year: "2019–2020", grade: "60%", icon: "📚" },
  { degree: "10th", institution: "State Board", year: "2016–2017", grade: "81%", icon: "🏫" },
];

const SOCIALS = [
  { name: "GitHub", href: "https://github.com/arjunmaurya96", label: "https://github.com/arjunmaurya96" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/arjun-maurya-8365a3280/", label: "https://www.linkedin.com/in/arjun-maurya-8365a3280/" },
  { name: "Instagram", href: "https://www.instagram.com/arjun_high_level_programmer?igsh=MXFvdmVvdmh5bnR4aA==", label: "https://www.instagram.com/arjun_high_level_programmer?igsh=MXFvdmVvdmh5bnR4aA==" },
  { name: "YouTube", href: "https://www.youtube.com/@Coderlifeblogs", label: "https://www.youtube.com/@Coderlifeblogs" },
];

// ═══════════════════════════════════════════════
// SECTION TITLE COMPONENT
// ═══════════════════════════════════════════════
function SectionTitle({ label, title, subtitle, tc, isDark }) {
  return (
    <div className="text-center mb-16">
      <span className="mono-font text-sm font-medium tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border"
        style={{ color: tc.primary, borderColor: tc.primary + "40", background: tc.primary + "12" }}>
        {label}
      </span>
      <h2 className="heading-font text-5xl md:text-6xl mt-4 mb-3 tracking-wider"
        style={{ letterSpacing: "0.06em" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-base max-w-2xl mx-auto" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// LOADING SCREEN
// ═══════════════════════════════════════════════
function LoadingScreen({ tc }) {
  const [dots, setDots] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setDots(d => (d + 1) % 4), 400);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-gray-950">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-2 border-gray-800" />
        <div className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: `${tc.primary}40`, borderTopColor: tc.primary }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="heading-font text-3xl tracking-widest" style={{ color: tc.primary }}>AD</span>
        </div>
      </div>
      <p className="mono-font text-gray-500 text-sm tracking-[0.3em] uppercase">
        Loading{".".repeat(dots)}
      </p>
      <div className="mt-6 w-48 h-0.5 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full animate-loading-bar" style={{ background: tc.primary }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// THEME PANEL
// ═══════════════════════════════════════════════
function ThemePanel({ isDark, setDarkMode, theme, setTheme, tc }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full flex items-center justify-center text-sm shadow-lg transition-all hover:scale-110"
        style={{ background: tc.primary, color: "#fff" }}
        title="Theme Settings"
      >⚙</button>

      {open && (
        <div className="fixed left-16 top-1/2 -translate-y-1/2 z-50 w-56 rounded-2xl p-4 shadow-2xl border"
          style={{
            background: isDark ? "rgba(10,10,20,0.95)" : "rgba(255,255,255,0.97)",
            borderColor: tc.primary + "30",
            backdropFilter: "blur(20px)",
          }}>
          <p className="mono-font text-xs uppercase tracking-widest mb-3"
            style={{ color: isDark ? "#64748b" : "#94a3b8" }}>Theme Colors</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {Object.entries(THEMES).map(([key, t]) => (
              <button key={key}
                onClick={() => setTheme(key)}
                title={t.name}
                className="w-9 h-9 rounded-full transition-all hover:scale-110 flex items-center justify-center"
                style={{
                  background: t.isGradient ? "linear-gradient(135deg,#8b5cf6,#ec4899)" : t.primary,
                  outline: theme === key ? `3px solid white` : "none",
                  outlineOffset: "2px",
                  boxShadow: theme === key ? `0 0 12px ${t.primary}` : "none",
                }}
              >
                {theme === key && <span className="text-white text-xs">✓</span>}
              </button>
            ))}
          </div>
          <p className="mono-font text-xs uppercase tracking-widest mb-2"
            style={{ color: isDark ? "#64748b" : "#94a3b8" }}>Mode</p>
          <button
            onClick={() => setDarkMode(!isDark)}
            className="w-full py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: tc.primary + "20",
              color: tc.primary,
              border: `1px solid ${tc.primary}30`,
            }}
          >
            {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════
function Navbar({ isDark, setDarkMode, tc, scrollTo, mobileNav, setMobileNav }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];
  return (
    <nav className={`fixed top-1 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "mx-4 md:mx-8 lg:mx-16 rounded-2xl" : ""
      }`}
      style={scrolled ? {
        background: isDark ? "rgba(5,5,15,0.9)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${tc.primary}20`,
        boxShadow: `0 8px 32px ${tc.glow}`,
      } : {}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="heading-font text-2xl tracking-widest transition-all hover:scale-105"
          style={{ color: tc.primary }}>
          ARJUN<span style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>.DEVELOPER</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <button key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              className="nav-link px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{ color: isDark ? "#94a3b8" : "#475569" }}>
              {l}
            </button>
          ))}
          <button
            onClick={() => setDarkMode(!isDark)}
            className="ml-3 w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110"
            style={{ background: tc.primary + "15", color: tc.primary }}>
            {isDark ? "☀" : "🌙"}
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="ml-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ background: tc.primary, boxShadow: `0 4px 15px ${tc.glow}` }}>
            Hire Me
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-2xl" style={{ color: tc.primary }}
          onClick={() => setMobileNav(!mobileNav)}>
          {mobileNav ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileNav && (
        <div className="md:hidden px-4 pb-4"
          style={{ borderTop: `1px solid ${tc.primary}20` }}>
          {links.map(l => (
            <button key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              className="block w-full text-left py-3 px-2 text-sm font-medium border-b"
              style={{
                color: isDark ? "#94a3b8" : "#475569",
                borderColor: isDark ? "#1e293b" : "#e2e8f0",
              }}>
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ═══════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════
function HeroSection({ tc, isDark }) {
  const [typed, setTyped] = useState("");
  const [titleIdx, setTitleIdx] = useState(0);
  const titles = ["MERN Full Stack Developer", "React.js Expert", "Node.js Engineer", "Database"];
  const curTitle = titles[titleIdx];


  useEffect(() => {
    let i = 0;
    const type = () => {
      if (i <= curTitle.length) { setTyped(curTitle.slice(0, i)); i++; setTimeout(type, 80); }
      else {
        setTimeout(() => {
          let d = curTitle.length;
          const del = () => {
            if (d >= 0) { setTyped(curTitle.slice(0, d)); d--; setTimeout(del, 40); }
            else { setTitleIdx(p => (p + 1) % titles.length); }
          };
          del();
        }, 2000);
      }
    };
    type();
  }, [titleIdx]);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    dur: Math.random() * 10 + 8,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{
            background: isDark
              ? `radial-gradient(ellipse at 20% 50%,${tc.glow} 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(139,92,246,0.08) 0%,transparent 50%)`
              : `radial-gradient(ellipse at 20% 50%,${tc.primary}10 0%,transparent 60%)`
          }} />
        {particles.map((p, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              width: p.size, height: p.size,
              left: `${p.left}%`, bottom: "-10px",
              background: tc.primary,
              opacity: p.opacity,
              animation: `particleRise ${p.dur}s linear ${p.delay}s infinite`,
            }} />
        ))}
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(${isDark ? "#fff" : "#000"} 1px,transparent 1px),linear-gradient(90deg,${isDark ? "#fff" : "#000"} 1px,transparent 1px)`,
            backgroundSize: "60px 60px"
          }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 animate-fade-in"
              style={{ background: tc.primary + "12", borderColor: tc.primary + "30", color: tc.primary }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: tc.primary }} />
              <span className="mono-font text-xs tracking-widest uppercase">Available for hire · 1.5+ Years Exp</span>
            </div>

            {/* Name */}
            <h1 className="heading-font tracking-wider mb-2 animate-slide-up" style={{
              fontSize: "clamp(3rem,8vw,6rem)",
              lineHeight: 1.0,
              letterSpacing: "0.04em",
            }}>
              HI, I'M<br />
              <span style={{ color: tc.primary }}>ARJUN</span>{" "}
              <span className="gradient-text-hero">DEVELOPER</span>
            </h1>

            {/* Typed title */}
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-6 mt-4 h-8">
              <span className="mono-font text-lg font-medium" style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>
                {typed}
              </span>
              <span className="w-0.5 h-6 animate-blink" style={{ background: tc.primary }} />
            </div>

            {/* Description */}
            <p className="text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
              style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
              I craft high-performance web applications with modern front-end experiences and robust back-end systems. From clean UI to secure APIs and databases, I build complete digital products that scale.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-8 justify-center lg:justify-start mb-8">
              {[["1.5+", "Years Exp"], ["20+", "Projects"], ["50+", "Happy Clients"]].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="heading-font text-3xl" style={{ color: tc.primary }}>{num}</div>
                  <div className="mono-font text-xs uppercase tracking-wider" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <a href={resume} download
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-105 hover:-translate-y-1"
                style={{ background: tc.primary, boxShadow: `0 8px 25px ${tc.glow}` }}>
                ⬇ Download Resume
              </a>
              <button onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 hover:-translate-y-1 border-2"
                style={{ borderColor: tc.primary, color: tc.primary, background: tc.primary + "10" }}>
                ✉ Hire Me
              </button>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              {SOCIALS.map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg mono-font text-xs transition-all hover:scale-105"
                  style={{ color: isDark ? "#64748b" : "#94a3b8", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}` }}
                  onMouseEnter={e => { e.currentTarget.style.color = tc.primary; e.currentTarget.style.borderColor = tc.primary + "50"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = isDark ? "#64748b" : "#94a3b8"; e.currentTarget.style.borderColor = isDark ? "#1e293b" : "#e2e8f0"; }}>
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right - Avatar / Code Card */}
          <div className="flex-shrink-0 animate-float">
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 animate-spin-slow"
                style={{ borderColor: `${tc.primary}30`, borderTopColor: tc.primary }} />
              {/* Avatar circle */}
              <div className="absolute inset-4 rounded-full flex items-center justify-center"
                style={{ background: isDark ? "#0f172a" : "#f8fafc", border: `2px solid ${tc.primary}20` }}>
                <div className="w-full h-full rounded-full flex flex-col items-center justify-center"
                  style={{ background: `linear-gradient(135deg,${tc.primary}20,${tc.primary}05)` }}>
                  <div className="heading-font text-6xl" style={{ color: tc.primary }}>AD</div>
                  <div className="mono-font text-xs mt-1" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>MERN Developer</div>
                </div>
              </div>
              {/* Floating badges */}
              {[
                { icon: "🟨", label: "JavaScript", pos: "top-10 left-0" },
                { icon: "⚛", label: "React", pos: "top-0 right-0" },
                { icon: "🟢", label: "Node", pos: "bottom-8 right-0" },
                { icon: "🍃", label: "Mongo", pos: "bottom-0 left-4" },
              ].map(b => (
                <div key={b.label}
                  className={`absolute ${b.pos} px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium`}
                  style={{
                    background: isDark ? "rgba(10,10,20,0.9)" : "rgba(255,255,255,0.9)",
                    border: `1px solid ${tc.primary}30`,
                    backdropFilter: "blur(8px)",
                    color: isDark ? "#e2e8f0" : "#1e293b",
                  }}>
                  <span>{b.icon}</span>{b.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="mono-font text-xs tracking-widest uppercase"
            style={{ color: isDark ? "#475569" : "#94a3b8" }}>Scroll</span>
          <div className="w-0.5 h-8 rounded-full" style={{ background: `linear-gradient(${tc.primary},transparent)` }} />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// ABOUT SECTION
// ═══════════════════════════════════════════════
function AboutSection({ tc, isDark }) {
  const cardStyle = { background: isDark ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.8)", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`, backdropFilter: "blur(12px)" };
  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="Get To Know Me" title="ABOUT ME"
          subtitle="Passionate MERN developer crafting scalable digital experiences"
          tc={tc} isDark={isDark} />

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left - Summary */}
          <div className="space-y-6">
            <div className="rounded-2xl p-6" style={cardStyle}>
              <h3 className="font-semibold text-lg mb-3" style={{ color: tc.primary }}>Who I Am</h3>
              <p className="leading-relaxed text-sm" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                I'm <strong style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>Arjun Developer</strong>, a Senior MERN Full Stack Developer
                with <strong style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>1.5+ years</strong> of professional experience building
                production-grade web applications. I specialize in crafting robust, scalable architectures that serve
                thousands of users with exceptional performance.
              </p>
              <p className="leading-relaxed text-sm mt-3" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                I love turning complex requirements into elegant, maintainable code. From designing RESTful APIs and
                real-time systems to building pixel-perfect UIs, I bring a full-spectrum engineering mindset to every project.
              </p>
            </div>

            {/* Education */}
            <div className="rounded-2xl p-6" style={cardStyle}>
              <h3 className="font-semibold text-lg mb-4" style={{ color: tc.primary }}>Education</h3>
              <div className="space-y-3">
                {EDUCATION.map(e => (
                  <div key={e.degree} className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                    <span className="text-xl mt-0.5">{e.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm" style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>{e.degree}</div>
                      <div className="text-xs mt-0.5" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>{e.institution} · {e.year}</div>
                    </div>
                    <span className="mono-font text-xs font-bold px-2.5 py-1 rounded-lg flex-shrink-0"
                      style={{ color: tc.primary, background: tc.primary + "15" }}>{e.grade}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Stats + What I Do */}
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "1.5+", label: "Years Experience", icon: "📅" },
                { num: "50+", label: "Projects Completed", icon: "🚀" },
                { num: "20+", label: "Happy Clients", icon: "🤝" },
                { num: "1k+", label: "Users Served", icon: "👥" },
              ].map(s => (
                <div key={s.label} className="rounded-2xl p-5 text-center transition-all hover:scale-105"
                  style={{ ...cardStyle, boxShadow: `0 4px 20px ${tc.glow}20` }}>
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="heading-font text-4xl" style={{ color: tc.primary }}>{s.num}</div>
                  <div className="text-xs mt-1 font-medium" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* What I do */}
            <div className="rounded-2xl p-6" style={cardStyle}>
              <h3 className="font-semibold text-lg mb-4" style={{ color: tc.primary }}>What I Do</h3>
              <div className="space-y-3">
                {[
                  { icon: "⚡", title: "Full Stack Development", desc: "End-to-end MERN apps from DB design to deployment" },
                  { icon: "🎨", title: "Frontend Engineering", desc: "Pixel-perfect, responsive React/Next.js UIs" },
                  { icon: "🔧", title: "API Architecture", desc: "Scalable REST & GraphQL APIs with Node.js" },
                  { icon: "☁", title: "Cloud & DevOps", desc: "AWS, Docker, CI/CD pipelines & monitoring" },
                ].map(w => (
                  <div key={w.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                      style={{ background: tc.primary + "15" }}>{w.icon}</div>
                    <div>
                      <div className="font-medium text-sm" style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>{w.title}</div>
                      <div className="text-xs mt-0.5" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>{w.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// SKILLS SECTION
// ═══════════════════════════════════════════════
function SkillsSection({ tc, isDark }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const [activeTab, setActiveTab] = useState("Frontend");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const cardStyle = { background: isDark ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.8)", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`, backdropFilter: "blur(12px)" };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6" ref={ref}
      style={{ background: isDark ? "rgba(5,5,15,0.5)" : "rgba(248,250,252,0.8)" }}>
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="My Expertise" title="SKILLS"
          subtitle="Technologies and tools I use to craft exceptional web experiences"
          tc={tc} isDark={isDark} />

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Object.keys(SKILLS).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
              style={activeTab === tab
                ? { background: tc.primary, color: "#fff", boxShadow: `0 4px 15px ${tc.glow}` }
                : { background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", color: isDark ? "#64748b" : "#94a3b8", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}` }
              }>{tab}</button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS[activeTab].map((skill, i) => (
            <div key={skill.name} className="rounded-2xl p-5 transition-all hover:scale-[1.02]"
              style={{ ...cardStyle, animationDelay: `${i * 0.05}s` }}>
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-sm" style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>{skill.name}</span>
                <span className="mono-font text-xs font-bold" style={{ color: tc.primary }}>{skill.level}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: isDark ? "#1e293b" : "#e2e8f0" }}>
                <div className="h-full rounded-full skill-bar transition-all duration-1000"
                  style={{
                    width: visible ? `${skill.level}%` : "0%",
                    background: `linear-gradient(90deg, ${tc.primary}, ${tc.hover})`,
                    boxShadow: `0 0 8px ${tc.glow}`,
                    transitionDelay: `${i * 0.1}s`,
                  }} />
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-12 text-center">
          <p className="mono-font text-xs uppercase tracking-widest mb-4" style={{ color: isDark ? "#475569" : "#94a3b8" }}>
            Full Tech Stack
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Html", "Css", "JavaScript", "Bootstrap", "React", "Next.js", "Node.js", "Expressjs", "MongoDB", "AWS", "Socket.io", "Tailwind", "Git", "Vercel"].map(t => (
              <span key={t} className="mono-font text-xs px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
                  color: isDark ? "#94a3b8" : "#64748b",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = tc.primary; e.currentTarget.style.borderColor = tc.primary + "40"; }}
                onMouseLeave={e => { e.currentTarget.style.color = isDark ? "#94a3b8" : "#64748b"; e.currentTarget.style.borderColor = isDark ? "#1e293b" : "#e2e8f0"; }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// EXPERIENCE SECTION
// ═══════════════════════════════════════════════
function ExperienceSection({ tc, isDark }) {
  const cardStyle = (color) => ({
    background: isDark ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.8)",
    border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
    backdropFilter: "blur(12px)",
    borderLeft: `3px solid ${tc.primary}`,
  });
  return (
    <section id="experience" className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle label="My Journey" title="EXPERIENCE"
          subtitle="Professional experience building real-world applications"
          tc={tc} isDark={isDark} />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 hidden sm:block"
            style={{ background: `linear-gradient(to bottom,${tc.primary},${tc.primary}20)` }} />

          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <div key={exp.company} className="relative sm:pl-16">
                {/* Timeline dot */}
                <div className="absolute left-3.5 -translate-x-1/2 w-5 h-5 rounded-full border-2 hidden sm:flex items-center justify-center"
                  style={{ borderColor: tc.primary, background: isDark ? "#050505" : "#fff", top: "1.5rem" }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: tc.primary }} />
                </div>

                <div className="rounded-2xl p-6 transition-all hover:scale-[1.01] hover:-translate-y-1"
                  style={{ ...cardStyle(exp.color), boxShadow: `0 4px 20px ${tc.glow}15` }}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>{exp.role}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="font-semibold text-sm" style={{ color: tc.primary }}>@ {exp.company}</span>
                        <span className="text-xs" style={{ color: isDark ? "#475569" : "#94a3b8" }}>· {exp.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="mono-font text-xs px-3 py-1 rounded-full"
                        style={{ background: tc.primary + "15", color: tc.primary }}>{exp.period}</span>
                      <span className="mono-font text-xs" style={{ color: isDark ? "#475569" : "#94a3b8" }}>{exp.type}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map(a => (
                      <li key={a} className="flex items-start gap-2 text-sm" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: tc.primary }} />
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map(t => (
                      <span key={t} className="mono-font text-xs px-2.5 py-1 rounded-lg"
                        style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", color: isDark ? "#64748b" : "#94a3b8", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// PROJECTS SECTION
// ═══════════════════════════════════════════════
function ProjectsSection({ tc, isDark }) {
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  const cardBase = { background: isDark ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.9)", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`, backdropFilter: "blur(12px)" };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6"
      style={{ background: isDark ? "rgba(5,5,15,0.5)" : "rgba(248,250,252,0.8)" }}>
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="My Work" title="PROJECTS"
          subtitle="Handpicked projects showcasing my full-stack capabilities"
          tc={tc} isDark={isDark} />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["all", "fullstack", "frontend", "backend"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all hover:scale-105"
              style={filter === f
                ? { background: tc.primary, color: "#fff", boxShadow: `0 4px 15px ${tc.glow}` }
                : { background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", color: isDark ? "#64748b" : "#94a3b8", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}` }
              }>{f === "all" ? "All Projects" : f.charAt(0).toUpperCase() + f.slice(1)}</button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div key={p.id}
              className="rounded-2xl overflow-hidden transition-all hover:scale-[1.02] hover:-translate-y-2 group cursor-pointer"
              style={{ ...cardBase, boxShadow: `0 4px 20px ${tc.glow}10` }}
              onClick={() => setModal(p)}>
              {/* Project image placeholder */}
              <div className="h-44 flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg,${tc.primary}20,${tc.primary}05)` }}>
                <div className="text-center">
                  <div className="heading-font text-5xl mb-1" style={{ color: tc.primary + "40" }}>
                    {["img", "🛒", "📋", "📈", "🏥", "📝"][i % 6]}
                  </div>
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="heading-font text-xl tracking-wider" style={{ color: tc.primary }}>
                    {p.category.toUpperCase()}
                  </div>
                </div>
                {p.featured && (
                  <span className="absolute top-3 right-3 mono-font text-xs px-2.5 py-1 rounded-full"
                    style={{ background: tc.primary, color: "#fff" }}>Featured</span>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: tc.primary + "20", backdropFilter: "blur(4px)" }}>
                  <span className="text-white text-sm font-medium px-4 py-2 rounded-xl"
                    style={{ background: tc.primary }}>View Details →</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-base mb-2" style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>{p.title}</h3>
                <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>{p.desc}</p>

                {/* Achievements */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.achievements.slice(0, 3).map(a => (
                    <span key={a} className="mono-font text-xs px-2 py-0.5 rounded"
                      style={{ background: tc.primary + "15", color: tc.primary }}>✓ {a}</span>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.tech.slice(0, 4).map(t => (
                    <span key={t} className="mono-font text-xs px-2 py-0.5 rounded"
                      style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", color: isDark ? "#475569" : "#94a3b8", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}` }}>
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 4 && <span className="mono-font text-xs px-2 py-0.5 rounded" style={{ color: isDark ? "#475569" : "#94a3b8" }}>+{p.tech.length - 4}</span>}
                </div>

                <div className="flex gap-3" onClick={e => e.stopPropagation()}>
                  <a href={p.github} className="flex-1 text-center py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                    style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", color: isDark ? "#94a3b8" : "#64748b", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}` }}>
                    ⌨ GitHub
                  </a>
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 text-white"
                    style={{ background: tc.primary }}
                  >
                    🚀 Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
          onClick={() => setModal(null)}>
          <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
            style={{ ...cardBase, border: `1px solid ${tc.primary}30` }}
            onClick={e => e.stopPropagation()}>
            <div className="h-40 flex items-center justify-center relative"
              style={{ background: `linear-gradient(135deg,${tc.primary}30,${tc.primary}10)` }}>
              <div className="heading-font text-5xl tracking-widest" style={{ color: tc.primary }}>{modal.title}</div>
              <button className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white"
                onClick={() => setModal(null)}
                style={{ background: "rgba(0,0,0,0.4)" }}>✕</button>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed mb-4" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>{modal.desc}</p>
              <div className="mb-4">
                <p className="mono-font text-xs uppercase tracking-wider mb-2" style={{ color: tc.primary }}>Highlights</p>
                <div className="flex flex-wrap gap-2">
                  {modal.achievements.map(a => (
                    <span key={a} className="mono-font text-xs px-2.5 py-1 rounded-lg"
                      style={{ background: tc.primary + "15", color: tc.primary }}>✓ {a}</span>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <p className="mono-font text-xs uppercase tracking-wider mb-2" style={{ color: isDark ? "#475569" : "#94a3b8" }}>Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {modal.tech.map(t => (
                    <span key={t} className="mono-font text-xs px-2.5 py-1 rounded-lg"
                      style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", color: isDark ? "#64748b" : "#94a3b8", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <a href={modal.github} className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", color: isDark ? "#94a3b8" : "#64748b", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}` }}>
                  ⌨ View Code
                </a>
                {/* <a href={modal.demo} className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: tc.primary, boxShadow: `0 4px 15px ${tc.glow}` }}>
                  🚀 Live Demo
                </a> */}

                <a
                  href={modal.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{
                    background: tc.primary,
                    boxShadow: `0 4px 15px ${tc.glow}`
                  }}
                >
                  🚀 Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ═══════════════════════════════════════════════
// TESTIMONIALS SECTION
// ═══════════════════════════════════════════════
function TestimonialsSection({ tc, isDark }) {
  const [active, setActive] = useState(0);
  const cardStyle = { background: isDark ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.8)", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`, backdropFilter: "blur(12px)" };
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle label="What Clients Say" title="TESTIMONIALS"
          subtitle="Kind words from people I've worked with"
          tc={tc} isDark={isDark} />

        <div className="rounded-2xl p-8 md:p-12 text-center"
          style={{ ...cardStyle, borderTop: `3px solid ${tc.primary}` }}>
          <div className="text-5xl mb-6 opacity-30" style={{ color: tc.primary }}>"</div>
          <p className="text-base md:text-lg leading-relaxed mb-8"
            style={{ color: isDark ? "#cbd5e1" : "#475569" }}>
            {TESTIMONIALS[active].text}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
              style={{ background: tc.primary }}>{TESTIMONIALS[active].initials}</div>
            <div className="text-left">
              <div className="font-semibold" style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>
                {TESTIMONIALS[active].name}
              </div>
              <div className="text-sm" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>
                {TESTIMONIALS[active].role}
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{
                background: i === active ? tc.primary : isDark ? "#1e293b" : "#e2e8f0",
                width: i === active ? "24px" : "10px",
              }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// CERTIFICATIONS SECTION
// ═══════════════════════════════════════════════
// function CertificationsSection({ tc, isDark }) {
//   const cardStyle = { background: isDark ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.8)", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`, backdropFilter: "blur(12px)" };
//   return (
//     <section id="certifications" className="py-24 px-4 sm:px-6"
//       style={{ background: isDark ? "rgba(5,5,15,0.5)" : "rgba(248,250,252,0.8)" }}>
//       <div className="max-w-7xl mx-auto">
//         <SectionTitle label="My Credentials" title="CERTIFICATIONS"
//           subtitle="Industry-recognised certifications validating my expertise"
//           tc={tc} isDark={isDark} />

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {CERTS.map((c, i) => (
//             <div key={c.name}
//               className="rounded-2xl p-5 flex items-start gap-4 transition-all hover:scale-[1.03] hover:-translate-y-1"
//               style={{ ...cardStyle, borderLeft: `3px solid ${tc.primary}` }}>
//               <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
//                 style={{ background: tc.primary + "15" }}>{c.icon}</div>
//               <div className="min-w-0">
//                 <h3 className="font-semibold text-sm leading-tight mb-1" style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>{c.name}</h3>
//                 <p className="text-xs mb-2" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>{c.issuer}</p>
//                 <span className="mono-font text-xs px-2 py-0.5 rounded"
//                   style={{ background: tc.primary + "15", color: tc.primary }}>{c.year}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// ═══════════════════════════════════════════════
// CONTACT SECTION
// ═══════════════════════════════════════════════
// function ContactSection({ tc, isDark }) {
//   const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
//   const [sent, setSent] = useState(false);
//   const cardStyle = { background: isDark ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.8)", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`, backdropFilter: "blur(12px)" };
//   const inputStyle = {
//     background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
//     border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
//     color: isDark ? "#e2e8f0" : "#1e293b",
//     borderRadius: "12px",
//     padding: "12px 16px",
//     width: "100%",
//     fontSize: "14px",
//     outline: "none",
//     transition: "border-color 0.2s",
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     setSent(true);
//     setTimeout(() => setSent(false), 4000);
//     setForm({ name: "", email: "", subject: "", message: "" });
//   };

//   return (
//     <section id="contact" className="py-24 px-4 sm:px-6">
//       <div className="max-w-6xl mx-auto">
//         <SectionTitle label="Get In Touch" title="CONTACT ME"
//           subtitle="Have a project in mind? Let's build something amazing together"
//           tc={tc} isDark={isDark} />

//         <div className="grid lg:grid-cols-2 gap-10">
//           {/* Left - Info */}
//           <div className="space-y-6">
//             <div className="rounded-2xl p-6" style={cardStyle}>
//               <h3 className="font-semibold text-lg mb-2" style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>Let's Talk!</h3>
//               <p className="text-sm leading-relaxed" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
//                 I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
//                 Drop me a message and I'll get back within 24 hours.
//               </p>
//             </div>

//             {[
//               { icon: "📧", label: "Email", value: "arjundeveloper123@gmail.com", href: "mailto:arjundeveloper123@gmail.com" },
//               { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/arjundev", href: "https://www.linkedin.com/in/arjun-maurya-8365a3280/" },
//               { icon: "⌨", label: "GitHub", value: "github.com/arjundev", href: "https://github.com/arjunmaurya96" },
//               { icon: "🌏", label: "Location", value: "India (Remote Available)", href: null },
//             ].map(c => (
//               <div key={c.label} className="rounded-2xl p-4 flex items-center gap-4 transition-all hover:scale-[1.02]"
//                 style={cardStyle}>
//                 <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
//                   style={{ background: tc.primary + "15" }}>{c.icon}</div>
//                 <div>
//                   <p className="mono-font text-xs uppercase tracking-wider" style={{ color: isDark ? "#475569" : "#94a3b8" }}>{c.label}</p>
//                   {c.href ? (
//                     <a href={c.href} className="text-sm font-medium hover:underline" style={{ color: tc.primary }}>{c.value}</a>
//                   ) : (
//                     <p className="text-sm font-medium" style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>{c.value}</p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right - Form */}
//           <div className="rounded-2xl p-6 md:p-8" style={{ ...cardStyle, borderTop: `3px solid ${tc.primary}` }}>
//             {sent ? (
//               <div className="flex flex-col items-center justify-center h-full py-12">
//                 <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4"
//                   style={{ background: tc.primary + "15" }}>✓</div>
//                 <h3 className="font-bold text-xl mb-2" style={{ color: tc.primary }}>Message Sent!</h3>
//                 <p className="text-sm text-center" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>
//                   Thank you for reaching out. I'll get back to you soon!
//                 </p>
//               </div>
//             ) : (
//               <form onSubmit={submit} className="space-y-4">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="mono-font text-xs uppercase tracking-wider block mb-1.5"
//                       style={{ color: isDark ? "#475569" : "#94a3b8" }}>Your Name</label>
//                     <input type="text" required placeholder="John Doe" value={form.name}
//                       style={inputStyle}
//                       onChange={e => setForm({ ...form, name: e.target.value })}
//                       onFocus={e => e.target.style.borderColor = tc.primary}
//                       onBlur={e => e.target.style.borderColor = isDark ? "#1e293b" : "#e2e8f0"} />
//                   </div>
//                   <div>
//                     <label className="mono-font text-xs uppercase tracking-wider block mb-1.5"
//                       style={{ color: isDark ? "#475569" : "#94a3b8" }}>Email Address</label>
//                     <input type="email" required placeholder="john@example.com" value={form.email}
//                       style={inputStyle}
//                       onChange={e => setForm({ ...form, email: e.target.value })}
//                       onFocus={e => e.target.style.borderColor = tc.primary}
//                       onBlur={e => e.target.style.borderColor = isDark ? "#1e293b" : "#e2e8f0"} />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="mono-font text-xs uppercase tracking-wider block mb-1.5"
//                     style={{ color: isDark ? "#475569" : "#94a3b8" }}>Subject</label>
//                   <input type="text" required placeholder="Project Inquiry..." value={form.subject}
//                     style={inputStyle}
//                     onChange={e => setForm({ ...form, subject: e.target.value })}
//                     onFocus={e => e.target.style.borderColor = tc.primary}
//                     onBlur={e => e.target.style.borderColor = isDark ? "#1e293b" : "#e2e8f0"} />
//                 </div>
//                 <div>
//                   <label className="mono-font text-xs uppercase tracking-wider block mb-1.5"
//                     style={{ color: isDark ? "#475569" : "#94a3b8" }}>Message</label>
//                   <textarea required rows={5} placeholder="Tell me about your project..." value={form.message}
//                     style={{ ...inputStyle, resize: "vertical" }}
//                     onChange={e => setForm({ ...form, message: e.target.value })}
//                     onFocus={e => e.target.style.borderColor = tc.primary}
//                     onBlur={e => e.target.style.borderColor = isDark ? "#1e293b" : "#e2e8f0"} />
//                 </div>
//                 <button type="submit"
//                   className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] hover:-translate-y-0.5"
//                   style={{ background: tc.primary, boxShadow: `0 8px 25px ${tc.glow}` }}>
//                   Send Message →
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



function ContactSection({ tc, isDark }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const cardStyle = {
    background: isDark
      ? "rgba(15,23,42,0.8)"
      : "rgba(255,255,255,0.8)",
    border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
    backdropFilter: "blur(12px)",
  };

  const inputStyle = {
    background: isDark
      ? "rgba(255,255,255,0.04)"
      : "rgba(0,0,0,0.03)",
    border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
    color: isDark ? "#e2e8f0" : "#1e293b",
    borderRadius: "12px",
    padding: "12px 16px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  // EMAILJS SUBMIT FUNCTION
  const submit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_k41rw8n",
        "template_z8lzzm8",
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "gEoYwkl8lrQ1Tekau"
      )
      .then((result) => {
        console.log("Email Sent:", result.text);

        setSent(true);

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setSent(false);
        }, 4000);
      })
      .catch((error) => {
        console.log("Email Error:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="Get In Touch"
          title="CONTACT ME"
          subtitle="Have a project in mind? Let's build something amazing together"
          tc={tc}
          isDark={isDark}
        />

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left - Info */}
          <div className="space-y-6">
            <div className="rounded-2xl p-6" style={cardStyle}>
              <h3
                className="font-semibold text-lg mb-2"
                style={{
                  color: isDark ? "#e2e8f0" : "#1e293b",
                }}
              >
                Let's Talk!
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{
                  color: isDark ? "#94a3b8" : "#64748b",
                }}
              >
                I'm always open to discussing new projects,
                creative ideas, or opportunities to be part of your vision.
                Drop me a message and I'll get back within 24 hours.
              </p>
            </div>

            {[
              {
                icon: "📧",
                label: "Email",
                value: "arjundeveloper123@gmail.com",
                href: "mailto:arjundeveloper123@gmail.com",
              },
              {
                icon: "💼",
                label: "LinkedIn",
                value: "linkedin.com/in/arjundev",
                href: "https://www.linkedin.com/in/arjun-maurya-8365a3280/",
              },
              {
                icon: "⌨",
                label: "GitHub",
                value: "github.com/arjundev",
                href: "https://github.com/arjunmaurya96",
              },
              {
                icon: "🌏",
                label: "Location",
                value: "India (Remote Available)",
                href: null,
              },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-2xl p-4 flex items-center gap-4 transition-all hover:scale-[1.02]"
                style={cardStyle}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: tc.primary + "15",
                  }}
                >
                  {c.icon}
                </div>

                <div>
                  <p
                    className="mono-font text-xs uppercase tracking-wider"
                    style={{
                      color: isDark ? "#475569" : "#94a3b8",
                    }}
                  >
                    {c.label}
                  </p>

                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-sm font-medium hover:underline"
                      style={{ color: tc.primary }}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: isDark ? "#e2e8f0" : "#1e293b",
                      }}
                    >
                      {c.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right - Form */}
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              ...cardStyle,
              borderTop: `3px solid ${tc.primary}`,
            }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4"
                  style={{
                    background: tc.primary + "15",
                  }}
                >
                  ✓
                </div>

                <h3
                  className="font-bold text-xl mb-2"
                  style={{ color: tc.primary }}
                >
                  Message Sent!
                </h3>

                <p
                  className="text-sm text-center"
                  style={{
                    color: isDark ? "#64748b" : "#94a3b8",
                  }}
                >
                  Thank you for reaching out. I'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="mono-font text-xs uppercase tracking-wider block mb-1.5"
                      style={{
                        color: isDark ? "#475569" : "#94a3b8",
                      }}
                    >
                      Your Name
                    </label>

                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      style={inputStyle}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label
                      className="mono-font text-xs uppercase tracking-wider block mb-1.5"
                      style={{
                        color: isDark ? "#475569" : "#94a3b8",
                      }}
                    >
                      Email Address
                    </label>

                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={form.email}
                      style={inputStyle}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="mono-font text-xs uppercase tracking-wider block mb-1.5"
                    style={{
                      color: isDark ? "#475569" : "#94a3b8",
                    }}
                  >
                    Subject
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Project Inquiry..."
                    value={form.subject}
                    style={inputStyle}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        subject: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    className="mono-font text-xs uppercase tracking-wider block mb-1.5"
                    style={{
                      color: isDark ? "#475569" : "#94a3b8",
                    }}
                  >
                    Message
                  </label>

                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                    }}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        message: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] hover:-translate-y-0.5"
                  style={{
                    background: tc.primary,
                    boxShadow: `0 8px 25px ${tc.glow}`,
                  }}
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}



// ═══════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════
function Footer({ tc, isDark, scrollTo }) {
  return (
    <footer className="py-12 px-4 sm:px-6"
      style={{ borderTop: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}` }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <button onClick={() => scrollTo("home")}
            className="heading-font text-2xl tracking-widest"
            style={{ color: tc.primary }}>
            ARJUN<span style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>.PROGRAMMER</span>
          </button>

          <div className="flex flex-wrap justify-center gap-4">
            {["Home", "About", "Skills", "Experience", "Projects", "Contact"].map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())}
                className="text-xs font-medium transition-all hover:scale-105"
                style={{ color: isDark ? "#64748b" : "#94a3b8" }}
                onMouseEnter={e => e.currentTarget.style.color = tc.primary}
                onMouseLeave={e => e.currentTarget.style.color = isDark ? "#64748b" : "#94a3b8"}>
                {l}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            {SOCIALS.map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer"
                className="px-3 py-1.5 rounded-lg mono-font text-xs transition-all hover:scale-105"
                style={{ color: isDark ? "#64748b" : "#94a3b8", border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}` }}
                onMouseEnter={e => { e.currentTarget.style.color = tc.primary; e.currentTarget.style.borderColor = tc.primary + "50"; }}
                onMouseLeave={e => { e.currentTarget.style.color = isDark ? "#64748b" : "#94a3b8"; e.currentTarget.style.borderColor = isDark ? "#1e293b" : "#e2e8f0"; }}>
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 text-center"
          style={{ borderTop: `1px solid ${isDark ? "#0f172a" : "#f1f5f9"}` }}>
          <p className="mono-font text-xs" style={{ color: isDark ? "#334155" : "#cbd5e1" }}>
            © {new Date().getFullYear()} Arjun Full Stack Developer. Crafted with ❤ using React.js & TailwindCSS
          </p>
          <p className="mono-font text-xs mt-1" style={{ color: isDark ? "#1e293b" : "#e2e8f0" }}>
            MERN Full Stack Developer · India
          </p>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [theme, setTheme] = useState("blue");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mobileNav, setMobileNav] = useState(false);
  const [backToTop, setBackToTop] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorActive, setCursorActive] = useState(false);

  const tc = THEMES[theme];
  const isDark = darkMode;

  // CSS variables
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--primary", tc.primary);
    r.style.setProperty("--hover", tc.hover);
    r.style.setProperty("--glow-color", tc.glow);
  }, [theme]);

  // Loading screen
  useEffect(() => { const t = setTimeout(() => setLoading(false), 2800); return () => clearTimeout(t); }, []);

  // Scroll
  useEffect(() => {
    const fn = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Cursor
  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setCursorActive(e.target.closest("button,a,[role=button]") !== null);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  };

  const bg = isDark ? "#050510" : "#f8fafc";
  const textColor = isDark ? "#e2e8f0" : "#1e293b";

  if (loading) return <LoadingScreen tc={tc} />;

  return (
    <div style={{ background: bg, color: textColor, minHeight: "100vh", fontFamily: "'Outfit',sans-serif", transition: "background 0.4s,color 0.4s" }}>
      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

        *,:before,:after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{overflow-x:hidden}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:var(--primary);border-radius:3px}

        .heading-font{font-family:'Bebas Neue',cursive!important}
        .mono-font{font-family:'JetBrains Mono',monospace!important}

        .nav-link:hover{color:var(--primary)!important}

        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}

        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes particleRise{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(-110vh) rotate(720deg);opacity:0}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floatUD{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes spinSlow{to{transform:rotate(360deg)}}
        @keyframes blinkCursor{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes loadingBar{0%{width:0%}100%{width:100%}}
        @keyframes bounceUpDown{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 15px var(--glow-color)}50%{box-shadow:0 0 35px var(--glow-color),0 0 60px var(--glow-color)}}

        .animate-spin{animation:spin 1s linear infinite}
        .animate-float{animation:floatUD 6s ease-in-out infinite}
        .animate-spin-slow{animation:spinSlow 20s linear infinite}
        .animate-fade-in{animation:fadeIn 0.8s ease forwards}
        .animate-slide-up{animation:fadeIn 0.6s ease forwards}
        .animate-blink{animation:blinkCursor 1.1s step-end infinite}
        .animate-bounce{animation:bounceUpDown 2s ease-in-out infinite}
        .animate-loading-bar{animation:loadingBar 2.4s ease forwards}
        .animate-pulse{animation:pulseGlow 2s ease-in-out infinite}

        .gradient-text-hero{
          background:linear-gradient(135deg,#e2e8f0 0%,var(--primary) 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }

        .skill-bar{transition:width 1.2s cubic-bezier(0.4,0,0.2,1)}

        @media(max-width:768px){
          .heading-font.hero-heading{font-size:clamp(2.5rem,12vw,4rem)!important}
        }
      `}</style>

      {/* Custom cursor (desktop only) */}
      <div style={{
        position: "fixed", left: cursorPos.x - 6, top: cursorPos.y - 6, width: 12, height: 12,
        borderRadius: "50%", background: tc.primary, pointerEvents: "none", zIndex: 9999,
        transform: cursorActive ? "scale(2.5)" : "scale(1)", transition: "transform 0.15s ease",
        display: "block",
      }} className="hidden lg:block" />
      <div style={{
        position: "fixed", left: cursorPos.x - 20, top: cursorPos.y - 20, width: 40, height: 40,
        borderRadius: "50%", border: `1.5px solid ${tc.primary}`, pointerEvents: "none", zIndex: 9998,
        opacity: 0.35, transition: "left 0.12s ease, top 0.12s ease",
      }} className="hidden lg:block" />

      {/* Scroll progress bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, height: 3, width: `${progress}%`,
        background: `linear-gradient(90deg,${tc.primary},${tc.hover})`,
        zIndex: 100, transition: "width 0.1s",
        boxShadow: `0 0 10px ${tc.glow}`,
      }} />

      {/* Theme panel */}
      <ThemePanel isDark={isDark} setDarkMode={setDarkMode} theme={theme} setTheme={setTheme} tc={tc} />

      {/* Navbar */}
      <Navbar isDark={isDark} setDarkMode={setDarkMode} tc={tc} scrollTo={scrollTo} mobileNav={mobileNav} setMobileNav={setMobileNav} />

      {/* Sections */}
      <main>
        <HeroSection tc={tc} isDark={isDark} />
        <AboutSection tc={tc} isDark={isDark} />
        <SkillsSection tc={tc} isDark={isDark} />
        <ExperienceSection tc={tc} isDark={isDark} />
        <ProjectsSection tc={tc} isDark={isDark} />
        <TestimonialsSection tc={tc} isDark={isDark} />
        {/* <CertificationsSection tc={tc} isDark={isDark} /> */}
        <ContactSection tc={tc} isDark={isDark} />
      </main>

      <Footer tc={tc} isDark={isDark} scrollTo={scrollTo} />

      {/* Back to top */}
      {backToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed", bottom: "2rem", right: "2rem", zIndex: 50,
            width: "46px", height: "46px", borderRadius: "50%",
            background: tc.primary, color: "#fff", fontSize: "18px",
            border: "none", cursor: "pointer",
            boxShadow: `0 4px 20px ${tc.glow}`,
            animation: "pulseGlow 2s ease-in-out infinite",
          }}>
          ↑
        </button>
      )}
    </div>
  );
}