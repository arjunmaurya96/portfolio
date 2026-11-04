import { useCallback, useEffect, useMemo, useState } from "react";

const SESSION_KEY = "gate-opened";
const AUTO_OPEN_MS = 5000;
// Doors take 1.5s. The money keeps falling a little longer over the site.
const RAIN_MS = 3200;

const C = {
  marigold: "#FFB320",
  orange: "#FF7A1A",
  sun: "#FFD45C",
  pink: "#FF3D8B",
  blush: "#FF8DBB",
  magenta: "#C2187A",
  red: "#E5243B",
  coral: "#FF6B5E",
  white: "#FFF6E8",
  violet: "#8B5CF6",
  lilac: "#C4A5FF",
  leaf: "#2FA36B",
  leafDark: "#1C7A52",
};

const petal = (len, w) =>
  `M0,0 C${w},${-len * 0.35} ${w * 0.8},${-len * 0.8} 0,${-len} C${-w * 0.8},${-len * 0.8} ${-w},${-len * 0.35} 0,0Z`;

function Ring({ n, len, w, fill, offset = 0, radius = 0 }) {
  return Array.from({ length: n }, (_, i) => (
    <path
      key={i}
      d={petal(len, w)}
      fill={fill}
      transform={`rotate(${offset + (i * 360) / n}) translate(0 ${-radius})`}
    />
  ));
}

function Symbols() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <symbol id="f-marigold" viewBox="-50 -50 100 100">
          <Ring n={18} len={46} w={11} fill={C.orange} />
          <Ring n={16} len={36} w={10} fill={C.marigold} offset={10} />
          <Ring n={12} len={25} w={8} fill={C.sun} offset={4} />
          <circle r="8" fill={C.orange} />
        </symbol>
        <symbol id="f-lotus" viewBox="-50 -50 100 100">
          <Ring n={10} len={47} w={15} fill={C.pink} />
          <Ring n={10} len={35} w={12} fill={C.blush} offset={18} />
          <circle r="9" fill={C.sun} />
        </symbol>
        <symbol id="f-hibiscus" viewBox="-50 -50 100 100">
          <Ring n={5} len={47} w={27} fill={C.red} />
          <Ring n={5} len={30} w={15} fill={C.coral} offset={36} />
          <circle r="6" fill={C.sun} />
        </symbol>
        <symbol id="f-jasmine" viewBox="-50 -50 100 100">
          <Ring n={6} len={46} w={17} fill={C.white} />
          <circle r="9" fill={C.marigold} />
        </symbol>
        <symbol id="f-violet" viewBox="-50 -50 100 100">
          <Ring n={12} len={46} w={10} fill={C.violet} />
          <Ring n={12} len={32} w={7} fill={C.lilac} offset={15} />
          <circle r="9" fill={C.sun} />
        </symbol>
        <symbol id="f-magenta" viewBox="-50 -50 100 100">
          <Ring n={8} len={47} w={18} fill={C.magenta} />
          <Ring n={8} len={32} w={12} fill={C.pink} offset={22.5} />
          <circle r="8" fill={C.white} />
        </symbol>
        <symbol id="f-leaf" viewBox="-50 -50 100 100">
          <path d={petal(92, 26)} fill={C.leaf} transform="translate(0 46)" />
          <path d="M0,44 L0,-40" stroke={C.leafDark} strokeWidth="2.5" />
        </symbol>
      </defs>
    </svg>
  );
}

const Use = ({ id, x, y, size, rotate = 0 }) => (
  <use
    href={`#f-${id}`}
    x={-size / 2}
    y={-size / 2}
    width={size}
    height={size}
    transform={`translate(${x} ${y}) rotate(${rotate})`}
  />
);

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const KINDS = ["marigold", "lotus", "hibiscus", "jasmine", "violet", "magenta"];
const CENTER = { x: 800, y: 500 };

function useDoorArt() {
  return useMemo(() => {
    const rand = seeded(19);
    const scatter = [];
    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 11; col++) {
        const x = col * 82 + (row % 2) * 41 + rand() * 18;
        const y = 120 + row * 82 + rand() * 18;
        if (Math.hypot(x - CENTER.x, y - CENTER.y) < 455) continue;
        const size = 50 + rand() * 34;
        const angle = rand() * 360;
        scatter.push({ kind: "leaf", x: x + 20, y: y + 18, size: size * 0.75, rotate: angle });
        scatter.push({ kind: KINDS[(row * 3 + col * 2) % KINDS.length], x, y, size, rotate: angle });
      }
    }

    // The toran: marigold swags along the top, with strands hanging at each join.
    const toran = [];
    const swag = 200;
    for (let i = 0; i < 4; i++) {
      for (let t = 0; t <= 10; t++) {
        const u = t / 10;
        const x = i * swag + u * swag;
        const y = 16 + 74 * 4 * u * (1 - u);
        toran.push({ kind: t % 5 === 0 ? "lotus" : "marigold", x, y, size: t % 5 === 0 ? 46 : 38 });
      }
      const hx = (i + 1) * swag;
      for (let k = 1; k <= 6; k++) {
        toran.push({ kind: k % 2 ? "marigold" : "jasmine", x: hx, y: 18 + k * 31, size: k % 2 ? 32 : 24 });
      }
      toran.push({ kind: "magenta", x: hx, y: 18 + 7 * 31 + 4, size: 42 });
    }
    return { scatter, toran };
  }, []);
}

function Mandala() {
  const ringFlowers = Array.from({ length: 22 }, (_, i) => {
    const a = (i / 22) * Math.PI * 2;
    return { x: CENTER.x + Math.cos(a) * 372, y: CENTER.y + Math.sin(a) * 372, kind: KINDS[i % KINDS.length], r: (a * 180) / Math.PI };
  });
  return (
    <g className="gate-bloom">
      <circle cx={CENTER.x} cy={CENTER.y} r="442" fill="#0a2d28" stroke={C.marigold} strokeWidth="5" />
      <circle cx={CENTER.x} cy={CENTER.y} r="428" fill="none" stroke={C.marigold} strokeWidth="2" strokeDasharray="3 13" strokeLinecap="round" />
      <g transform={`translate(${CENTER.x} ${CENTER.y})`}>
        <Ring n={44} len={96} w={21} fill={C.pink} radius={232} />
        <Ring n={44} len={72} w={17} fill={C.marigold} offset={4.09} radius={232} />
        <Ring n={44} len={42} w={10} fill={C.white} radius={232} />
      </g>
      {ringFlowers.map((f, i) => (
        <Use key={i} id={f.kind} x={f.x} y={f.y} size={82} rotate={f.r} />
      ))}
    </g>
  );
}

function Door({ side, art }) {
  return (
    <div className={`gate-door gate-door-${side}`}>
      <svg viewBox="0 0 800 1000" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`door-${side}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#0e3b34" />
            <stop offset="1" stopColor="#0a2d28" />
          </linearGradient>
        </defs>
        <rect width="800" height="1000" fill={`url(#door-${side})`} />
        {art.scatter.map((f, i) => (
          <Use key={i} id={f.kind} x={f.x} y={f.y} size={f.size} rotate={f.rotate} />
        ))}
        <Mandala />
        {art.toran.map((f, i) => (
          <Use key={i} id={f.kind} x={f.x} y={f.y} size={f.size} />
        ))}
        <rect x="794" width="6" height="262" fill={C.marigold} />
        <rect x="794" y="738" width="6" height="262" fill={C.marigold} />
      </svg>
    </div>
  );
}

function MoneyRain() {
  const money = useMemo(() => {
    const rand = seeded(7);
    const kinds = ["note", "coin", "note-pink", "coin"];
    return Array.from({ length: 84 }, (_, i) => ({
      kind: kinds[i % kinds.length],
      left: rand() * 100,
      drift: (rand() - 0.5) * 24,
      delay: rand() * 1.4,
      duration: 1.5 + rand() * 1.1,
      spin: 360 + Math.round(rand() * 720) * (i % 2 ? 1 : -1),
    }));
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]" aria-hidden="true">
      {money.map((m, i) => (
        <span
          key={i}
          className={`gate-money gate-${m.kind}`}
          style={{
            left: `${m.left}%`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
            "--drift": `${m.drift}vw`,
            "--spin": `${m.spin}deg`,
          }}
        >
          ₹
        </span>
      ))}
    </div>
  );
}

function shouldShow() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !sessionStorage.getItem(SESSION_KEY);
  } catch {
    return true;
  }
}

export default function IntroGate() {
  const [stage, setStage] = useState(() => (shouldShow() ? "closed" : "done"));
  const art = useDoorArt();

  const open = useCallback(() => {
    setStage((s) => (s === "closed" ? "opening" : s));
  }, []);

  useEffect(() => {
    if (stage !== "closed") return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  useEffect(() => {
    if (stage === "closed") {
      const auto = setTimeout(open, AUTO_OPEN_MS);
      const onKey = (e) => {
        if (e.key === "Escape") open();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        clearTimeout(auto);
        window.removeEventListener("keydown", onKey);
      };
    }
    if (stage === "opening") {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Blocked storage only means the gate shows again next time.
      }
      const end = setTimeout(() => setStage("done"), RAIN_MS);
      return () => clearTimeout(end);
    }
    return undefined;
  }, [stage, open]);

  if (stage === "done") return null;

  return (
    <div className={`gate ${stage === "opening" ? "gate-opening" : ""}`} role="dialog" aria-label="Welcome" onClick={open}>
      <Symbols />
      <Door side="left" art={art} />
      <Door side="right" art={art} />

      <div className="gate-card">
        <p className="gate-kicker">Welcome to our</p>
        <p className="gate-title">development world</p>
        <p className="gate-with">
          with <span>arjun_high_level_programmer</span>
        </p>
        <button type="button" className="btn btn-primary gate-enter" onClick={open}>
          Open the gate
        </button>
      </div>

      {stage === "opening" && <MoneyRain />}
    </div>
  );
}
