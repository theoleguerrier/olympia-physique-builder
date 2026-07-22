import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

import heroTheo from "@/assets/hero-theo.jpg";
import theoPool from "@/assets/theo-pool.jpg";
import coverOm from "@/assets/cover-om.jpg";
import coverFond from "@/assets/cover-fondations.jpg.asset.json";
import coverProg from "@/assets/cover-programme.jpg.asset.json";
import coverDiete from "@/assets/cover-diete.jpg.asset.json";
import coverKit from "@/assets/cover-kit.jpg.asset.json";
import coverSupp from "@/assets/cover-supplements.jpg.asset.json";
import coverMind from "@/assets/cover-mindset.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Objectif Masse® — 12 semaines · Théo Leguerrier IFBB Pro" },
      { name: "description", content: "Le programme de prise de masse de Théo Leguerrier, IFBB Pro & Top 15 Mr. Olympia. 4 phases · 50+ vidéos · accès à vie · 149€." },
      { property: "og:title", content: "Objectif Masse® — Théo Leguerrier" },
      { property: "og:description", content: "12 semaines pour atteindre ton meilleur physique. 149€ · accès à vie." },
    ],
  }),
  component: Landing,
});

const CHECKOUT = "https://theoleguerrier-pro.systeme.io/bon-de-commande-objectif-masse";
const COPPER = "#C08B5C";

/* ---------- Utilities ---------- */

function Reveal({ children, delay = 0, y = 20, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.06 });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.85s ease ${delay}ms, transform 0.85s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function WordSplit({ text, className, style, delayBase = 0 }: { text: string; className?: string; style?: React.CSSProperties; delayBase?: number }) {
  const words = text.split(" ");
  return (
    <span className={className} style={style}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em" }}>
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: delayBase + i * 0.08 }}
            style={{ display: "inline-block" }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Counter({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref} className={className}>{v}</span>;
}

/* ---------- Global overlays ---------- */

function GrainOverlay() {
  const svg =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`
    );
  return (
    <div
      aria-hidden
      style={{
        position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
        opacity: 0.035, backgroundImage: `url("${svg}")`, backgroundSize: "256px 256px",
      }}
    />
  );
}

function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setW(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, height: 2, width: `${w}%`, background: COPPER, zIndex: 9999 }} />
  );
}

function CursorFollower() {
  const dotX = useMotionValue(-100), dotY = useMotionValue(-100);
  const glowX = useSpring(dotX, { stiffness: 80, damping: 20, mass: 1 });
  const glowY = useSpring(dotY, { stiffness: 80, damping: 20, mass: 1 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => { dotX.set(e.clientX); dotY.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setBig(!!t.closest("a,button,[data-cursor]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, [dotX, dotY]);
  return (
    <>
      <motion.div aria-hidden style={{
        position: "fixed", left: glowX, top: glowY, width: 380, height: 380,
        borderRadius: "50%", background: "rgba(192,139,92,0.09)",
        translateX: "-50%", translateY: "-50%", pointerEvents: "none", zIndex: 9998,
        filter: "blur(20px)",
      }} className="hidden md:block" />
      <motion.div aria-hidden animate={{ scale: big ? 3 : 1, opacity: big ? 0.4 : 1 }} transition={{ duration: 0.25 }}
        style={{
          position: "fixed", left: dotX, top: dotY, width: 6, height: 6, borderRadius: "50%",
          background: COPPER, translateX: "-50%", translateY: "-50%", pointerEvents: "none", zIndex: 9998,
        }} className="hidden md:block" />
    </>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 68, zIndex: 200,
      background: scrolled ? "rgba(10,10,10,0.72)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div className="flex items-center justify-between h-full px-6 md:px-14">
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: "0.22em", color: "#FFFFFF" }}>
          THÉO LEGUERRIER
        </div>
        <a href={CHECKOUT} style={{
          background: COPPER, color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: "0.15em",
          textTransform: "uppercase", padding: "10px 24px", transition: "filter 0.2s",
        }} onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.9)")}
           onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}>
          Commander — 149€
        </a>
      </div>
    </nav>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#0A0A0A" }}>
      {/* Ambient glow */}
      <motion.div aria-hidden animate={{ opacity: [0.55, 0.9, 0.55] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", background:
            "radial-gradient(ellipse 45% 60% at 12% 70%, rgba(192,139,92,0.22), transparent 60%), radial-gradient(ellipse 40% 50% at 85% 20%, rgba(192,139,92,0.10), transparent 55%)",
        }} />

      {/* Watermark type derrière */}
      <div aria-hidden style={{
        position: "absolute", bottom: -60, left: -20, right: -20, fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "26vw", lineHeight: 0.8, color: "rgba(255,255,255,0.035)", pointerEvents: "none",
        textAlign: "center", zIndex: 1, whiteSpace: "nowrap",
      }}>OBJECTIF MASSE</div>

      <div className="grid grid-cols-1 lg:grid-cols-12" style={{ position: "relative", zIndex: 2, minHeight: "100vh" }}>
        {/* LEFT — texte */}
        <div className="lg:col-span-7" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "120px clamp(24px,5vw,72px) 60px" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>
              — Since 2010 · IFBB Pro
            </div>
          </div>
          <div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(64px,10vw,168px)", lineHeight: 0.86, margin: 0, color: "#fff" }}>
              <div><WordSplit text="OBJECTIF" delayBase={0.15} /></div>
              <div>
                <span style={{ ...serif, color: COPPER, fontSize: "1.02em" }}>
                  <WordSplit text="Masse." delayBase={0.35} />
                </span>
              </div>
            </h1>
            <p style={{ fontSize: 16, fontWeight: 300, color: "rgba(255,255,255,0.55)", maxWidth: 440, marginTop: 32, lineHeight: 1.6 }}>
              12 semaines pour prendre de la masse et atteindre ton meilleur physique. La méthode d'un athlète Top 15 Mr. Olympia — condensée pour toi.
            </p>
            <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <a href={CHECKOUT} style={{
                background: COPPER, color: "#fff", padding: "18px 40px", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 12,
                borderRadius: 999, transition: "all 0.25s",
              }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.filter = "brightness(0.92)"; }}
                 onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.filter = "brightness(1)"; }}>
                Je démarre <span style={{ opacity: 0.6 }}>·</span> 149€
              </a>
              <a href="#pricing" style={{
                background: "rgba(255,255,255,0.06)", color: "#fff", padding: "18px 32px", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase", borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
              }}>Voir le programme →</a>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, marginTop: 60, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
            <span>· 15 ans de compétition pro</span>
            <span className="hidden md:inline">· Top 15 Mr. Olympia</span>
            <span className="hidden md:inline">· Scroll ↓</span>
          </div>
        </div>

        {/* RIGHT — photo pleine hauteur + carte glass produit */}
        <div className="lg:col-span-5" style={{ position: "relative", minHeight: 480 }}>
          <div style={{
            position: "absolute", inset: 0, backgroundImage: `url(${heroTheo})`,
            backgroundSize: "cover", backgroundPosition: "center 20%",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to left, transparent 40%, rgba(10,10,10,0.85) 100%), linear-gradient(to top, rgba(10,10,10,0.6), transparent 40%)",
          }} />
          {/* Badge Out Now */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}
            className="hidden md:block"
            style={{
              position: "absolute", top: 120, right: 32, zIndex: 3,
              background: "rgba(255,255,255,0.08)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.14)", borderRadius: 20, padding: 20, width: 240,
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Out Now</span>
              <span style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.2)", padding: "3px 10px", borderRadius: 999 }}>2026</span>
            </div>
            <div style={{ ...bebas, fontSize: 28, color: "#fff", lineHeight: 1 }}>Objectif Masse<span style={{ color: COPPER }}>®</span></div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>12 semaines · 4 phases · 50+ vidéos</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textDecoration: "line-through" }}>199€</div>
                <div style={{ ...bebas, fontSize: 22, color: "#fff", lineHeight: 1 }}>149€</div>
              </div>
              <a href={CHECKOUT} aria-label="Commander" style={{
                width: 42, height: 42, borderRadius: "50%", background: COPPER, display: "grid", placeItems: "center", color: "#fff", fontSize: 18,
              }}>↗</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = ["OBJECTIF MASSE","THÉO LEGUERRIER","IFBB PRO","12 SEMAINES","4 PHASES","PRISE DE MASSE","FORCE BRUTE","TOP 15 OLYMPIA"];
  const row = (
    <div style={{ display: "flex", gap: 40, paddingRight: 40, flexShrink: 0 }}>
      {items.map((t, i) => (
        <span key={i} style={{ display: "flex", gap: 40, alignItems: "center", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
          {t}<span style={{ color: COPPER }}>✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div style={{ background: "#0A0A0A", height: 48, overflow: "hidden", display: "flex", alignItems: "center" }}>
      <motion.div style={{ display: "flex" }} animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, ease: "linear", repeat: Infinity }}>
        {row}{row}{row}{row}
      </motion.div>
    </div>
  );
}

/* ---------- Stats ---------- */
function Stats() {
  const items = [
    { v: <Counter to={12} />, l: "SEMAINES" },
    { v: <Counter to={4} />, l: "PHASES" },
    { v: "50+", l: "VIDÉOS" },
    { v: "∞", l: "ACCÈS À VIE" },
    { v: "TOUS", l: "NIVEAUX" },
  ];
  return (
    <section style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="grid grid-cols-2 md:grid-cols-5">
        {items.map((s, i) => (
          <div key={i} style={{
            padding: "52px 20px", textAlign: "center",
            borderRight: i < items.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
          }} className={i >= 3 ? "md:border-r" : ""}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: "#0A0A0A", lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#6A6A6A", marginTop: 6 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Reusable ---------- */
const bebas: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" };
const serif: React.CSSProperties = { fontFamily: "'DM Serif Display', serif", fontStyle: "italic" };

function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: dark ? COPPER : COPPER, marginBottom: 20 }}>
      {children}
    </div>
  );
}

function Watermark({ text, size = "22vw", color = "rgba(0,0,0,0.03)", pos }: { text: string; size?: string; color?: string; pos?: React.CSSProperties }) {
  return (
    <div aria-hidden style={{
      position: "absolute", fontFamily: "'Bebas Neue', sans-serif", fontSize: size,
      lineHeight: 0.8, color, pointerEvents: "none", top: 0, right: 0, ...pos,
    }}>{text}</div>
  );
}

function Blobs({ dark }: { dark?: boolean }) {
  const c1 = dark ? "rgba(192,139,92,0.09)" : "rgba(192,139,92,0.07)";
  return (
    <>
      <motion.div aria-hidden animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: -100, left: -150, width: 500, height: 500, borderRadius: "50%", background: c1, filter: "blur(80px)" }} />
      <motion.div aria-hidden animate={{ x: [0, -40, 0], y: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: -80, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(192,139,92,0.05)", filter: "blur(80px)" }} />
    </>
  );
}

function CTAButton({ label = "Je démarre ma transformation", dark }: { label?: string; dark?: boolean }) {
  return (
    <a href={CHECKOUT} style={{
      display: "inline-block", background: dark ? "#0A0A0A" : COPPER, color: "#fff",
      padding: dark ? "20px 64px" : "16px 44px", fontSize: dark ? 12 : 11, fontWeight: 600,
      letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.25s",
    }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.filter = dark ? "brightness(1.3)" : "brightness(0.9)"; }}
       onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.filter = "brightness(1)"; }}>
      {label}
    </a>
  );
}

/* ---------- Sections ---------- */

function Mindset() {
  return (
    <section style={{ background: "#EBEBEA", padding: "140px 24px", position: "relative", overflow: "hidden" }}>
      <Watermark text="MASSE" size="22vw" />
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
        <Reveal>
          <h2 style={{ ...bebas, fontSize: "clamp(56px,7vw,96px)", lineHeight: 1, color: "#1C1C1C", margin: 0 }}>
            CE N'EST PAS JUSTE UN <span style={{ ...serif, color: "#6A6A6A" }}>programme.</span><br />
            C'EST UNE TRANSFORMATION.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <div style={{ maxWidth: 560, marginTop: 48, fontSize: 16, lineHeight: 1.85, color: "#6A6A6A", fontWeight: 300 }}>
            <p>Je te partage ma méthode. Le savoir que j'ai engrangé sur 15 ans de compétition professionnelle — condensé dans un seul programme pour que tu prennes du muscle, développes ton meilleur physique, et adoptes le mental d'un champion.</p>
            <p style={{ marginTop: 20 }}>Parce qu'un physique transformé, ça ne s'arrête pas au miroir. Ça change la perception que tu as de toi-même. Ta confiance. La façon dont les autres te regardent.</p>
            <p style={{ marginTop: 28, fontWeight: 600, color: "#1C1C1C" }}>Booste ton physique. Booste ton mental. Élève tes standards.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Problem() {
  const cards = [
    ["01", "Tu débutes et tu ne sais pas par où commencer.", "Internet est rempli d'infos contradictoires — un dit une chose, un autre dit le contraire. Tu veux démarrer avec les bonnes bases, la bonne méthode pour progresser sans perdre de temps."],
    ["02", "Tu t'entraînes depuis des mois mais tu stagnes.", "Même poids sur la barre. Même reflet dans le miroir. Plus de volume sans surcharge progressive, c'est du cardio déguisé — pas de l'hypertrophie."],
    ["03", "Tu veux aller chercher le meilleur physique de ta vie.", "Tu connais les bases. Ce qu'il te manque c'est un système qui maximise chaque semaine et te pousse au-delà de tes limites."],
    ["04", "Tu gères ton alimentation au feeling.", "Pas d'excédent calorique structuré, macros approximatifs, récupération bâclée. L'entraînement ne fait que 30% du travail."],
  ];
  return (
    <section style={{ background: "#fff", padding: "140px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><Eyebrow>Le constat</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 style={{ ...bebas, fontSize: "clamp(44px,5.5vw,80px)", lineHeight: 1, color: "#1C1C1C", margin: 0, maxWidth: 1000 }}>
            TU T'ENTRAÎNES. MAIS TON PHYSIQUE NE REFLÈTE PAS LES EFFORTS QUE TU PRODUIS.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20, marginTop: 64 }}>
          {cards.map(([n, t, b], i) => (
            <Reveal key={n} delay={i * 100}>
              <div style={{
                background: "#fff", border: "1px solid rgba(0,0,0,0.07)", padding: "52px 44px",
                position: "relative", overflow: "hidden", transition: "all 0.4s", height: "100%",
              }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(192,139,92,0.10)"; }}
                 onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                 data-cursor>
                <div aria-hidden style={{ position: "absolute", top: -30, right: -10, ...bebas, fontSize: 160, color: "rgba(0,0,0,0.03)", lineHeight: 0.8 }}>{n}</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#1C1C1C", position: "relative" }}>{t}</div>
                <div style={{ fontSize: 14, color: "#6A6A6A", fontWeight: 300, lineHeight: 1.85, marginTop: 20, position: "relative" }}>{b}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <CTAButton />
        </div>
      </div>
    </section>
  );
}

function TrainingBanner() {
  const phases = [
    ["01", "FONDATIONS", "Semaines 1–3"],
    ["02", "GAIN SEASON", "Semaines 4–6"],
    ["03", "ACCUMULATION", "Semaines 7–11"],
    ["04", "DELOAD", "Semaine 12"],
  ];
  return (
    <section style={{ position: "relative", minHeight: "82vh", overflow: "hidden", background: "#0A0A0A" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${theoPool})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background:
        "linear-gradient(to right, rgba(8,8,8,0.90), rgba(8,8,8,0.6) 45%, rgba(8,8,8,0.15) 100%), linear-gradient(to top, rgba(8,8,8,0.5), transparent 60%)" }} />
      <div style={{ position: "relative", zIndex: 2, padding: "120px 40px", maxWidth: 560 }} className="md:pl-20">
        <div style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 20 }}>LA STRUCTURE</div>
        <h2 style={{ ...bebas, fontSize: "clamp(56px,8vw,104px)", lineHeight: 0.95, color: "#fff", margin: 0 }}>ENTRE DANS MON ARÈNE.</h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginTop: 24, maxWidth: 440 }}>
          4 phases conçues pour maximiser chaque semaine. Pas de stagnation. Pas d'improvisation. Un système.
        </p>
      </div>
      <div className="hidden lg:flex" style={{
        position: "absolute", right: 80, top: "50%", transform: "translateY(-50%)",
        flexDirection: "column", gap: 12, zIndex: 2,
      }}>
        {phases.map(([n, t, s]) => (
          <div key={n} style={{
            background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.13)", padding: "20px 24px", minWidth: 260,
          }}>
            <div style={{ fontSize: 10, letterSpacing: "0.22em", color: COPPER }}>PHASE {n}</div>
            <div style={{ ...bebas, fontSize: 28, color: "#fff", marginTop: 4 }}>{t}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{s}</div>
          </div>
        ))}
      </div>
      <div className="lg:hidden" style={{ padding: "0 40px 120px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, position: "relative", zIndex: 2 }}>
          {phases.map(([n, t, s]) => (
            <div key={n} style={{
              background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.13)", padding: "16px 18px",
            }}>
              <div style={{ fontSize: 9, letterSpacing: "0.2em", color: COPPER }}>PHASE {n}</div>
              <div style={{ ...bebas, fontSize: 20, color: "#fff", marginTop: 4 }}>{t}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bio() {
  return (
    <section style={{ background: "#EBEBEA", padding: "140px 24px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        <div className="lg:col-span-5" style={{ position: "relative" }}>
          <Reveal>
            <div style={{ position: "relative" }}>
              <img src={coverOm} alt="Objectif Masse cover" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
              <div className="hidden md:block" style={{
                position: "absolute", bottom: -28, right: -36,
                background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(0,0,0,0.07)", padding: 24, minWidth: 220,
                boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
              }}>
                <div style={{ ...bebas, fontSize: 36, color: "#1C1C1C", lineHeight: 1 }}>TOP 15</div>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6A6A6A", marginTop: 4 }}>Mr. Olympia</div>
                <div style={{ height: 1, background: "rgba(0,0,0,0.07)", margin: "16px 0" }} />
                <div style={{ ...bebas, fontSize: 28, color: "#1C1C1C", lineHeight: 1 }}>2× PRO</div>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6A6A6A", marginTop: 4 }}>Shows 2023</div>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal><Eyebrow>IFBB Pro · Top 15 Olympia</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h2 style={{ ...bebas, fontSize: "clamp(60px,6.5vw,88px)", lineHeight: 0.9, color: "#1C1C1C", margin: 0 }}>THÉO LEGUERRIER</h2>
          </Reveal>
          <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#6A6A6A", marginTop: 16, marginBottom: 52 }}>
            IFBB PRO · TOP 15 MR. OLYMPIA
          </div>
          <Reveal delay={160}>
            <div style={{ fontSize: 15, lineHeight: 1.9, color: "#1C1C1C", fontWeight: 300 }}>
              <p>J'ai dédié 15 ans de ma vie au bodybuilding et à la transformation physique.</p>
              <p style={{ marginTop: 18 }}>Chaque séance, chaque repas, chaque phase de préparation — tout est pensé, structuré, optimisé pour progresser. C'est cette obsession qui m'a amené jusqu'à Mr. Olympia, la compétition la plus sélective au monde, où je fais partie du Top 15 mondial.</p>
              <p style={{ marginTop: 18 }}>Ces 15 années m'ont permis de travailler aux côtés des meilleurs coachs et athlètes de la planète. Tester les méthodes, les protocoles, les approches — comprendre ce qui construit vraiment du muscle. Pas en théorie. Sur le terrain, sur scène devant les meilleurs juges du monde.</p>
              <p style={{ marginTop: 18, fontWeight: 500 }}>Objectif Masse c'est le condensé de tout ça.</p>
            </div>
          </Reveal>
          <ul style={{ marginTop: 52, borderTop: "1px solid rgba(0,0,0,0.1)", listStyle: "none", padding: 0 }}>
            {[
              "15 ans de compétition professionnelle à haut niveau",
              "Top 15 Mr. Olympia — parmi les meilleurs bodybuilders du monde",
              "Échanges directs avec les meilleurs coachs et athlètes mondiaux",
              "Méthode construite, testée et affinée saison après saison",
            ].map((t, i) => (
              <li key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", padding: "18px 0", fontSize: 14, color: "#1C1C1C", display: "flex", gap: 16 }}>
                <span style={{ color: COPPER }}>—</span>{t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section style={{ background: "#0A0A0A", padding: "180px 24px", position: "relative", overflow: "hidden" }}>
      <Blobs />
      <div aria-hidden style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        ...bebas, fontSize: "28vw", color: "rgba(255,255,255,0.025)", pointerEvents: "none", lineHeight: 0.8,
      }}>15</div>
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 2, textAlign: "center" }}>
        <Reveal>
          <div style={{ ...bebas, fontSize: "clamp(32px,4.5vw,64px)", lineHeight: 1.1, color: "#fff" }}>
            OBJECTIF MASSE C'EST TOUT CE QUE J'AURAIS VOULU AVOIR<br />
            <span style={{ ...serif, color: COPPER, fontSize: "1.1em" }}>quand j'ai commencé.</span>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div style={{ ...bebas, fontSize: "clamp(28px,4vw,56px)", lineHeight: 1.15, color: "#fff", marginTop: 32 }}>
            15 ANS DE TRAVAIL, DE COMPÉTITION, D'APPRENTISSAGE AU CONTACT DES MEILLEURS.<br />
            <span style={{ color: "rgba(255,255,255,0.5)" }}>CONDENSÉ EN UN SEUL PROGRAMME.</span>
          </div>
        </Reveal>
        <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginTop: 48 }}>
          — Théo Leguerrier · IFBB Pro · Top 15 Mr. Olympia
        </div>
      </div>
    </section>
  );
}

function Diff() {
  const items = [
    ["01", "Le savoir d'un Pro", "Pas une interprétation. Pas une adaptation. Les principes construits sur 15 ans de compétitions — pour que tu les appliques dès demain."],
    ["02", "Validé sur la plus grande scène", "Top 15 Mr. Olympia. Ce n'est pas une théorie. Ce sont des résultats mesurés devant les meilleurs juges du monde."],
    ["03", "Applicable à ton niveau", "Débutant, intermédiaire, confirmé. Chaque phase est structurée pour t'emmener au niveau supérieur. Le programme s'adapte à toi."],
  ];
  return (
    <section style={{ background: "#fff", padding: "140px 0 0" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
        <Reveal><Eyebrow>La différence</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 style={{ ...bebas, fontSize: "clamp(52px,6vw,88px)", lineHeight: 1, color: "#1C1C1C", margin: 0 }}>CE N'EST PAS JUSTE UN PROGRAMME.</h2>
        </Reveal>
      </div>
      <div style={{ marginTop: 80, background: "rgba(0,0,0,0.07)" }} className="grid grid-cols-1 md:grid-cols-3 gap-px">
        {items.map(([n, t, b], i) => (
          <Reveal key={n} delay={i * 100}>
            <div style={{ background: "#fff", padding: "56px 48px", position: "relative", height: "100%", transition: "all 0.35s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#EBEBEA"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(192,139,92,0.10)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              data-cursor>
              <div aria-hidden style={{ ...bebas, fontSize: 88, color: "rgba(0,0,0,0.05)", lineHeight: 0.8 }}>{n}</div>
              <div style={{ ...bebas, fontSize: 26, color: "#1C1C1C", marginTop: 12 }}>{t}</div>
              <div style={{ fontSize: 14, color: "#6A6A6A", fontWeight: 300, lineHeight: 1.85, marginTop: 16 }}>{b}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Phases() {
  const items = [
    ["01", "FONDATIONS", "Semaines 1–3", "Base technique, connexion neuromusculaire, habituation au volume. C'est ici que 90% des pratiquants vont trop vite."],
    ["02", "GAIN SEASON", "Semaines 4–6", "Force maximale, densité musculaire, surcharge intensive. Le volume diminue. L'intensité explose. Ma phase préférée."],
    ["03", "ACCUMULATION", "Semaines 7–11", "Temps sous tension, hypertrophie ciblée, fibres lentes activées. C'est ici que les transformations s'accélèrent."],
    ["04", "DELOAD", "Semaine 12", "Récupération active, supercompensation. La semaine que 90% des pratiquants négligent. Obligatoire."],
  ];
  return (
    <section style={{ background: "#0A0A0A", padding: "140px 0 0", position: "relative", overflow: "hidden" }}>
      <Blobs dark />
      <div aria-hidden style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", ...bebas, fontSize: "22vw", color: "rgba(255,255,255,0.025)", lineHeight: 0.8, pointerEvents: "none" }}>4</div>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <Reveal><Eyebrow>La structure</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 style={{ ...bebas, fontSize: "clamp(48px,5.5vw,80px)", lineHeight: 1, color: "#fff", margin: 0, maxWidth: 900 }}>
            UN PROGRAMME EN 4 PHASES POUR MAXIMISER TES RÉSULTATS.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ fontSize: 16, fontWeight: 300, color: "rgba(255,255,255,0.5)", marginTop: 24, maxWidth: 640 }}>
            Chaque phase a un objectif précis. Chaque semaine t'amène plus loin.
          </p>
        </Reveal>
      </div>
      <div style={{ marginTop: 80, background: "rgba(255,255,255,0.04)", position: "relative" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px">
        {items.map(([n, t, s, b], i) => (
          <Reveal key={n} delay={i * 80}>
            <div style={{
              background: "rgba(255,255,255,0.025)", padding: "52px 32px", position: "relative",
              overflow: "hidden", borderTop: "2px solid transparent", transition: "all 0.35s", height: "100%",
            }} onMouseEnter={(e) => { e.currentTarget.style.borderTopColor = COPPER; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
               onMouseLeave={(e) => { e.currentTarget.style.borderTopColor = "transparent"; e.currentTarget.style.background = "rgba(255,255,255,0.025)"; }}
               data-cursor>
              <div aria-hidden style={{ position: "absolute", top: -12, right: -8, ...bebas, fontSize: 140, color: "rgba(255,255,255,0.035)", lineHeight: 0.8 }}>{n}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.25em", color: COPPER, position: "relative" }}>PHASE {n}</div>
              <div style={{ ...bebas, fontSize: 34, color: "#fff", marginTop: 12, position: "relative" }}>{t}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2, position: "relative" }}>{s}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontWeight: 300, lineHeight: 1.85, marginTop: 24, position: "relative" }}>{b}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Content() {
  const cards: Array<[string, string, string, string, string[]]> = [
    ["GUIDE", "Les Fondations", coverFond.url, "01", [
      "Tu sais enfin comment périodiser ton entraînement pour ne plus jamais stagner",
      "Tu comprends la surcharge progressive — le seul principe qui garantit une progression continue",
      "Tu sais doser le volume et l'intensité selon tes objectifs",
      "Tu sais choisir entre Split et PPL selon ton profil",
      "Tu comprends pourquoi le deload est obligatoire et comment le faire correctement",
    ]],
    ["GUIDE", "Le Programme Objectif Masse®", coverProg.url, "02", [
      "Tu as un plan précis pour chaque séance — plus jamais à improviser en salle",
      "Tu progresses semaine après semaine grâce à une periodisation construite par un athlète Top 15 Olympia",
      "Tu construis du vrai muscle dense grâce aux 4 phases qui ciblent chaque mécanisme de l'hypertrophie",
      "Tu sais exactement comment faire chaque exercice grâce aux 50+ vidéos de Théo",
      "Tu sais comment gérer ton cardio et tes abdos sans nuire à ta prise de masse",
    ]],
    ["GUIDE", "La Diète Objectif Masse®", coverDiete.url, "03", [
      "Tu comprends comment calculer ton excédent calorique pour prendre du muscle sans accumuler du gras",
      "Tu sais répartir tes macros selon ton profil et tes objectifs",
      "Tu as des plans alimentaires clés en main — plus besoin de chercher quoi manger",
      "Tu évites les erreurs les plus fréquentes qui sabotent une prise de masse",
    ]],
    ["GUIDE", "Kit Optimisation — Abdos · Cardio · Mobilité", coverKit.url, "04", [
      "Tu as le circuit abdos de Théo pour construire une sangle abdominale solide et des abdos dessinés",
      "Tu sais comment intégrer le cardio en prise de masse sans nuire à tes gains",
      "Tu as une routine mobilité pour t'entraîner longtemps et récupérer plus vite",
    ]],
    ["BONUS 1", "Suppléments", coverSupp.url, "05", [
      "Tu sais quels compléments prendre pour maximiser ta performance et ta récupération",
      "Tu arrêtes de dépenser de l'argent sur des produits inutiles",
      "Tu optimises ton sommeil et ta gestion du stress pour récupérer comme un pro",
    ]],
    ["BONUS 2", "Olympia Mindset", coverMind.url, "06", [
      "Tu adoptes la discipline et l'organisation des athlètes de haut niveau",
      "Tu sais comment structurer ta semaine pour ne plus jamais rater une séance",
      "Tu accèdes à l'état d'esprit qui a amené Théo au Top 15 mondial",
    ]],
  ];
  return (
    <section style={{ background: "#EBEBEA", padding: "140px 24px", position: "relative", overflow: "hidden" }}>
      <Watermark text="5" size="22vw" />
      <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative" }}>
        <Reveal><Eyebrow>Ce que tu reçois</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 style={{ ...bebas, fontSize: "clamp(52px,6vw,88px)", lineHeight: 1, color: "#1C1C1C", margin: 0 }}>TOUT LE SYSTÈME. PAS JUSTE UN PLAN.</h2>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ fontSize: 14, color: "#6A6A6A", maxWidth: 600, marginTop: 24 }}>
            Une méthode complète — entraînement, nutrition, mindset, récupération. Tout ce dont tu as besoin pour prendre de la masse.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 20, marginTop: 64 }}>
          {cards.map(([badge, title, img, num, benefits], i) => (
            <Reveal key={num} delay={i * 80}>
              <div style={{
                background: "#EBEBEA", border: "1px solid rgba(0,0,0,0.07)", padding: "44px 36px",
                position: "relative", overflow: "hidden", transition: "all 0.35s", height: "100%",
              }} onMouseEnter={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(192,139,92,0.12)"; }}
                 onMouseLeave={(e) => { e.currentTarget.style.background = "#EBEBEA"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                 data-cursor>
                <div aria-hidden style={{ position: "absolute", top: -10, right: 8, ...bebas, fontSize: 88, color: "rgba(0,0,0,0.05)", lineHeight: 0.8 }}>{num}</div>
                <div style={{ display: "inline-block", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(0,0,0,0.1)", padding: "3px 12px", marginBottom: 20, position: "relative" }}>{badge}</div>
                <img src={img} alt={title} loading="lazy" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", maxHeight: 240, borderRadius: 4, marginBottom: 20 }} />
                <div style={{ fontSize: 18, fontWeight: 600, color: "#1C1C1C", position: "relative" }}>{title}</div>
                <ul style={{ listStyle: "none", padding: 0, marginTop: 16, position: "relative" }}>
                  {benefits.map((b, j) => (
                    <li key={j} style={{ fontSize: 13, color: "#6A6A6A", fontWeight: 300, lineHeight: 1.75, marginTop: 8 }}>— {b}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Compare() {
  const rows = [
    ["Créé par", "Inconnu · influenceur · IA", "Théo Leguerrier · IFBB Pro · Top 15 Olympia"],
    ["Méthode", "Programme fixe, aucune variabilité", "4 phases évolutives — periodisation complète"],
    ["Résultat", "Plateau garanti après 3 à 6 mois", "Progression continue — semaine après semaine"],
    ["Nutrition", "Non incluse ou générique", "Guide complet adapté à ton profil"],
    ["Vidéos techniques", "Inexistantes", "50+ exercices filmés par Théo"],
    ["Adapté à ton niveau", "Rarement", "Débutant · Intermédiaire · Confirmé"],
    ["Deload intégré", "Jamais", "Semaine 12 — obligatoire et expliqué"],
    ["Mindset", "Aucun", "Olympia Mindset inclus"],
  ];
  return (
    <section style={{ background: "#fff", padding: "140px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><Eyebrow>La comparaison</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 style={{ ...bebas, fontSize: "clamp(48px,5.5vw,80px)", lineHeight: 1, color: "#1C1C1C", margin: "0 0 64px" }}>POURQUOI PAS LES ALTERNATIVES ?</h2>
        </Reveal>
        <Reveal delay={160}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "18px 20px", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6A6A6A", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>Critère</th>
                  <th style={{ textAlign: "left", padding: "18px 20px", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6A6A6A", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>Programme basique</th>
                  <th style={{ textAlign: "left", padding: "18px 20px", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1C1C1C", borderBottom: "2px solid #1C1C1C", background: "rgba(0,0,0,0.022)" }}>OBJECTIF MASSE®</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([c, a, b], i) => (
                  <tr key={i}>
                    <td style={{ padding: "20px", fontSize: 14, color: "#1C1C1C", borderBottom: "1px solid rgba(0,0,0,0.07)", fontWeight: 500 }}>{c}</td>
                    <td style={{ padding: "20px", fontSize: 14, color: "#6A6A6A", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>{a}</td>
                    <td style={{ padding: "20px", fontSize: 14, color: "#1C1C1C", borderBottom: "1px solid rgba(0,0,0,0.07)", background: "rgba(0,0,0,0.022)", fontWeight: 500 }}>{b}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ padding: "22px 20px", fontSize: 15, fontWeight: 600, color: "#1C1C1C" }}>Prix</td>
                  <td style={{ padding: "22px 20px", fontSize: 15, fontWeight: 600, color: "#6A6A6A" }}>Gratuit — zéro valeur</td>
                  <td style={{ padding: "22px 20px", fontSize: 18, fontWeight: 600, color: "#1C1C1C", background: "rgba(0,0,0,0.022)" }}>149€ · Accès à vie</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Timeline() {
  const items = [
    ["Mois 1", "La méthode s'installe.", ["Tu comprends pourquoi tu fais ce que tu fais.", "Technique verrouillée, connexion améliorée.", "Premiers gains de force à la barre."]],
    ["Mois 2", "Le corps commence à répondre.", ["Transformation visible dans le miroir.", "Charges en hausse.", "Muscles plus denses, meilleure vascularisation."]],
    ["Mois 3", "Le tournant.", ["L'entourage commence à poser des questions.", "La routine est ancrée.", "Tu repousses des limites que tu croyais fixes."]],
    ["Semaine 12", "Ton meilleur physique.", ["Physique transformé — massif, dense, durable.", "Mindset d'athlète installé.", "Fier de ce que tu vois."]],
  ];
  return (
    <section style={{ background: "#0A0A0A", padding: "140px 0 0", position: "relative", overflow: "hidden" }}>
      <Blobs />
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <Reveal><Eyebrow>La progression</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 style={{ ...bebas, fontSize: "clamp(48px,5.5vw,80px)", lineHeight: 1, color: "#fff", margin: 0, maxWidth: 900 }}>MOIS APRÈS MOIS. UNE PROGRESSION QUE TU VAS SENTIR.</h2>
        </Reveal>
      </div>
      <div style={{ marginTop: 80, background: "rgba(255,255,255,0.03)" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px">
        {items.map(([label, title, list], i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{ background: "rgba(255,255,255,0.025)", padding: "52px 32px", height: "100%", transition: "background 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.065)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
              data-cursor>
              <div style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: i === 3 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)" }}>{label}</div>
              <div style={{ ...bebas, fontSize: 28, color: "#fff", marginTop: 8 }}>{title}</div>
              <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
                {(list as string[]).map((t, j) => (
                  <li key={j} style={{ fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.5)", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ForWhom() {
  const yes = [
    "Tu veux prendre du muscle sérieusement — débutant motivé ou intermédiaire/avancé qui stagne",
    "Tu stagnes depuis plusieurs mois sur tes charges ou tes mensurations",
    "Tu veux un protocole structuré — pas un programme aléatoire toutes les 3 semaines",
    "Tu es prêt à t'entraîner avec rigueur et à structurer ton alimentation",
    "Tu veux comprendre la méthode pour l'appliquer à vie en totale autonomie",
    "Tu veux être fier de ton physique — et de la discipline que tu auras construite",
  ];
  const no = [
    "Tu veux un résultat sans toucher à ton alimentation",
    "Tu n'as pas l'intention de tenir un programme sur 12 semaines",
    "Tu cherches une promesse magique en 4 semaines",
  ];
  return (
    <section style={{ background: "#EBEBEA", padding: "140px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><Eyebrow>Pour qui ?</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 style={{ ...bebas, fontSize: "clamp(52px,6vw,88px)", lineHeight: 1, color: "#1C1C1C", margin: "0 0 64px" }}>ENTRE. OU PASSE TON CHEMIN.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 80 }}>
          <div>
            <div style={{ ...bebas, fontSize: 22, color: "#1C1C1C", letterSpacing: "0.05em", borderBottom: "1px solid rgba(0,0,0,0.15)", paddingBottom: 20 }}>OUI, ENTRE.</div>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {yes.map((t, i) => (
                <li key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "20px 0", fontSize: 14, color: "#1C1C1C", display: "flex", gap: 16, lineHeight: 1.6 }}>
                  <span style={{ color: COPPER, fontWeight: 700 }}>+</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ ...bebas, fontSize: 22, color: "#6A6A6A", letterSpacing: "0.05em", borderBottom: "1px solid rgba(0,0,0,0.15)", paddingBottom: 20 }}>NON, PASSE.</div>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {no.map((t, i) => (
                <li key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "20px 0", fontSize: 14, color: "#6A6A6A", display: "flex", gap: 16, lineHeight: 1.6 }}>
                  <span>×</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const items = [
    "Guide 1 — Les Fondations",
    "Guide 2 — Le Programme Objectif Masse®",
    "Guide 3 — La Diète Objectif Masse®",
    "50+ vidéos techniques filmées par Théo",
    "Kit Optimisation — Abdos · Cardio · Mobilité",
    "Bonus 1 — Suppléments · Les Compléments pour Réussir ta Prise de Masse",
    "Bonus 2 — Olympia Mindset · Mindset et Organisation pour Réussir ta Prise de Masse",
    "Accès à vie · Mises à jour incluses",
  ];
  return (
    <section id="pricing" style={{ background: "#0A0A0A", padding: "140px 24px", position: "relative", overflow: "hidden" }}>
      <Blobs dark />
      <div aria-hidden style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", ...bebas, fontSize: "18vw", color: "rgba(255,255,255,0.025)", lineHeight: 0.8, pointerEvents: "none" }}>149</div>
      <div style={{ position: "relative", textAlign: "center" }}>
        <Eyebrow>L'investissement</Eyebrow>
        <h2 style={{ ...bebas, fontSize: "clamp(48px,5.5vw,80px)", lineHeight: 1, color: "#fff", margin: 0 }}>TOUT. MAINTENANT. AU BON PRIX.</h2>
      </div>
      <Reveal>
        <div style={{
          maxWidth: 680, margin: "80px auto 0", padding: "64px 44px",
          background: "rgba(255,255,255,0.08)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.13)", position: "relative",
          boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
        }}>
          <div style={{ position: "absolute", top: -1, left: 56, background: COPPER, color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", padding: "5px 16px" }}>
            OFFRE DE LANCEMENT
          </div>
          <div style={{ ...bebas, fontSize: 44, color: "#fff", marginTop: 8 }}>OBJECTIF MASSE®</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>Par Théo Leguerrier · IFBB Pro · Top 15 Mr. Olympia</div>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 32 }}>
            {items.map((t, i) => (
              <li key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 0", fontSize: 14, color: "#fff", display: "flex", gap: 12 }}>
                <span style={{ color: COPPER }}>✓</span>{t}
              </li>
            ))}
          </ul>
          <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "32px 0" }} />
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ ...bebas, fontSize: 96, color: "#fff", lineHeight: 0.9 }}>149€</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 8 }}>Paiement unique · Accès immédiat · Aucun abonnement</div>
            </div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.25)", textDecoration: "line-through", paddingBottom: 8 }}>199€</div>
          </div>
          <a href={CHECKOUT} style={{
            display: "block", textAlign: "center", background: COPPER, color: "#fff",
            padding: "18px 24px", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em",
            textTransform: "uppercase", marginTop: 32, transition: "all 0.25s",
          }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.filter = "brightness(0.9)"; }}
             onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.filter = "brightness(1)"; }}>
            JE DÉMARRE MA TRANSFORMATION — 149€
          </a>
          <div style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 20 }}>
            Paiement 100% sécurisé · Accès instantané à tout le contenu
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FAQ() {
  const items = [
    ["Est-ce que le programme est adapté aux débutants ?", "Oui. Le programme est conçu pour fonctionner à tous les niveaux. Chaque exercice est filmé en vidéo par Théo, chaque principe est expliqué depuis le début. Tu n'as pas besoin d'expérience préalable pour progresser."],
    ["Combien de jours d'entraînement par semaine ?", "Le programme est structuré pour maximiser ta progression tout en respectant ta récupération. Le détail complet est dans le Guide 2 — la récupération fait partie intégrante de la méthode, c'est pas une option."],
    ["Est-ce que j'ai accès au programme dès l'achat ?", "Oui, accès immédiat après le paiement. Tous les guides, le kit et les bonus disponibles instantanément. Accès à vie — pas d'abonnement, pas de date d'expiration."],
    ["Est-ce que le programme fonctionne sans compléments ?", "Oui. Le Bonus Suppléments est là pour ceux qui veulent optimiser — mais la base c'est ton alimentation, ton sommeil et ta rigueur à l'entraînement. Les compléments ne remplacent rien de ça."],
    ["Le prix va augmenter après le lancement ?", "Oui. 149€ c'est le prix de lancement. Si tu es sur cette page maintenant c'est le bon moment."],
    ["C'est vraiment la méthode de Théo ?", "C'est le condensé de 15 ans de compétition au plus haut niveau mondial — les principes, la logique, l'approche qui m'ont amené au Top 15 Olympia. Pas ma routine exacte — mon savoir, structuré pour que tu puisses l'appliquer quel que soit ton niveau."],
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ background: "#fff", padding: "140px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <Eyebrow>Questions fréquentes</Eyebrow>
        <h2 style={{ ...bebas, fontSize: "clamp(56px,7vw,96px)", lineHeight: 1, color: "#1C1C1C", margin: 0 }}>FAQ</h2>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {items.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
              <button onClick={() => setOpen(isOpen ? null : i)} style={{
                width: "100%", background: "none", border: "none", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "24px 0", fontSize: 16, fontWeight: 500, color: "#1C1C1C", textAlign: "left",
              }}>
                <span>{q}</span>
                <span style={{ fontSize: 24, color: COPPER, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s", lineHeight: 1 }}>+</span>
              </button>
              <div style={{ maxHeight: isOpen ? 400 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                <div style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: "#6A6A6A", paddingBottom: 24 }}>{a}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FooterCTA() {
  return (
    <section style={{ background: "#EBEBEA", padding: "160px 24px", position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        ...bebas, fontSize: "26vw", color: "rgba(0,0,0,0.025)", lineHeight: 0.8, pointerEvents: "none",
      }}>FIER</div>
      <div style={{ position: "relative", zIndex: 2, maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ ...bebas, fontSize: "clamp(56px,7vw,96px)", lineHeight: 1, color: "#1C1C1C", margin: 0 }}>
          DANS 12 SEMAINES,<br />
          <span style={{ ...serif, color: "#6A6A6A" }}>tu seras fier</span><br />
          DE CE QUE TU VOIS.
        </h2>
        <p style={{ fontSize: 16, color: "#6A6A6A", marginTop: 24, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
          Dans 12 semaines tu peux être massif, tracé, découpé — et enfin satisfait de ce que tu as construit. La seule question c'est : tu commences quand ?
        </p>
        <div style={{ marginTop: 48 }}>
          <CTAButton label="Je démarre ma transformation — 149€" dark />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#0A0A0A" }}>
      <div style={{ padding: "44px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }} className="md:px-14">
        <div style={{ ...bebas, fontSize: 14, letterSpacing: "0.22em", color: "rgba(255,255,255,0.25)" }}>THÉO LEGUERRIER · OBJECTIF MASSE®</div>
        <div style={{ display: "flex", gap: 32 }}>
          <a href={CHECKOUT} style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Commander</a>
          <a href="https://instagram.com/theoleguerrier" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>@theoleguerrier</a>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "20px 24px", textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
        © 2025 THÉO LEGUERRIER · OBJECTIF MASSE® · TOUS DROITS RÉSERVÉS · Mentions légales
      </div>
    </footer>
  );
}

function StickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.5);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 90,
      background: "rgba(10,10,10,0.96)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      borderTop: "1px solid rgba(255,255,255,0.07)", padding: "14px 24px",
      transform: show ? "translateY(0)" : "translateY(100%)", transition: "transform 0.4s ease",
      display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap",
    }} className="md:px-14">
      <div>
        <div style={{ ...bebas, fontSize: 18, color: "#fff", letterSpacing: "0.08em" }}>OBJECTIF MASSE</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Par Théo Leguerrier · IFBB Pro · Top 15 Olympia · 149€</div>
      </div>
      <a href={CHECKOUT} style={{ background: COPPER, color: "#fff", padding: "12px 24px", fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
        Commander — 149€
      </a>
    </div>
  );
}

/* ---------- Root ---------- */
function Landing() {
  return (
    <main style={{ background: "#EBEBEA", color: "#1C1C1C", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>
      <GrainOverlay />
      <ScrollProgress />
      <CursorFollower />
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Mindset />
      <Problem />
      <TrainingBanner />
      <Bio />
      <Quote />
      <Diff />
      <Phases />
      <Content />
      <Compare />
      <Timeline />
      <ForWhom />
      <Pricing />
      <FAQ />
      <FooterCTA />
      <Footer />
      <StickyBar />
    </main>
  );
}
