import { useEffect, useRef } from "react";

// Rupee notes and coins that fall from the mouse pointer. Canvas keeps it smooth,
// and the loop only runs while money is on screen.
const MAX_ITEMS = 70;
const SPAWN_DISTANCE = 34;
const GRAVITY = 0.17;

function sprite(width, height, draw) {
  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);
  draw(ctx);
  return { canvas, width, height };
}

const label = (ctx, text, x, y, size, color) => {
  ctx.fillStyle = color;
  ctx.font = `700 ${size}px "Noto Sans", "Segoe UI", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
};

function makeSprites() {
  const note = sprite(50, 26, (c) => {
    c.fillStyle = "#1f9d6f";
    c.beginPath();
    c.roundRect(0.5, 0.5, 49, 25, 3);
    c.fill();
    c.strokeStyle = "#b8f0d6";
    c.lineWidth = 1.2;
    c.beginPath();
    c.roundRect(3, 3, 44, 20, 2);
    c.stroke();
    c.fillStyle = "#b8f0d6";
    c.beginPath();
    c.ellipse(25, 13, 10, 8, 0, 0, Math.PI * 2);
    c.fill();
    label(c, "₹", 25, 13.5, 14, "#0e3b34");
  });
  const pinkNote = sprite(50, 26, (c) => {
    c.fillStyle = "#e0559a";
    c.beginPath();
    c.roundRect(0.5, 0.5, 49, 25, 3);
    c.fill();
    c.strokeStyle = "#ffd0e5";
    c.lineWidth = 1.2;
    c.beginPath();
    c.roundRect(3, 3, 44, 20, 2);
    c.stroke();
    c.fillStyle = "#ffd0e5";
    c.beginPath();
    c.ellipse(25, 13, 10, 8, 0, 0, Math.PI * 2);
    c.fill();
    label(c, "₹", 25, 13.5, 14, "#7a1148");
  });
  const coin = sprite(28, 28, (c) => {
    c.fillStyle = "#e89a00";
    c.beginPath();
    c.arc(14, 14, 13.5, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#ffc93c";
    c.beginPath();
    c.arc(14, 14, 11, 0, Math.PI * 2);
    c.fill();
    label(c, "₹", 14, 14.5, 15, "#8a5a00");
  });
  return [note, coin, pinkNote, coin];
}

export default function MoneyTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canHover || calm || !canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const sprites = makeSprites();
    const items = [];
    let frame = 0;
    let last = null;
    let count = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = items.length - 1; i >= 0; i--) {
        const m = items[i];
        m.vy += GRAVITY;
        m.x += m.vx + Math.sin(m.age / 9) * 0.7;
        m.y += m.vy;
        m.angle += m.spin;
        m.age += 1;
        const alpha = Math.min(1, (window.innerHeight + 40 - m.y) / 120);
        if (alpha <= 0) {
          items.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(m.x, m.y);
        ctx.rotate(m.angle);
        // Squash on one axis so notes look like they flutter.
        ctx.scale(1, 0.55 + 0.45 * Math.abs(Math.cos(m.age / 11)));
        ctx.drawImage(m.sprite.canvas, -m.sprite.width / 2, -m.sprite.height / 2, m.sprite.width, m.sprite.height);
        ctx.restore();
      }
      frame = items.length ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e) => {
      if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) < SPAWN_DISTANCE) return;
      last = { x: e.clientX, y: e.clientY };
      if (items.length >= MAX_ITEMS) items.shift();
      count += 1;
      items.push({
        x: e.clientX,
        y: e.clientY + 8,
        vx: (Math.random() - 0.5) * 2,
        vy: -1 - Math.random() * 1.5,
        angle: Math.random() * 6.28,
        spin: (Math.random() - 0.5) * 0.12,
        age: 0,
        sprite: sprites[count % sprites.length],
      });
      if (!frame) frame = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[120]" aria-hidden="true" />;
}
