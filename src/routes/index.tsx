import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NutriSmart AI — Coach Nutrition & Budget de luxe" },
      { name: "description", content: "L'assistant nutrition d'exception : menus signature, macros, budget optimisé et comparateur livraison." },
      { property: "og:title", content: "NutriSmart AI — Premium" },
      { property: "og:description", content: "L'art de manger juste, intelligemment." },
    ],
  }),
  component: Index,
});

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.08, ease: EASE },
  }),
};

function Cursor3DSphere() {
  const ref = useRef<HTMLDivElement>(null);
  const [r, setR] = useState({ x: -12, y: 18 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      setR({ x: -dy * 24, y: dx * 32 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} className="perspective-1000 w-full h-full flex items-center justify-center">
      <div
        className="relative preserve-3d transition-transform duration-300 ease-out"
        style={{ transform: `rotateX(${r.x}deg) rotateY(${r.y}deg)`, width: 360, height: 360 }}
      >
        {/* Rotating ring of facets — pure CSS 3D */}
        <div className="absolute inset-0 preserve-3d animate-spin-slow">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 w-24 h-72 -ml-12 -mt-36 rounded-full opacity-80"
              style={{
                transform: `rotateY(${(360 / 14) * i}deg) translateZ(150px)`,
                background:
                  "linear-gradient(180deg, oklch(0.88 0.13 92 / 90%), oklch(0.55 0.11 75 / 30%))",
                boxShadow: "0 0 24px oklch(0.82 0.13 88 / 40%)",
                filter: "blur(0.3px)",
              }}
            />
          ))}
        </div>
        {/* Glass core orb */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-float-3d"
          style={{
            width: 220,
            height: 220,
            background:
              "radial-gradient(circle at 30% 28%, oklch(1 0 0 / 70%), oklch(0.82 0.13 88 / 80%) 35%, oklch(0.4 0.08 75) 75%, oklch(0.18 0.02 260))",
            boxShadow:
              "inset -30px -40px 80px oklch(0 0 0 / 55%), inset 20px 20px 60px oklch(1 0 0 / 18%), 0 50px 100px -20px oklch(0.82 0.13 88 / 45%)",
          }}
        />
        {/* Outer halo */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 420,
            height: 420,
            background:
              "radial-gradient(circle, oklch(0.82 0.13 88 / 18%), transparent 60%)",
          }}
        />
      </div>
    </div>
  );
}

function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setT({ x: -py * 10, y: px * 14 });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      className={`perspective-1000 ${className}`}
    >
      <div
        className="preserve-3d transition-transform duration-300 ease-out"
        style={{ transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)` }}
      >
        {children}
      </div>
    </div>
  );
}

function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1100px,94%)]"
    >
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-gold shadow-gold" />
          <span className="font-serif text-lg tracking-wide">NutriSmart<span className="text-gradient-gold"> AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a className="hover:text-foreground transition" href="#menus">Menus</a>
          <a className="hover:text-foreground transition" href="#features">Expérience</a>
          <a className="hover:text-foreground transition" href="#pricing">Tarifs</a>
          <a className="hover:text-foreground transition" href="#faq">FAQ</a>
        </div>
        <button className="px-5 py-2 rounded-full bg-gradient-gold text-primary-foreground text-sm font-medium tracking-wide hover:opacity-90 transition shadow-gold">
          Accès privé
        </button>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  return (
    <section className="relative pt-40 pb-28 px-6 overflow-hidden">
      <motion.div style={{ y }} className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr,1fr] gap-12 items-center">
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs tracking-[0.2em] uppercase text-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" />
            Édition Privée · 2026
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="mt-6 text-5xl md:text-7xl leading-[1.02]">
            L'art de manger <span className="italic text-gradient-gold">juste</span>,<br/>
            sculpté par l'IA.
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-7 text-lg text-muted-foreground max-w-xl leading-relaxed">
            NutriSmart AI orchestre vos menus signature, vos macros et votre budget alimentaire avec
            la précision d'un chef étoilé et la rigueur d'un préparateur d'élite.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="mt-10 flex flex-wrap items-center gap-4">
            <button className="group relative px-7 py-4 rounded-full bg-gradient-gold text-primary-foreground font-medium tracking-wide shadow-luxe hover:scale-[1.02] transition">
              <span className="relative z-10">Demander une invitation</span>
              <span className="absolute inset-0 rounded-full shimmer opacity-50" />
            </button>
            <button className="px-7 py-4 rounded-full glass text-foreground hover:border-gold transition">
              Découvrir la collection ↗
            </button>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="mt-12 flex items-center gap-8 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <div><span className="text-gradient-gold text-2xl font-serif">12k+</span><div>athlètes</div></div>
            <div className="w-px h-10 bg-border" />
            <div><span className="text-gradient-gold text-2xl font-serif">38%</span><div>budget économisé</div></div>
            <div className="w-px h-10 bg-border" />
            <div><span className="text-gradient-gold text-2xl font-serif">4.9★</span><div>satisfaction</div></div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          className="h-[500px] relative"
        >
          <Cursor3DSphere />
        </motion.div>
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-24 border-y border-border/60 py-5 overflow-hidden"
      >
        <div className="flex gap-16 whitespace-nowrap animate-[shimmer_30s_linear_infinite] text-xs uppercase tracking-[0.4em] text-muted-foreground"
             style={{ animation: "marquee 35s linear infinite" }}>
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-16">
              <span>Carrefour</span><span>·</span><span>MONOPRIX</span><span>·</span>
              <span>Uber Eats</span><span>·</span><span>Deliveroo</span><span>·</span>
              <span>La Belle Vie</span><span>·</span><span>Picard</span><span>·</span>
              <span>Frichti</span><span>·</span>
            </div>
          ))}
        </div>
      </motion.div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </section>
  );
}

const FEATURES = [
  {
    k: "01",
    t: "Menus Signature",
    d: "Une carte personnalisée chaque semaine, calibrée à vos macros, votre saison et vos envies.",
  },
  {
    k: "02",
    t: "Comparateur Livraison",
    d: "L'algorithme arbitre en temps réel entre vingt enseignes pour le meilleur rapport qualité-prix.",
  },
  {
    k: "03",
    t: "Lecture de Ticket",
    d: "Photographiez. NutriSmart catégorise, valorise et apprend de chaque achat.",
  },
  {
    k: "04",
    t: "Coach Performance",
    d: "Ajustements quotidiens en fonction de vos séances, votre sommeil et votre fenêtre métabolique.",
  },
];

function Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-2xl"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">L'expérience</div>
          <h2 className="text-4xl md:text-6xl leading-tight">
            Quatre gestes, une <span className="italic text-gradient-gold">maîtrise</span> absolue.
          </h2>
        </motion.div>

        <div className="mt-20 grid md:grid-cols-2 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.k}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            >
              <Tilt>
                <div className="glass rounded-2xl p-10 h-full relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700"
                       style={{ background: "radial-gradient(400px circle at 50% 0%, oklch(0.82 0.13 88 / 12%), transparent 60%)" }} />
                  <div className="flex items-start justify-between mb-8">
                    <div className="font-serif text-5xl text-gradient-gold">{f.k}</div>
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold">→</div>
                  </div>
                  <h3 className="text-2xl mb-3">{f.t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.d}</p>
                  <div className="hairline h-px w-full mt-8 opacity-50" />
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const MENUS = [
  { name: "Le Matinal", kcal: 480, p: 32, c: 48, f: 14, price: "4,90 €", tag: "Petit-déjeuner" },
  { name: "Le Souverain", kcal: 720, p: 52, c: 65, f: 22, price: "9,40 €", tag: "Déjeuner signature" },
  { name: "Le Velouté", kcal: 540, p: 38, c: 42, f: 18, price: "7,20 €", tag: "Dîner léger" },
];

function Menus() {
  return (
    <section id="menus" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-wrap items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">La carte</div>
            <h2 className="text-4xl md:text-6xl max-w-2xl leading-tight">
              Une <span className="italic text-gradient-gold">collection</span> de menus, calibrée pour vous.
            </h2>
          </div>
          <a className="text-sm tracking-wide text-muted-foreground hover:text-gold transition">Voir la carte complète →</a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 perspective-1000">
          {MENUS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 60, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: i * 0.12, ease: EASE }}
            >
              <Tilt>
                <div className="rounded-2xl p-8 h-full bg-card/60 border border-border backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full opacity-30"
                       style={{ background: "radial-gradient(circle, oklch(0.82 0.13 88 / 60%), transparent 70%)" }} />
                  <div className="text-xs uppercase tracking-[0.25em] text-gold/80">{m.tag}</div>
                  <h3 className="font-serif text-3xl mt-3 mb-6">{m.name}</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-gradient-gold font-serif text-4xl">{m.price}</span>
                    <span className="text-muted-foreground text-sm">/ portion</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    {[
                      ["KCAL", m.kcal],
                      ["PROT", `${m.p}g`],
                      ["GLUC", `${m.c}g`],
                      ["LIPI", `${m.f}g`],
                    ].map(([l, v]) => (
                      <div key={l} className="glass rounded-lg py-3">
                        <div className="text-gold tracking-widest">{l}</div>
                        <div className="font-serif text-lg text-foreground mt-1">{v}</div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-8 w-full py-3 rounded-full border border-gold/40 text-gold hover:bg-gradient-gold hover:text-primary-foreground hover:border-transparent transition">
                    Composer ce menu
                  </button>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PLANS = [
  { name: "Essentiel", price: "9", desc: "L'art des menus quotidiens.", feat: ["Menus hebdomadaires", "Suivi macros", "1 livraison comparée"], hl: false },
  { name: "Signature", price: "24", desc: "L'expérience complète NutriSmart.", feat: ["Menus illimités", "Comparateur livraison", "Lecture de tickets", "Coach performance"], hl: true },
  { name: "Privé", price: "Sur mesure", desc: "Concierge nutrition dédié.", feat: ["Diététicien personnel", "Menus signature chef", "Audit budget mensuel", "Support 24/7"], hl: false },
];

function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Adhésion</div>
          <h2 className="text-4xl md:text-6xl leading-tight">
            Trois <span className="italic text-gradient-gold">cercles</span> d'excellence.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
              className={`relative rounded-2xl p-10 ${p.hl ? "bg-gradient-to-b from-card to-secondary border border-gold/40 shadow-luxe scale-[1.03]" : "glass"}`}
            >
              {p.hl && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-gold text-primary-foreground text-[10px] uppercase tracking-[0.3em]">
                  Recommandé
                </div>
              )}
              <div className="text-xs uppercase tracking-[0.3em] text-gold">{p.name}</div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-6xl text-gradient-gold">{p.price}</span>
                {p.price !== "Sur mesure" && <span className="text-muted-foreground">€ / mois</span>}
              </div>
              <p className="text-muted-foreground mt-3">{p.desc}</p>
              <div className="hairline h-px my-8" />
              <ul className="space-y-3 text-sm">
                {p.feat.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="text-gold mt-0.5">◆</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-10 w-full py-4 rounded-full transition ${p.hl ? "bg-gradient-gold text-primary-foreground shadow-gold hover:scale-[1.02]" : "border border-border hover:border-gold text-foreground"}`}>
                Choisir {p.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-32 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
        className="max-w-5xl mx-auto rounded-3xl p-14 md:p-20 text-center relative overflow-hidden glass shadow-luxe"
      >
        <div className="absolute inset-0"
             style={{ background: "radial-gradient(600px circle at 50% 0%, oklch(0.82 0.13 88 / 18%), transparent 60%)" }} />
        <div className="text-xs uppercase tracking-[0.4em] text-gold mb-6">Invitation</div>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight">
          Rejoignez le cercle restreint des <span className="italic text-gradient-gold">premiers convives</span>.
        </h2>
        <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
          Places limitées à 500 membres fondateurs. Tarif privilégié à vie.
        </p>
        <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="votre@email.com"
            className="flex-1 px-5 py-4 rounded-full bg-input/40 border border-border focus:border-gold outline-none transition"
          />
          <button className="px-7 py-4 rounded-full bg-gradient-gold text-primary-foreground font-medium shadow-gold hover:scale-[1.02] transition">
            Réserver
          </button>
        </form>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-gold" />
          <span className="font-serif">NutriSmart AI</span>
        </div>
        <div className="flex gap-8">
          <a className="hover:text-gold transition">Mentions légales</a>
          <a className="hover:text-gold transition">Confidentialité</a>
          <a className="hover:text-gold transition">Contact</a>
        </div>
        <div>© 2026 — Maison NutriSmart</div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Ambient grain & gradient */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.04] mix-blend-overlay z-0"
           style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />
      <Nav />
      <Hero />
      <Features />
      <Menus />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
