import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useAnimationFrame, useReducedMotion, type MotionValue } from "framer-motion";

import heroTheo from "@/assets/hero-theo.jpg";
import theoPool from "@/assets/theo-pool.jpg";
import phase2Photo from "@/assets/phase-2.jpg";
import phase3Photo from "@/assets/phase-3.jpg";
import phase4Photo from "@/assets/phase-4.jpg";
import coverOm from "@/assets/cover-om.jpg";
import logoM from "@/assets/logo-m.png";
import coverFond from "@/assets/cover-fondations.jpg";
import coverProg from "@/assets/cover-programme.jpg";
import coverDiete from "@/assets/cover-diete.jpg";
import coverKit from "@/assets/cover-kit.jpg";
import coverSupp from "@/assets/cover-supplements.jpg";
import coverMind from "@/assets/cover-mindset.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import problemPhoto from "@/assets/problem-photo.jpg";
import sectionBBg from "@/assets/section-b-bg.jpg";
import forwhomYes from "@/assets/forwhom-yes-2.jpg";
import forwhomNo from "@/assets/forwhom-no.jpg";
import memberMockup from "@/assets/member-mockup.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Objectif Masse® — 12 semaines · Théo Leguerrier IFBB Pro" },
      { name: "description", content: "Le programme de prise de masse de Théo Leguerrier, IFBB Pro & Top 15 Mr. Olympia. 4 phases · 50+ vidéos · accès à vie · 99€." },
      { property: "og:title", content: "Objectif Masse® — Théo Leguerrier" },
      { property: "og:description", content: "12 semaines pour atteindre ton meilleur physique. 99€ · accès à vie." },
    ],
  }),
  component: Landing,
});

const CHECKOUT = "https://theoleguerrier-pro.systeme.io/bon-de-commande-objectif-masse";
const ACCENT = "#095591";

/* ---------- Utilities ---------- */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

function Reveal({ children, delay = 0, y = 20, x = 0, className }: { children: ReactNode; delay?: number; y?: number; x?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.06 });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0,0) scale(1)" : `translate(${-x}px, ${y}px) scale(0.98)`,
        filter: inView ? "blur(0px)" : "blur(6px)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
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

/* ---------- Global overlays ---------- */

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
    <div style={{ position: "fixed", top: 0, left: 0, height: 2, width: `${w}%`, background: ACCENT, zIndex: 9999 }} />
  );
}

function GrainOverlay() {
  return (
    <div aria-hidden style={{
      position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none",
      opacity: 0.05, mixBlendMode: "overlay",
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }} />
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 60);
      setShowBrand(window.scrollY > window.innerHeight * 0.7);
    };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px clamp(16px,3vw,32px)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: scrolled ? "rgba(10,10,10,0.55)" : "rgba(10,10,10,0.25)",
        backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999,
        padding: "10px 20px",
        opacity: showBrand ? 1 : 0, transform: showBrand ? "translateY(0)" : "translateY(-8px)",
        pointerEvents: showBrand ? "auto" : "none",
        transition: "background 0.3s ease, opacity 0.4s ease, transform 0.4s ease",
      }}>
        <Logo3D size={18} />
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: "0.22em", color: "#FFFFFF" }}>
          OBJECTIF MASSE®
        </div>
      </div>
      <a href={CHECKOUT} className="hidden sm:inline-flex" style={{
        alignItems: "center", background: ACCENT, color: "#fff", padding: "12px 24px", fontSize: 11, fontWeight: 600,
        letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: 999,
        opacity: scrolled ? 1 : 0, transform: scrolled ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.95)",
        pointerEvents: scrolled ? "auto" : "none",
        transition: "opacity 0.3s ease, transform 0.3s ease, filter 0.2s ease",
      }} onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(0.92)"; }}
         onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; }}>
        Je démarre ma transformation
      </a>
    </nav>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  return (
    <section style={{ position: "relative", minHeight: isMobile ? "86vh" : "100vh", overflow: "hidden", background: "#0A0A0A" }}>
      {/* Photo plein cadre */}
      <div style={{
        position: "absolute", inset: 0, backgroundImage: `url(${heroTheo})`,
        backgroundSize: "cover", backgroundPosition: "68% 20%",
      }} />
      {/* Transition douce texte -> photo */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(100deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.88) 30%, rgba(10,10,10,0.55) 52%, rgba(10,10,10,0.15) 72%, rgba(10,10,10,0.05) 100%), linear-gradient(to top, rgba(10,10,10,0.65), transparent 45%)",
      }} />
      {/* Ambient glow */}
      <motion.div aria-hidden animate={reduceMotion ? { opacity: 0.7 } : { opacity: [0.55, 0.9, 0.55] }} transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", background:
            "radial-gradient(ellipse 45% 60% at 12% 70%, rgba(9,85,145,0.18), transparent 60%)",
        }} />

      {/* Logo tornade — entrée test */}
      <div style={{ position: "absolute", top: 28, left: "50%", marginLeft: -24, zIndex: 6, perspective: 800 }}>
        <motion.img
          src={logoM}
          alt=""
          aria-hidden
          initial={reduceMotion ? false : { opacity: 0, rotateY: -720, scale: 0.3 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{ width: 48, height: "auto", display: "block" }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 2, minHeight: isMobile ? "86vh" : "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "120px clamp(24px,5vw,72px) 40px" : "120px clamp(24px,5vw,72px) 60px" }}>
        <div style={{ maxWidth: 680 }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(64px,10vw,168px)", lineHeight: 0.86, margin: 0, color: "#fff", transform: isMobile ? "translateY(-38px)" : "none" }}>
            <div><WordSplit text="Objectif" delayBase={0.15} /></div>
            <div>
              <span style={{ color: ACCENT }}>
                <WordSplit text="Masse" delayBase={0.35} />
              </span>
            </div>
          </h1>
          <p style={{ ...heavy, fontSize: "clamp(20px,2.6vw,30px)", color: "rgba(255,255,255,0.85)", maxWidth: 560, marginTop: 32, lineHeight: 1.4, textWrap: "balance" } as React.CSSProperties}>
            12 semaines pour prendre du muscle, gagner en force et construire un physique massif.
          </p>
          <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <a href={CHECKOUT} style={{
              background: ACCENT, color: "#fff", padding: "clamp(14px,3.5vw,18px) clamp(22px,6vw,40px)", fontSize: "clamp(10px,2.6vw,11px)", fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 12, whiteSpace: "nowrap",
              borderRadius: 999, transition: "all 0.25s",
            }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1)"; e.currentTarget.style.filter = "brightness(0.92)"; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.filter = "brightness(1)"; }}
               onMouseDown={(e) => { e.currentTarget.style.transform = "translateY(0) scale(0.96)"; }}
               onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1)"; }}>
              → Je démarre ma transformation
            </a>
          </div>
          <div style={{ marginTop: 24, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            <span style={{ textDecoration: "line-through", opacity: 0.5 }}>149€</span>{" "}
            <span style={{ color: "#fff", fontWeight: 600 }}>99€</span> · Offre de lancement
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const reduceMotion = useReducedMotion();
  const items = ["OBJECTIF MASSE®","OBJECTIF MASSE®","OBJECTIF MASSE®","OBJECTIF MASSE®","OBJECTIF MASSE®","OBJECTIF MASSE®","OBJECTIF MASSE®","OBJECTIF MASSE®"];
  const row = (
    <div style={{ display: "flex", gap: 40, paddingRight: 40, flexShrink: 0 }}>
      {items.map((t, i) => (
        <span key={i} style={{ display: "flex", gap: 40, alignItems: "center", fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
          {t}<Logo3D size={14} />
        </span>
      ))}
    </div>
  );
  return (
    <div style={{ background: "#0A0A0A", height: 48, overflow: "hidden", display: "flex", alignItems: "center" }}>
      <motion.div style={{ display: "flex", width: "max-content" }} animate={reduceMotion ? {} : { x: ["0%", "-50%"] }} transition={reduceMotion ? undefined : { duration: 22, ease: "linear", repeat: Infinity }}>
        {row}{row}{row}{row}
      </motion.div>
    </div>
  );
}

function BenefitMarquee({ items, scroll = true }: { items: [string, string][]; scroll?: boolean }) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const pill = (
    <div style={{ display: "flex", flexWrap: scroll ? "nowrap" : "wrap", gap: 12, paddingRight: scroll ? 10 : 0, flexShrink: scroll ? 0 : undefined }}>
      {items.map(([emoji, t], i) => (
        <div key={i} className="transition-transform duration-300 ease-out hover:scale-110" style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px",
          borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)",
          fontSize: 15, color: "#fff", fontWeight: 600, whiteSpace: "nowrap",
        }}>
          <span style={{ fontSize: 16 }}>{emoji}</span>
          {t}
        </div>
      ))}
    </div>
  );
  if (!scroll) {
    return <div style={{ margin: "24px 0 4px" }}>{pill}</div>;
  }
  return (
    <div style={{
      margin: "8px 0", padding: "10px 0", overflow: "hidden", position: "relative",
      maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    }}>
      <motion.div key={isMobile ? "mobile" : "desktop"} style={{ display: "flex", width: "max-content" }} animate={reduceMotion ? {} : { x: ["0%", "-50%"] }} transition={reduceMotion ? undefined : { duration: isMobile ? 30 : 60, ease: "linear", repeat: Infinity }}>
        {pill}{pill}
      </motion.div>
    </div>
  );
}

/* ---------- Photo strip ---------- */
function PhotoStrip() {
  const reduceMotion = useReducedMotion();
  const photos = [gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery10];
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const speed = useRef(50);
  const hoverSide = useRef<"left" | "right" | null>(null);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    const dt = Math.min(delta, 50) / 1000;
    const target = hoverSide.current ? 260 : 50;
    speed.current += (target - speed.current) * Math.min(1, dt * 3);
    const el = trackRef.current;
    const half = el ? el.scrollWidth / 2 : 0;
    let next = x.get() - speed.current * dt;
    if (half > 0 && next <= -half) next += half;
    x.set(next);
  });

  const row = (
    <div style={{ display: "flex", gap: 20, paddingRight: 20, flexShrink: 0 }}>
      {photos.map((src, i) => (
        <img key={i} src={src} alt="Théo Leguerrier en entraînement" loading="lazy" style={{ height: 420, width: "auto", borderRadius: 14, display: "block" }} />
      ))}
    </div>
  );
  return (
    <div style={{ background: "#0A0A0A", padding: "64px 0", overflow: "hidden", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to right, #0A0A0A 0%, transparent 8%, transparent 92%, #0A0A0A 100%)",
      }} />
      <div
        className="hidden md:block"
        style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "20%", zIndex: 3, cursor: "pointer" }}
        onMouseEnter={() => { hoverSide.current = "left"; }}
        onMouseLeave={() => { hoverSide.current = null; }}
      />
      <div
        className="hidden md:block"
        style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "20%", zIndex: 3, cursor: "pointer" }}
        onMouseEnter={() => { hoverSide.current = "right"; }}
        onMouseLeave={() => { hoverSide.current = null; }}
      />
      <motion.div ref={trackRef} style={{ display: "flex", x }}>
        {row}{row}
      </motion.div>
    </div>
  );
}

/* ---------- Stats ---------- */
/* ---------- Reusable ---------- */
const bebas: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" };
const serif: React.CSSProperties = { fontFamily: "'DM Serif Display', serif", fontStyle: "italic" };
const heavy: React.CSSProperties = { fontFamily: "'Archivo', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" };

function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: dark ? ACCENT : ACCENT, marginBottom: 20 }}>
      {children}
    </div>
  );
}

function ScrollWord({ word, i, count, progress }: { word: string; i: number; count: number; progress: MotionValue<number> }) {
  const start = i / count;
  const end = start + 1 / count;
  const opacity = useTransform(progress, [start, end], [0.25, 1]);
  return (
    <motion.span style={{ opacity, display: "inline-block", marginRight: "0.28em" }}>
      {word}
    </motion.span>
  );
}

function ScrollHeading({ text, as = "h2", style, className }: { text: string; as?: "h1" | "h2" | "p"; style?: React.CSSProperties; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.42"] });
  const lines = text.split("\n");
  const words = lines.flatMap((l) => l.split(" "));
  const Tag = as as any;
  let wordIndex = 0;
  return (
    <Tag ref={ref} style={style} className={className}>
      {lines.map((line, li) => (
        <span key={li} style={{ display: "block" }}>
          {line.split(" ").map((w) => {
            const gi = wordIndex++;
            return <ScrollWord key={gi} word={w} i={gi} count={words.length} progress={scrollYProgress} />;
          })}
        </span>
      ))}
    </Tag>
  );
}

function Logo({ size = 22, color = "#fff", chrome = false }: { size?: number; color?: string; chrome?: boolean }) {
  const path = "M10 105 V25 L20 15 H30 L60 65 L90 15 H100 L110 25 V105 H92 V50 L65 95 H55 L28 50 V105 Z";
  if (!chrome) {
    return (
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden>
        <path d={path} fill={color} />
      </svg>
    );
  }
  const gid = "logoChrome";
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#f5f7fa" />
          <stop offset="18%" stopColor="#9aa5b1" />
          <stop offset="32%" stopColor="#e8ecef" />
          <stop offset="48%" stopColor="#5c6773" />
          <stop offset="60%" stopColor="#c9ced4" />
          <stop offset="75%" stopColor="#3a4149" />
          <stop offset="88%" stopColor="#dde1e5" />
          <stop offset="100%" stopColor="#7a828c" />
        </linearGradient>
      </defs>
      <path d={path} fill={`url(#${gid})`} stroke="#1c1f24" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function Logo3D({ size = 18 }: { size?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <div style={{ perspective: 300, display: "inline-block" }}>
      <motion.img
        src={logoM}
        alt=""
        aria-hidden
        animate={reduceMotion ? { rotateY: 0 } : { rotateY: [-18, 18, -18] }}
        transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: size, height: "auto", display: "block" }}
      />
    </div>
  );
}

function CTAButton({ label = "Je démarre ma transformation", dark }: { label?: string; dark?: boolean }) {
  return (
    <a href={CHECKOUT} style={{
      display: "inline-block", background: dark ? "#fff" : ACCENT, color: dark ? "#0A0A0A" : "#fff",
      padding: dark ? "20px 64px" : "16px 44px", fontSize: dark ? 12 : 11, fontWeight: 600,
      letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: 999, transition: "all 0.25s",
    }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1)"; e.currentTarget.style.filter = "brightness(0.9)"; }}
       onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.filter = "brightness(1)"; }}
       onMouseDown={(e) => { e.currentTarget.style.transform = "translateY(0) scale(0.96)"; }}
       onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1)"; }}>
      {label}
    </a>
  );
}

/* ---------- Sections ---------- */

function ProfileCard({ n, t, b, level }: { n: string; t: string; b: string[]; level: string; index: number }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", padding: "40px 36px", borderRadius: 20,
        background: hover ? "rgba(9,85,145,0.07)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hover ? "rgba(9,85,145,0.5)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: hover ? "0 24px 50px rgba(9,85,145,0.22)" : "0 1px 0 rgba(0,0,0,0)",
        transform: hover ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, border-color 0.3s ease, box-shadow 0.35s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 40, height: 40, borderRadius: "50%", border: `1px solid ${hover ? "rgba(9,85,145,0.7)" : "rgba(9,85,145,0.35)"}`,
          transition: "border-color 0.3s ease", flexShrink: 0,
        }}>
          <span style={{ ...serif, fontSize: 16, color: ACCENT }}>{n}</span>
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", padding: "4px 10px", borderRadius: 999,
          background: ACCENT, fontSize: 12, fontWeight: 800, letterSpacing: "0.05em", color: "#fff",
        }}>{level}</div>
      </div>
      <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 24 }}>{t}</div>
      <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginTop: 14, display: "flex", flexDirection: "column", gap: 14 }}>
        {b.map((p, i) => <p key={i} style={i === b.length - 1 ? { color: "#fff", fontWeight: 600 } : undefined}>{p}</p>)}
      </div>
    </div>
  );
}

function Problem() {
  const isMobile = useIsMobile();
  const cards = [
    { n: "01", t: "Tu débutes en musculation", level: "Débutant", b: [
      "Full body, PPL, surcharge progressive… Tu te perds dans tous ces termes. Entre les influenceurs que tu suis et ce que tu trouves sur YouTube, tout se contredit. Et difficile de savoir par où commencer.",
      "Avec ce programme, tu seras guidé pas à pas, sans jamais te sentir perdu. Chaque exercice est filmé pour t'assurer une bonne exécution.",
      "Tu construis un physique massif en évitant les erreurs de débutant et les blessures.",
    ] },
    { n: "02", t: "Tu t'entraînes depuis des mois ou des années, mais tu stagnes", level: "Intermédiaire", b: [
      "Tu es régulier, mais tes charges et ton physique n'ont pas bougé depuis longtemps. Tu as peut-être déjà lâché puis repris, et ta diète, tu la gères à peu près.",
      "Il ne te manque pas de la volonté : il te manque une méthode où rien n'est laissé au hasard.",
      "C'est le profil qui décolle le plus vite avec ce programme.",
    ] },
    { n: "03", t: "Tu as des années de pratique et tu veux passer un cap", level: "Avancé", b: [
      "Tu connais ton sujet, tu n'as pas besoin qu'on t'apprenne à t'entraîner.",
      "Ce que tu cherches, c'est la méthode d'un athlète de haut niveau : la périodisation, la gestion de l'intensité, le deload.",
      "De quoi aller chercher le meilleur physique de ta vie.",
    ] },
  ];
  return (
    <section style={{ background: "#0A0A0A", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="grid grid-cols-1 lg:grid-cols-12" style={{ alignItems: "stretch" }}>
        <div className="lg:col-span-6" style={{ paddingTop: isMobile ? 100 : 140, paddingBottom: 64, paddingRight: 16, paddingLeft: "clamp(24px, 6vw, 88px)" }}>
          <div style={{ maxWidth: 740, margin: "0 auto" }}>
            <Reveal><Eyebrow>Le constat</Eyebrow></Reveal>
            <ScrollHeading text={"Tu t'entraînes depuis des mois,\nvoire des années.\nPourtant, ton physique\nn'est toujours pas à la hauteur\nde tes ambitions ?"} style={{ ...heavy, fontSize: "clamp(28px,3.3vw,40px)", lineHeight: 1.2, color: "#fff", margin: 0 }} />
            <Reveal delay={140}>
              <div style={{ marginTop: 32, fontSize: 16, lineHeight: 1.9, color: "rgba(255,255,255,0.55)", fontWeight: 400, borderLeft: "2px solid rgba(9,85,145,0.35)", paddingLeft: 24 }}>
                <p>Tu t'entraînes quand tu peux. Parfois régulièrement, parfois moins. <span style={{ color: "#fff", fontWeight: 600 }}>Tes charges sont les mêmes depuis des mois. Ton physique aussi.</span></p>
                <p style={{ marginTop: 24 }}>Ta diète, tu la gères au feeling. Un jour tu manges plus, le lendemain moins. <span style={{ color: "#fff", fontWeight: 600 }}>Tu ne sais jamais vraiment ce que tu construis.</span></p>
                <p style={{ marginTop: 24 }}>À la salle, tu choisis ta séance au dernier moment. Tu restes sur les exercices que tu connais.</p>
                <p style={{ marginTop: 24 }}>Tu as déjà essayé de changer : nouvelle méthode, nouveaux exercices, nouveau split. <span style={{ color: "#fff", fontWeight: 600 }}>Quelques semaines plus tard, tu reviens à tes habitudes.</span></p>
                <p style={{ marginTop: 24 }}>Ce qu'il te faut, c'est <span style={{ color: "#fff", fontWeight: 600 }}>une vraie périodisation.</span> Un plan où chaque séance, chaque série et chaque repas te rapprochent d'un physique massif et sec.</p>
                <p style={{ marginTop: 28, fontWeight: 600, color: "#fff", fontSize: 17, lineHeight: 1.6 }}>C'est exactement ce que j'ai construit avec Objectif Masse® : 15 ans d'expérience au plus haut niveau condensés en 12 semaines, où rien n'est laissé au hasard.</p>
                <BenefitMarquee scroll={false} items={[
                  ["🦍", "Un physique massif et sec"],
                  ["💪", "+ de volume musculaire"],
                  ["🏋️", "+ de force"],
                  ["🧠", "Un mindset de champion"],
                ]} />
              </div>
            </Reveal>
            <div style={{ marginTop: 40 }}>
              <CTAButton />
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 h-[460px] lg:h-auto" style={{ position: "relative", paddingLeft: "clamp(0px, 3vw, 36px)" }}>
          <Reveal className="h-full">
            <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
              <img src={problemPhoto} alt="Théo Leguerrier en entraînement" loading="lazy"
                style={{
                  width: "100%", height: "100%", objectFit: "cover", objectPosition: "68% 20%", display: "block",
                  maskImage: "radial-gradient(ellipse 62% 64% at 55% 40%, black 25%, transparent 95%)",
                  WebkitMaskImage: "radial-gradient(ellipse 62% 64% at 55% 40%, black 25%, transparent 95%)",
                }} />
            </div>
          </Reveal>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 24px 64px" }}>
        <ScrollHeading text="Peu importe où tu en es" style={{ ...heavy, fontSize: "clamp(26px,3vw,38px)", lineHeight: 1.1, color: "#fff", margin: 0 }} />
        <Reveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 40, gap: 20 }}>
            {cards.map((c, i) => (
              <ProfileCard key={c.n} n={c.n} t={c.t} b={c.b} level={c.level} index={i} />
            ))}
          </div>
        </Reveal>
        <div style={{ textAlign: "center", marginTop: 64 }}>
          <CTAButton />
        </div>
      </div>
    </section>
  );
}

function Bio() {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  return (
    <section style={{ background: "#0A0A0A", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="grid grid-cols-1 lg:grid-cols-12" style={{ alignItems: "stretch" }}>
        <div className="lg:col-span-5 h-[420px] lg:h-auto order-2 lg:order-1" style={{ position: "relative" }}>
          <Reveal className="h-full">
            <div style={{ position: "absolute", inset: 0 }}>
              <img src={coverOm} alt="Théo Leguerrier" style={{
                width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block",
                maskImage: "radial-gradient(ellipse 62% 64% at 50% 40%, black 25%, transparent 95%)",
                WebkitMaskImage: "radial-gradient(ellipse 62% 64% at 50% 40%, black 25%, transparent 95%)",
              }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0) 70%, rgba(0,0,0,0.5) 100%)" }} className="hidden lg:block" />
              <motion.div
                animate={reduceMotion ? {} : { y: [0, -6, 0] }}
                transition={reduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute", bottom: "clamp(16px,4vw,32px)", right: "clamp(16px,4vw,32px)",
                  background: "rgba(20,20,20,0.55)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.14)", padding: "clamp(14px,3.5vw,24px)", minWidth: "clamp(150px,40vw,200px)", borderRadius: 28,
                  boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
                }}>
                <div style={{ fontSize: "clamp(9px,2.2vw,10px)", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Top 15</div>
                <div style={{ ...bebas, fontSize: "clamp(19px,5vw,26px)", color: "#fff", lineHeight: 1, marginTop: 4 }}>Mr. Olympia</div>
                <div style={{ fontSize: "clamp(11px,2.8vw,13px)", color: "rgba(255,255,255,0.55)", marginTop: 8 }}>15 ans d'expérience</div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "clamp(10px,3vw,16px) 0" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6px,2vw,10px)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="18" height="14" viewBox="0 0 24 18" fill="none"><rect x="0.5" y="0.5" width="23" height="17" rx="5" fill="#FF0000" /><path d="M10 5.5l7 3.5-7 3.5v-7z" fill="#fff" /></svg>
                    <span style={{ fontSize: "clamp(14px,3.6vw,17px)", fontWeight: 600, color: "#fff" }}>174K</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <defs>
                        <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FFDD55" /><stop offset="35%" stopColor="#FF543E" /><stop offset="65%" stopColor="#C837AB" /><stop offset="100%" stopColor="#5B51D8" />
                        </linearGradient>
                      </defs>
                      <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#igGrad)" strokeWidth="1.8" />
                      <circle cx="12" cy="12" r="4" stroke="url(#igGrad)" strokeWidth="1.8" />
                      <circle cx="17.3" cy="6.7" r="1" fill="#FF543E" />
                    </svg>
                    <span style={{ fontSize: "clamp(14px,3.6vw,17px)", fontWeight: 600, color: "#fff" }}>180K</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2" style={{ padding: isMobile ? "100px 24px 64px" : "140px 24px 64px" }}>
          <div style={{ maxWidth: 640 }}>
            <Reveal><Eyebrow>Théo Leguerrier</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 style={{ ...bebas, fontSize: "clamp(52px,6vw,80px)", lineHeight: 0.95, color: "#fff", margin: "0 0 16px" }}>Qui <span style={{ ...serif, color: ACCENT }}>suis-je</span></h2>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", fontWeight: 500, marginBottom: 36 }}>Bodybuilder Mr. Olympia</div>
            </Reveal>
            <Reveal delay={160}>
              <div style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>
                <p>Plus de 15 ans que je m'entraîne de manière structurée, avec un seul objectif : construire un meilleur physique année après année.</p>
                <p style={{ marginTop: 24 }}>Cette obsession m'a mené jusqu'au Mr. Olympia, la plus grosse compétition de bodybuilding au monde.</p>
                <p style={{ marginTop: 24 }}>Ces années, je les ai passées à m'entraîner dans les meilleures salles du monde, aux côtés des meilleurs coachs et athlètes.</p>
                <p style={{ marginTop: 24 }}>À tester des méthodes sur mon propre corps. Mais aussi à accompagner des centaines de personnes : du débutant complet au pratiquant confirmé.</p>
                <p style={{ marginTop: 24 }}>Sur YouTube (174K) et Instagram (180K), je partage mon quotidien et des conseils gratuits sur le bodybuilding.</p>
                <p style={{ marginTop: 24 }}>Mais je voulais aller plus loin, pour ceux qui sont vraiment motivés à se transformer.</p>
                <p style={{ marginTop: 24 }}>C'est la raison pour laquelle j'ai créé Objectif Masse®.</p>
                <p style={{ marginTop: 28, fontWeight: 500, color: "#fff" }}>Pour réunir dans un seul programme tout ce que je sais : mes 15 années d'expérience, et le mindset qui m'a amené jusqu'à la scène du Mr. Olympia.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FullPhotoStatementB() {
  return (
    <section style={{ background: "#EBEBEA", padding: "clamp(72px,20vw,140px) 24px 120px" }}>
      <Reveal y={40}>
        <div style={{
          maxWidth: 1320, margin: "0 auto", borderRadius: 48, overflow: "hidden", position: "relative",
          background: "linear-gradient(155deg, #1C1C1C, #0A0A0A)",
          boxShadow: "0 50px 140px rgba(0,0,0,0.25)",
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-7" style={{ alignItems: "stretch" }}>
            <div className="lg:col-span-3" style={{ padding: "64px clamp(32px,5vw,64px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <ScrollHeading text="Objectif Masse®, ce n'est pas qu'un programme de transformation physique." style={{ ...bebas, fontSize: "clamp(24px,2.4vw,34px)", lineHeight: 1.08, color: "#fff", margin: 0, maxWidth: 640 }} />
              <Reveal delay={140}>
                <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400, fontSize: 15, color: "rgba(255,255,255,0.85)", marginTop: 24, maxWidth: 640, lineHeight: 1.75 }}>
                  <p>Dans 12 semaines, tu auras le physique dont tu as toujours rêvé. Massif, fort, volumineux.</p>
                  <p style={{ marginTop: 20 }}>C'est ce que tu es venu chercher, et c'est ce que tu auras si tu appliques la méthode à la lettre. <span style={{ color: "#fff", fontWeight: 600 }}>Mais ce n'est pas le plus important.</span></p>
                  <p style={{ marginTop: 20, ...serif, color: ACCENT, fontSize: "clamp(17px,1.8vw,22px)", lineHeight: 1.3 } as React.CSSProperties}>Le plus important, c'est la personne que tu deviendras en le construisant.</p>
                  <p style={{ marginTop: 20 }}>Parce que tenir 12 semaines, sans rien lâcher, aller à la séance même les jours où tu n'as pas envie, ça ne construit pas que du muscle. <span style={{ color: "#fff", fontWeight: 600 }}>Ça construit une mentalité.</span></p>
                  <p style={{ marginTop: 20 }}>C'est exactement ce que je te transmets ici. Pas seulement ma méthode d'entraînement, mais aussi l'état d'esprit qui m'a mené jusqu'à la scène du Mr. Olympia.</p>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div style={{ ...heavy, fontSize: "clamp(16px,1.6vw,19px)", color: "#fff", marginTop: 20 }}>Maintenant, à toi de jouer.</div>
              </Reveal>
              <Reveal delay={180}>
                <div style={{ marginTop: 28 }}>
                  <a href={CHECKOUT} style={{
                    display: "inline-block", background: "#fff", color: ACCENT,
                    padding: "16px 36px", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
                    textTransform: "uppercase", borderRadius: 999, transition: "all 0.25s",
                  }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1)"; e.currentTarget.style.filter = "brightness(0.95)"; }}
                     onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.filter = "brightness(1)"; }}
                     onMouseDown={(e) => { e.currentTarget.style.transform = "translateY(0) scale(0.97)"; }}
                     onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1)"; }}>
                    → Je démarre ma transformation — 99€
                  </a>
                </div>
              </Reveal>
            </div>
            <div className="h-[220px] lg:h-auto lg:col-span-4" style={{ position: "relative" }}>
              <img src={sectionBBg} alt="Théo Leguerrier" style={{
                width: "100%", height: "100%", objectFit: "cover", objectPosition: "55% 22%", display: "block",
                filter: "grayscale(1) contrast(1.05)",
                maskImage: "radial-gradient(ellipse 82% 84% at 42% 45%, black 10%, transparent 82%)",
                WebkitMaskImage: "radial-gradient(ellipse 82% 84% at 42% 45%, black 10%, transparent 82%)",
              }} />
              <div className="hidden lg:block" style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #0A0A0A 0%, rgba(10,10,10,0.85) 18%, rgba(10,10,10,0.4) 38%, transparent 62%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.8), transparent 48%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.6), transparent 30%)" }} />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function PhaseCard({ n, title, weeks, body, photo, delay, photoPosition = "center 20%", fadeBottom }: { n: string; title: string; weeks: string; body: string[]; photo: string; delay: number; photoPosition?: string; fadeBottom?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div ref={ref} style={{ position: "relative", minHeight: "90vh", overflow: "hidden", display: "flex", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <img src={photo} alt={`Théo Leguerrier — ${title}`} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: photoPosition }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.25) 100%)" }} />
      {fadeBottom && (
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 78%, #0F0F0F 100%)" }} />
      )}
      <div aria-hidden style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 4, zIndex: 3,
        background: inView ? "rgba(9,85,145,0.85)" : "rgba(9,85,145,0.3)",
        transition: `background 0.6s ease ${delay}ms`,
      }} />
      <div style={{
        position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", padding: "0 40px", width: "100%",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.25em", color: ACCENT, textTransform: "uppercase" }}>Phase {n}</div>
          <div style={{ ...bebas, fontSize: "clamp(48px,6.5vw,84px)", color: "#fff", marginTop: 12, lineHeight: 1 }}>{title}</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginTop: 10 }}>{weeks}</div>
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 14 }}>
            {body.map((p, i) => (
              <p key={i} style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", fontWeight: 400, lineHeight: 1.85 }}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Phases() {
  const isMobile = useIsMobile();
  const items = [
    { n: "01", title: "Les Fondations", weeks: "Semaines 1 à 3", photo: theoPool,
      body: [
        "On installe les bases qui vont te permettre d'encaisser les 9 semaines suivantes : tempo, amplitude, tension maximale sur le muscle. Chaque série compte et chaque répétition te rapproche de ton objectif.",
        "Tu vas ressentir des choses que tu n'as jamais senties sur des exercices que tu fais depuis des années.",
        "Et tu poses les bases qui porteront leurs fruits sur les phases suivantes.",
        "C'est maintenant que ta transformation commence vraiment.",
      ] },
    { n: "02", title: "Gain Season", weeks: "Semaines 4 à 7", photo: phase2Photo,
      body: [
        "Ma phase préférée. Tu vas vite comprendre pourquoi.",
        "Le volume et l'intensité montent ensemble. Tu progresses à chaque séance : tu pousses plus lourd, tu vas chercher la répétition supplémentaire, tes séries sont de mieux en mieux exécutées.",
        "Et ton physique commence à évoluer : tu prends en densité et en volume.",
        "Ton physique change. Tes performances aussi.",
      ] },
    { n: "03", title: "Accumulation", weeks: "Semaines 8 à 11", photo: phase3Photo,
      body: [
        "Là, on passe au niveau au-dessus.",
        "Quatre semaines à intensité maximale, où tu vas chercher loin dans chaque série sans jamais lâcher ton exécution.",
        "Ton alimentation et ton sommeil deviennent aussi importants que ta séance. Ne t'en fais pas : tout le programme est construit pour que tu tiennes ce rythme.",
        "C'est souvent ici que ton entourage commence à te demander ce que tu as changé.",
      ] },
    { n: "04", title: "Deload", weeks: "Semaine 12", photo: phase4Photo, photoPosition: "center 25%", fadeBottom: true,
      body: [
        "Volume réduit, intensité réduite, aucune série à l'échec. Mais ne te trompe pas : ce n'est pas du repos.",
        "Après onze semaines à pousser, c'est le moment où tout le travail accumulé se transforme enfin en muscle.",
        "Tu termines le programme frais, plus massif, avec un physique que tu n'as jamais eu auparavant.",
        "Et c'est exactement à ça que sert cette semaine : te permettre de relancer un cycle avec tes nouvelles charges. C'est comme ça, cycle après cycle, qu'on repousse les limites de son physique.",
      ] },
  ];
  return (
    <section style={{ background: "#0F0F0F", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: isMobile ? "100px 24px 64px" : "140px 24px 64px", position: "relative" }}>
        <Reveal><Eyebrow>La structure</Eyebrow></Reveal>
        <ScrollHeading text="Les 4 phases qui bâtiront ton meilleur physique" style={{ ...heavy, fontSize: "clamp(36px,4.5vw,60px)", lineHeight: 1.1, color: "#fff", margin: 0, maxWidth: 800 }} />
        <Reveal delay={160}>
          <p style={{ fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.5)", marginTop: 24, maxWidth: 640 }}>
            Le programme est découpé en 4 phases. Chacune a un objectif précis, et chacune te rapproche du résultat final : un physique massif.
          </p>
        </Reveal>
      </div>
      {items.map((it, i) => (
        <PhaseCard key={it.n} n={it.n} title={it.title} weeks={it.weeks} body={it.body} photo={it.photo} delay={i * 150} photoPosition={it.photoPosition} fadeBottom={it.fadeBottom} />
      ))}
      <div style={{ textAlign: "center", padding: "72px 24px" }}>
        <CTAButton />
      </div>
    </section>
  );
}

function CardReveal({ children, index }: { children: ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70, scale: 0.92, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

function ContentCard({ badge, title, subtitle, img, intro, body, index, accent }: { badge: string; title: string; subtitle: string; img: string; intro?: string; body: string[]; index: number; accent?: boolean }) {
  return (
    <CardReveal index={index}>
      <div className="group transition-transform duration-500 ease-out hover:scale-[1.03]" style={{
        background: accent ? ACCENT : "#F5F5F3", border: accent ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.06)", borderRadius: 20,
        boxShadow: accent ? "0 16px 40px rgba(9,85,145,0.35)" : "0 12px 32px rgba(0,0,0,0.06)", height: "100%", overflow: "hidden",
      }}>
        <div style={{ overflow: "hidden", aspectRatio: "4 / 5" }}>
          <img src={img} alt={title} loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
        </div>
        <div style={{ padding: "18px 22px 24px" }}>
          <div style={{ fontSize: 17, lineHeight: 1.5 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", verticalAlign: "middle", marginRight: 7,
              padding: "2px 9px", borderRadius: 999,
              border: `1.5px solid ${accent ? "rgba(255,255,255,0.5)" : "rgba(9,85,145,0.4)"}`,
              fontSize: 10, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase",
              color: accent ? "#fff" : ACCENT,
            }}>{badge}</span>
            <span style={{ fontWeight: 600, color: accent ? "#fff" : "#1C1C1C" }}>{title}</span>
          </div>
          <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 400, fontSize: 14, color: accent ? "rgba(255,255,255,0.65)" : "#6A6A6A", marginTop: 5 }}>{subtitle}</div>
          {intro && (
            <div style={{ fontSize: 14, fontStyle: "italic", color: accent ? "rgba(255,255,255,0.8)" : "rgba(28,28,28,0.55)", lineHeight: 1.55, marginTop: 13 }}>{intro}</div>
          )}
          <ul style={{ listStyle: "none", padding: 0, marginTop: 13 }}>
            {body.map((b, j) => (
              <li key={j} style={{ display: "flex", gap: 9, fontSize: 14, color: accent ? "rgba(255,255,255,0.85)" : "rgba(28,28,28,0.6)", fontWeight: 400, lineHeight: 1.55, marginTop: j > 0 ? 10 : 0 }}>
                <span style={{ color: accent ? "#fff" : ACCENT, flexShrink: 0 }}>✓</span>{b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardReveal>
  );
}

function Content() {
  const isMobile = useIsMobile();
  const guideCards = [
    { badge: "GUIDE 1", title: "Les Fondations", subtitle: "Vidéo thématique + Guide", img: coverFond,
      intro: "La méthode derrière le programme. Celle que tu appliqueras pendant 12 semaines, puis toute ta vie.",
      body: [
        "Périodiser ton entraînement pour ne plus jamais plafonner",
        "Appliquer vraiment la surcharge progressive, pas juste « mettre plus lourd »",
        "Doser volume et intensité selon ta phase",
        "Choisir entre Split et PPL selon ton emploi du temps",
        "Comprendre pourquoi le deload est obligatoire",
      ] },
    { badge: "GUIDE 2", title: "Le Plan d'Entraînement Objectif Masse®", subtitle: "Vidéo thématique + Guide", img: coverProg,
      intro: "Le cœur du programme. 12 semaines, 4 phases, pour ne plus jamais te sentir perdu.",
      body: [
        "6 séances par semaine, avec chaque muscle travaillé 2 fois sous deux angles différents",
        "Pour chaque exercice : séries, reps, temps de repos et notes d'exécution",
        "50 vidéos d'exercices pour ne plus jamais te demander si tu exécutes correctement",
        "Une alternative filmée pour chaque mouvement : machine occupée ou absente, tu auras toujours une solution",
      ] },
    { badge: "GUIDE 3", title: "La Diète Objectif Masse®", subtitle: "Vidéo thématique + Guide", img: coverDiete,
      intro: "Tu peux t'entraîner comme un champion : sans l'alimentation qui suit, tu ne construiras rien.",
      body: [
        "4 plans alimentaires complets selon ton poids : chaque repas, chaque aliment, chaque quantité en grammes, du réveil au coucher",
        "Le timing exact de tes repas autour de l'entraînement, shakers compris",
        "Ton besoin calorique et ton surplus, calculés avec ma méthode",
        "Tes macros réparties selon ton poids de corps",
        "Des tables d'équivalences pour remplacer un aliment par un autre sans déséquilibrer ton plan",
        "Les erreurs qui ruinent la majorité des prises de masse",
      ] },
  ];
  const otherCards = [
    { badge: "KIT OPTIMISATION", title: "Abdos · Cardio · Mobilité", subtitle: "Vidéos thématiques + Kit", img: coverKit,
      body: [
        "Le circuit abdos que j'utilise moi-même, pour une sangle solide et des abdos visibles",
        "Le protocole cardio pour rester sec pendant ta prise de masse, sans nuire à tes gains musculaires",
        "La routine mobilité pour encaisser 12 semaines de charges lourdes sans te blesser et préserver ta santé sur le long terme",
      ] },
    { badge: "BONUS 1", title: "Les compléments alimentaires de la prise de masse", subtitle: "Vidéo thématique + Guide", img: coverSupp, accent: true,
      body: [
        "Plus de 20 compléments passés en revue, avec le dosage exact et le moment de prise",
        "Exactement ce que je prends au quotidien en prise de masse, et ce que j'évite",
        "Ce qu'il te faut pour mieux dormir et mieux récupérer",
      ] },
    { badge: "BONUS 2", title: "Olympia Mindset", subtitle: "Vidéo thématique + Guide", img: coverMind, accent: true,
      body: [
        "Comment rester régulier les jours où la motivation n'est pas là",
        "L'organisation d'un athlète : meal prep, planning, séances préparées à l'avance",
        "Le protocole récupération complet : sommeil, sauna, bain froid, massages",
        "L'état d'esprit qui m'a mené jusqu'à la scène du Mr. Olympia",
      ] },
  ];
  return (
    <>
      <section style={{ background: "#0A0A0A", padding: isMobile ? "100px 24px 64px" : "140px 24px 64px", position: "relative", overflow: "hidden" , borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative" }}>
          <Reveal><Eyebrow>Ce que tu reçois</Eyebrow></Reveal>
          <ScrollHeading text="Tout ce que tu reçois dans Objectif Masse®." style={{ ...heavy, fontSize: "clamp(36px,4.5vw,60px)", lineHeight: 1.1, color: "#fff", margin: 0 }} />
          <Reveal delay={120}>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginTop: 24, letterSpacing: "0.02em" }}>
              9 vidéos thématiques · 3 guides · 1 kit · 2 bonus · 50 vidéos d'exercices · Accès à vie
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ columnGap: 40, rowGap: 72, marginTop: 72 }}>
            {guideCards.map((c, i) => (
              <ContentCard key={c.title} {...c} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div style={{ textAlign: "center", background: "#0A0A0A", padding: "8px 24px" }}>
        <ScrollHeading text="Et ce n'est pas tout." style={{ ...heavy, color: "#fff", fontSize: "clamp(28px,3.5vw,44px)", margin: 0 }} />
      </div>

      <section style={{ background: "#0A0A0A", padding: "64px 24px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", columnGap: 40, rowGap: 72 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {otherCards.map((c, i) => (
            <ContentCard key={c.badge} {...c} index={i} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 72, marginBottom: 32 }}>
          <CTAButton />
        </div>
        <Reveal delay={60} y={0} x={80}>
          <div style={{ maxWidth: 1040, margin: "0 auto 32px" }}>
            <BenefitMarquee items={[
              ["🎥", "Des vidéos thématiques"],
              ["📘", "3 guides"],
              ["🍫", "1 kit optimisation"],
              ["🎁", "2 bonus"],
              ["🏋️", "+ de 50 vidéos d'exercices"],
              ["♾️", "Accès à vie"],
            ]} />
          </div>
        </Reveal>
        <Reveal delay={80} y={0} x={80}>
          <div style={{ height: isMobile ? 207 : "clamp(245px, 60vw, 522px)", overflow: "hidden", position: "relative" }}>
            <img src={memberMockup} alt="Aperçu de l'espace membre Objectif Masse®" loading="lazy"
              style={{ display: "block", width: "100%", maxWidth: 1040, margin: "0 auto", height: "auto" }} />
          </div>
        </Reveal>
      </section>
    </>
  );
}

function AvantApres() {
  const [hoverCard, setHoverCard] = useState<"avant" | "apres" | null>(null);
  const isMobile = useIsMobile();
  const avant = [
    "Tu improvises tes séances en arrivant à la salle",
    "Tu ne progresses plus : mêmes charges, mêmes répétitions depuis des mois",
    "Tu manges au feeling, sans connaître ni tes calories ni tes macros",
    "Tu prends du poids sans savoir si c'est du muscle ou du gras",
    "Tu lâches au bout de 3 semaines, avant même que les résultats arrivent",
    "Le même physique depuis des mois, voire des années",
  ];
  const apres = [
    "Tes séances sont planifiées : exercices, séries, reps, temps de repos",
    "Tes performances montent semaine après semaine, phase après phase",
    "Tu connais ton surplus et tes macros, et ton plan te dit quoi manger à chaque repas",
    "Ton surplus est maîtrisé : tu prends du muscle en gardant tes abdos",
    "Tu vas au bout des 4 phases, deload compris, et tu enchaînes sur un nouveau cycle",
    "Le meilleur physique de ta vie : massif, fort et volumineux",
  ];
  return (
    <section style={{ background: "#0A0A0A", padding: isMobile ? "100px 24px 64px" : "140px 24px 64px" , borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <h2 style={{ ...heavy, fontSize: "clamp(36px,4.5vw,60px)", lineHeight: 1.1, color: "#fff", margin: "0 0 64px", textAlign: "center" }}>Avant &amp; après les 12 semaines</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 40 }}>
          <Reveal delay={80}>
            <div
              onMouseEnter={() => setHoverCard("avant")}
              onMouseLeave={() => setHoverCard(null)}
              style={{
                background: hoverCard === "avant" ? "#232323" : "#1C1C1C",
                borderRadius: 24, padding: "44px 40px", height: "100%",
                boxShadow: hoverCard === "avant" ? "0 32px 70px rgba(0,0,0,0.4)" : "0 16px 40px rgba(0,0,0,0.3)",
                transform: hoverCard === "avant" ? "translateY(-10px)" : "translateY(0)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, box-shadow 0.4s ease",
              }}>
              <div style={{ ...bebas, fontSize: 20, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 20 }}>AVANT OBJECTIF MASSE®</div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {avant.map((t, i) => (
                  <li key={i} style={{
                    display: "flex", gap: 12, alignItems: "flex-start",
                    borderBottom: i < avant.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    padding: "18px 16px", margin: "0 -16px", fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.6,
                  }}>
                    <span style={{ color: "#E5484D", fontWeight: 700, flexShrink: 0 }}>✗</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div
              onMouseEnter={() => setHoverCard("apres")}
              onMouseLeave={() => setHoverCard(null)}
              style={{
                background: hoverCard === "apres" ? "#0c6bb8" : "#095591",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: 24, padding: "44px 40px", height: "100%",
                boxShadow: hoverCard === "apres" ? "0 32px 70px rgba(9,85,145,0.5)" : "0 16px 40px rgba(9,85,145,0.35)",
                transform: hoverCard === "apres" ? "translateY(-10px)" : "translateY(0)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, box-shadow 0.4s ease",
              }}>
              <div style={{ ...bebas, fontSize: 20, color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 20 }}>APRÈS OBJECTIF MASSE®</div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {apres.map((t, i) => (
                  <li key={i} style={{
                    display: "flex", gap: 12, alignItems: "flex-start",
                    borderBottom: i < apres.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
                    padding: "18px 16px", margin: "0 -16px", fontSize: 15, color: "#fff", lineHeight: 1.6,
                  }}>
                    <span style={{ color: "#fff", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ForWhom() {
  const [hoverCol, setHoverCol] = useState<"yes" | "no" | null>(null);
  const isMobile = useIsMobile();
  const yes = [
    "Tu en as marre de t'entraîner sans savoir si tu progresses vraiment.",
    "Tu veux enfin suivre un plan construit du premier jour au dernier.",
    "Tu es prêt à t'entraîner sérieusement et à structurer ton alimentation.",
    "Tu veux comprendre la méthode pour l'appliquer toute ta vie.",
    "Tu veux le meilleur physique de ta vie et tu es prêt à aller le chercher.",
  ];
  const no = [
    "Tu attends un physique massif en 4 semaines.",
    "Tu veux des résultats sans rien changer à tes habitudes.",
    "Tu lâches ton programme dès que ça devient exigeant.",
    "Tu penses que c'est la génétique qui décide de tout.",
  ];
  return (
    <section style={{ background: "#0A0A0A", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ textAlign: "center", padding: isMobile ? "100px 24px 0" : "140px 24px 0" }}>
        <Reveal><Eyebrow>Pour qui ?</Eyebrow></Reveal>
        <ScrollHeading text="Est-ce que Objectif Masse® est fait pour toi ?" style={{ ...heavy, fontSize: "clamp(36px,4.5vw,60px)", lineHeight: 1.1, color: "#fff", margin: 0 }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ marginTop: 72, maxWidth: 1100, marginLeft: "auto", marginRight: "auto", gap: 20 }}>
        {/* OUI, ENTRE. */}
        <div
          onMouseEnter={() => setHoverCol("yes")}
          onMouseLeave={() => setHoverCol(null)}
          style={{
            background: `linear-gradient(155deg, ${ACCENT}, #063d63)`,
            borderRadius: 24, overflow: "hidden",
            border: `1px solid ${hoverCol === "yes" ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)"}`,
            boxShadow: hoverCol === "yes" ? "0 28px 60px rgba(9,85,145,0.45)" : "0 16px 40px rgba(9,85,145,0.3)",
            transform: hoverCol === "yes" ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.35s ease",
          }}>
          <Reveal>
            <img src={forwhomYes} alt="Théo Leguerrier en salle" loading="lazy" style={{ width: "100%", height: 520, objectFit: "cover", objectPosition: "center 8%", display: "block" }} />
          </Reveal>
          <div style={{ padding: 48 }}>
            <div style={{ ...bebas, fontSize: 28, color: "#fff" }}>Oui, si…</div>
            <div style={{ marginTop: 24 }}>
              {yes.map((t, i) => (
                <div key={i} style={{
                  display: "flex", gap: 16, alignItems: "flex-start", padding: "18px 16px", margin: "0 -16px",
                  borderBottom: i < yes.length - 1 ? "1px solid rgba(255,255,255,0.18)" : "none",
                }}>
                  <span style={{
                    flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "#fff",
                    color: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, marginTop: 1,
                  }}>✓</span>
                  <span style={{ fontSize: 15, fontWeight: 400, color: "#fff", lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* NON, PASSE. */}
        <div
          onMouseEnter={() => setHoverCol("no")}
          onMouseLeave={() => setHoverCol(null)}
          style={{
            background: "rgba(255,255,255,0.02)",
            borderRadius: 24, overflow: "hidden",
            border: `1px solid ${hoverCol === "no" ? "rgba(9,85,145,0.5)" : "rgba(255,255,255,0.08)"}`,
            boxShadow: hoverCol === "no" ? "0 28px 60px rgba(9,85,145,0.2)" : "0 1px 0 rgba(0,0,0,0)",
            transform: hoverCol === "no" ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, border-color 0.3s ease, box-shadow 0.35s ease",
          }}>
          <Reveal delay={100}>
            <img src={forwhomNo} alt="Théo Leguerrier" loading="lazy" style={{ width: "100%", height: 520, objectFit: "cover", objectPosition: "center 20%", display: "block" }} />
          </Reveal>
          <div style={{ padding: 48 }}>
            <div style={{ ...bebas, fontSize: 28, color: "rgba(255,255,255,0.4)" }}>Non, si…</div>
            <div style={{ marginTop: 24 }}>
              {no.map((t, i) => (
                <div key={i} style={{
                  display: "flex", gap: 16, alignItems: "flex-start", padding: "18px 16px", margin: "0 -16px",
                  borderBottom: i < no.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <span style={{
                    flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, marginTop: 1,
                  }}>✗</span>
                  <span style={{ fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "72px 24px" }}>
        <CTAButton label="Je démarre ma transformation — 99€" />
      </div>
    </section>
  );
}

function Pricing() {
  const isMobile = useIsMobile();
  const items = [
    "Guide 1 — Les Fondations",
    "Bonus 1 — Mes compléments alimentaire",
    "Guide 2 — Ton Plan d'Entraînement sur 12 semaines",
    "Bonus 2 — Olympia Mindset",
    "Guide 3 — La Diète Objectif Masse®",
    "9 vidéos thématiques : Une pour chaque module",
    "Kit Optimisation — Abdos · Cardio · Mobilité",
    "Accès à vie, sans abonnement",
    "50 vidéos d'exercices avec leurs alternatives",
  ];
  return (
    <section id="pricing" style={{ background: "#0A0A0A", padding: isMobile ? "100px 24px 64px" : "140px 24px 64px", position: "relative", overflow: "hidden" , borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ position: "relative", textAlign: "center" }}>
        <Eyebrow>L'investissement</Eyebrow>
        <ScrollHeading text="Rejoindre Objectif Masse®" style={{ ...heavy, fontSize: "clamp(36px,4.5vw,60px)", lineHeight: 1.1, color: "#fff", margin: 0 }} />
      </div>
      <Reveal x={80}>
        <div style={{
          maxWidth: 760, margin: "48px auto 0", padding: "40px 40px 36px", borderRadius: 28,
          background: `linear-gradient(155deg, ${ACCENT}, #063d63)`,
          border: "1px solid rgba(255,255,255,0.18)", position: "relative",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        }}>
          <div style={{ position: "absolute", top: -1, left: 40, background: "#fff", color: ACCENT, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "5px 16px", borderRadius: "0 0 8px 8px" }}>
            OFFRE DE LANCEMENT
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginTop: 20 }}>
            <div>
              <div style={{ ...bebas, fontSize: 32, color: "#fff" }}>OBJECTIF MASSE®</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Tout inclus. Accès à vie.</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <div style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", textDecoration: "line-through" }}>149€</div>
                <div style={{ ...bebas, fontSize: 52, color: "#fff", lineHeight: 0.9 }}>99€</div>
              </div>
            </div>
          </div>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {items.map((t, i) => (
              <li key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.18)", padding: "10px 0", fontSize: 14, color: "#fff", display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{
                  flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: "#fff",
                  color: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700,
                }}>✓</span>
                {t}
              </li>
            ))}
          </ul>
          <a href={CHECKOUT} style={{
            display: "block", textAlign: "center", background: "#fff", color: ACCENT,
            padding: "16px 24px", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em",
            textTransform: "uppercase", borderRadius: 999, marginTop: 24, transition: "all 0.25s",
          }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1)"; e.currentTarget.style.filter = "brightness(0.95)"; }}
             onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.filter = "brightness(1)"; }}
             onMouseDown={(e) => { e.currentTarget.style.transform = "translateY(0) scale(0.97)"; }}
             onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1)"; }}>
            → Je démarre ma transformation — 99€
          </a>
          <div style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 14 }}>
            Paiement 100% sécurisé · Accès instantané
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FAQ() {
  const items = [
    ["Combien de temps dure le programme ?", "12 semaines, découpées en 4 phases. Chacune a un objectif précis et te prépare pour la suivante. Et comme l'accès est à vie, tu peux relancer un cycle complet ensuite avec tes nouvelles charges."],
    ["Combien de séances par semaine, et combien de temps chacune ?", "Jusqu'à 6 séances par semaine, avec au minimum 2 jours de repos. Compte 1 h 15 à 1 h 30 par séance."],
    ["Quel est l'objectif du programme ?", "Prendre du muscle, pas du poids. Le programme maximise l'hypertrophie tout en gardant l'excédent calorique sous contrôle, pour que tu construises un physique massif, volumineux et fort, en restant le plus sec possible."],
    ["Est-ce que le programme est adapté à tous les niveaux ?", "Oui. Que tu aies 3 mois ou 5 ans de salle, la structure des 4 phases s'adapte à toi. Chaque exercice est filmé pour que tu l'exécutes correctement et que tu tires le maximum de chaque séance."],
    ["Quelle est la différence avec les autres programmes ?", "La plupart des programmes te donnent une liste d'exercices. Celui-ci te donne une progression sur 12 semaines : chaque phase construit sur la précédente, avec l'alimentation qui suit. C'est ce qui fait la différence entre s'entraîner dur et progresser vraiment."],
    ["Est-ce que je peux le faire à la maison ?", "Non. Le programme repose sur des machines et des charges libres. Des alternatives filmées sont fournies pour chaque exercice, mais une salle équipée reste indispensable."],
    ["Et si un exercice n'existe pas dans ma salle ?", "Chaque mouvement a une ou plusieurs alternatives, toutes filmées. Machine occupée, machine absente ou gêne articulaire : tu as toujours une solution qui cible le même muscle."],
    ["Les compléments sont-ils obligatoires ?", "Non. Tu peux faire les 12 semaines sans rien prendre. Le bonus est là pour que tu arrêtes d'acheter au hasard : ce qui vaut ton argent, ce qui n'en vaut pas, et à quel dosage."],
    ["Le programme est-il accessible à vie ?", "Oui. Un paiement unique, pas d'abonnement, pas de date d'expiration. Tu y reviens quand tu veux, autant de fois que tu veux."],
    ["Le programme est-il disponible juste après mon achat ?", "Oui. Dès le paiement confirmé, tu reçois l'accès à tout : les guides, les vidéos explicatives, les 50 vidéos d'exercices, le kit et les bonus. Tu peux commencer dès ta prochaine séance."],
  ];
  const [open, setOpen] = useState<number | null>(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const isMobile = useIsMobile();
  return (
    <section style={{ background: "#EBEBEA", padding: isMobile ? "100px 24px 64px" : "140px 24px 64px" , borderTop: "1px solid rgba(28,28,28,0.08)" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: ACCENT, marginBottom: 20 }}>Questions fréquentes</div>
        <h2 style={{ ...bebas, fontSize: "clamp(56px,7vw,96px)", lineHeight: 1, color: "#1C1C1C", margin: 0 }}>FAQ</h2>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {items.map(([q, a], i) => {
          const isOpen = open === i;
          const isHovered = hovered === i;
          return (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                border: `1px solid ${isHovered || isOpen ? ACCENT : "rgba(28,28,28,0.12)"}`, borderRadius: 16,
                marginTop: i > 0 ? 16 : 0, padding: "0 24px",
                background: isHovered ? "rgba(9,85,145,0.04)" : "#fff",
                boxShadow: isHovered ? "0 8px 24px rgba(9,85,145,0.1)" : "none",
                transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
              }}>
              <button onClick={() => setOpen(isOpen ? null : i)} style={{
                width: "100%", background: "none", border: "none", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "22px 0", fontSize: 16, fontWeight: 500, color: "#1C1C1C", textAlign: "left",
              }}>
                <span>{q}</span>
                <span style={{ fontSize: 24, color: ACCENT, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s", lineHeight: 1 }}>+</span>
              </button>
              <div style={{ maxHeight: isOpen ? 400 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                <div style={{ fontSize: 15, fontWeight: 400, lineHeight: 1.85, color: "rgba(28,28,28,0.6)", paddingBottom: 24 }}>{a}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#0A0A0A" }}>
      <div style={{ padding: "20px 24px", textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
        © 2026 · OBJECTIF MASSE® · TOUS DROITS RÉSERVÉS
      </div>
    </footer>
  );
}

/* ---------- Root ---------- */
function Landing() {
  return (
    <main style={{ background: "#0A0A0A", color: "#fff", fontFamily: "'Archivo', sans-serif", overflow: "hidden" }}>
      <GrainOverlay />
      <ScrollProgress />
      <Nav />
      <Hero />
      <Marquee />
      <Problem />
      <Content />
      <Phases />
      <AvantApres />
      <Bio />
      <PhotoStrip />
      <ForWhom />
      <Pricing />
      <FAQ />
      <FullPhotoStatementB />
      <Footer />
    </main>
  );
}
