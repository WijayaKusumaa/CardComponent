import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Search,
  Copy,
  Check,
  Github,
  BookOpen,
  Sun,
  Moon,
  Command,
  TrendingUp,
  Users,
  Zap,
  ArrowUpRight,
  MapPin,
  Building2,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Circle,
  Twitter,
  Linkedin,
  Globe,
  Activity,
  Bell,
  Layers,
  Palette,
  Code2,
  Type,
  Ruler,
  Accessibility,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: ShowcasePage,
});

function ShowcasePage() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className={`${dark ? "dark" : ""} gradient-surface min-h-screen text-foreground overflow-x-hidden`}>
      <div className="fixed inset-0 grid-bg pointer-events-none" aria-hidden />
      <div className="relative">
        <TopBar dark={dark} onToggleTheme={() => setDark((d) => !d)} />
        <main className="mx-auto max-w-[1440px] px-4 md:px-8 pb-16 md:pb-24">
          <PageHeader />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="mt-8 md:mt-10 grid grid-cols-12 gap-6 min-w-0"
          >
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="col-span-12 xl:col-span-9 min-w-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassDashboardCard />
                <BentoFeatureCard />
                <ProfileCard />
                <PricingCard />
              </div>
              <CodePreview />
            </motion.section>
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="col-span-12 xl:col-span-3 min-w-0"
            >
              <Inspector />
            </motion.aside>
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Top navigation                                                            */
/* -------------------------------------------------------------------------- */

function TopBar({ dark, onToggleTheme }: { dark: boolean; onToggleTheme: () => void }) {
  const [copied, setCopied] = useState(false);
  const cmd = "npx shadcn@latest add card";
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 backdrop-blur-xl bg-background/70">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 h-14 flex items-center justify-between md:justify-start gap-4 md:gap-6">
        <a href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-secondary grid place-items-center">
            <Layers className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Wijaya UI</span>
          <span className="ml-2 rounded-md border border-border px-1.5 py-0.5 font-mono-ds text-[10px] text-muted-foreground">
            v2.4.1
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
          {["Docs", "Components", "Templates", "Primitives", "Changelog"].map((l, i) => (
            <a
              key={l}
              href="#"
              className={`px-3 py-1.5 rounded-md hover:text-foreground hover:bg-white/[0.03] transition-colors ${i === 1 ? "text-foreground bg-white/[0.04]" : ""
                }`}
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button className="hidden md:flex items-center gap-2 h-9 rounded-lg border border-border bg-surface/60 pl-3 pr-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-w-[240px]">
            <Search className="h-3.5 w-3.5" />
            <span>Search components…</span>
            <span className="ml-auto flex items-center gap-1 font-mono-ds text-[10px]">
              <kbd className="rounded border border-border px-1.5 py-0.5">⌘</kbd>
              <kbd className="rounded border border-border px-1.5 py-0.5">K</kbd>
            </span>
          </button>
          <IconBtn label="Docs">
            <BookOpen className="h-4 w-4" />
          </IconBtn>
          <IconBtn
            label="GitHub"
            onClick={() => window.open("https://github.com/WijayaKusumaa", "_blank")}
          >
            <Github className="h-4 w-4" />
          </IconBtn>
          <IconBtn
            label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={onToggleTheme}
          >
            {dark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </IconBtn>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(cmd);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="hidden sm:inline-flex items-center gap-2 h-9 rounded-lg bg-foreground text-background pl-3 pr-2.5 text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <span className="font-mono-ds text-[11px] opacity-70">$</span>
            <span className="font-mono-ds text-[11px]">{cmd}</span>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
}

function IconBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="h-9 w-9 grid place-items-center rounded-lg border border-border bg-surface/60 text-muted-foreground hover:text-foreground hover:border-white/10 transition-colors"
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page header                                                               */
/* -------------------------------------------------------------------------- */

function PageHeader() {
  return (
    <div className="pt-8 md:pt-12 pb-2 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 flex-wrap">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono-ds">
          <span>components</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">card</span>
          <span className="ml-2 rounded-full border border-success/30 bg-success/10 text-success px-2 py-0.5 text-[10px] font-sans">
            Stable
          </span>
        </div>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
          Card Components
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground max-w-xl">
          Beautiful, reusable card patterns built for modern web applications. Accessible by
          default, themeable, and composable — designed for real product surfaces.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs text-muted-foreground">
        <Stat label="Variants" value="24" />
        <Divider />
        <Stat label="Downloads" value="184k" />
        <Divider />
        <Stat label="Bundle" value="3.2 kB" />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono-ds text-lg text-foreground tabular-nums">{value}</div>
      <div className="text-[11px] uppercase tracking-wider mt-0.5">{label}</div>
    </div>
  );
}
function Divider() {
  return <div className="h-8 w-px bg-border" />;
}

/* -------------------------------------------------------------------------- */
/*  Card wrapper                                                              */
/* -------------------------------------------------------------------------- */

function CardShell({
  name,
  category,
  description,
  source,
  children,
}: {
  name: string;
  category: string;
  description: string;
  source: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="card-elevated hover-lift group relative overflow-hidden"
    >
      <header className="flex items-start justify-between gap-4 px-5 pt-5 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[15px] font-semibold tracking-tight truncate">{name}</h3>
            <span className="rounded-md bg-white/[0.04] border border-border px-2 py-0.5 text-[10px] font-mono-ds text-muted-foreground">
              {category}
            </span>
          </div>
          <p className="mt-1 text-[13px] text-muted-foreground line-clamp-1">{description}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-border bg-surface/60 px-2 py-1 text-[10px] font-mono-ds text-muted-foreground">
            <Circle className="h-1.5 w-1.5 fill-success text-success" />
            {source}
          </span>
          <button
            aria-label="Copy source"
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="h-7 w-7 grid place-items-center rounded-md border border-border bg-surface/60 text-muted-foreground hover:text-foreground active:scale-90 transition-all"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </header>

      <div className="mx-5 mb-5 rounded-xl border border-border bg-[color:var(--surface)]/40 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-background/40">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/10" />
            <span className="h-2 w-2 rounded-full bg-white/10" />
            <span className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <span className="font-mono-ds text-[10px] text-muted-foreground">preview</span>
          <div className="flex items-center gap-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="h-3 w-3" />
          </div>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  CARD 01 — Glass Dashboard                                                 */
/* -------------------------------------------------------------------------- */

function GlassDashboardCard() {
  return (
    <CardShell
      name="Glass Dashboard Card"
      category="Analytics"
      description="Premium glassmorphism with live metrics and inline chart."
      source="card-glass.tsx"
    >
      <div className="relative h-[280px] rounded-2xl overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 300px at 20% 10%, rgba(59,130,246,0.55), transparent 60%), radial-gradient(500px 300px at 90% 90%, rgba(139,92,246,0.45), transparent 60%), linear-gradient(135deg, #1a1d29, #0f1116)",
          }}
        />
        <div className="absolute inset-4 glass-panel rounded-xl p-4 flex flex-col">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Overview
              </div>
              <div className="text-[13px] font-medium mt-0.5">Last 30 days</div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-success/10 border border-success/25 px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />
              <span className="text-[10px] font-mono-ds text-success">LIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            <Metric label="Revenue" value="$48.2k" delta="+12.4%" up />
            <Metric label="Visitors" value="24,180" delta="+3.1%" up />
            <Metric label="Conv." value="4.8%" delta="-0.4%" />
          </div>

          <div className="mt-auto pt-4">
            <MiniChart />
          </div>
        </div>
      </div>
    </CardShell>
  );
}

function Metric({
  label,
  value,
  delta,
  up,
}: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-[15px] font-semibold tabular-nums font-mono-ds">{value}</div>
      <div className={`mt-0.5 text-[10px] font-mono-ds ${up ? "text-success" : "text-danger"}`}>
        {delta}
      </div>
    </div>
  );
}

function MiniChart() {
  const points = [8, 14, 11, 18, 15, 22, 19, 26, 24, 30, 28, 34, 31, 38];
  const w = 260;
  const h = 60;
  const step = w / (points.length - 1);
  const max = 40;
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${i * step},${h - (p / max) * h}`)
    .join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-14">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#g1)" />
      <path d={path} fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  CARD 02 — Bento                                                           */
/* -------------------------------------------------------------------------- */

function BentoFeatureCard() {
  return (
    <CardShell
      name="Bento Feature Card"
      category="Marketing"
      description="Composed bento grid with tiles, metrics, tags and activity feed."
      source="card-bento.tsx"
    >
      <div className="grid grid-cols-1 sm:grid-cols-6 sm:grid-rows-4 gap-2 sm:h-[280px]">
        <div className="sm:col-span-4 sm:row-span-2 rounded-xl border border-border bg-elevated/60 p-4 relative overflow-hidden">
          <div
            className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-40 blur-2xl"
            style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }}
          />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/25 grid place-items-center">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <span className="text-[10px] font-mono-ds text-muted-foreground uppercase tracking-wider">
              Realtime Sync
            </span>
          </div>
          <div className="mt-3 text-[17px] font-semibold tracking-tight leading-snug">
            Global edge network,
            <br />
            <span className="text-muted-foreground">sub-40ms everywhere.</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Edge", "WebSocket", "CRDT", "Presence"].map((t) => (
              <span
                key={t}
                className="rounded-md border border-border bg-background/40 px-1.5 py-0.5 text-[10px] font-mono-ds text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2 sm:row-span-2 rounded-xl border border-border bg-elevated/60 p-3 flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Uptime</div>
            <div className="mt-1 text-2xl font-semibold font-mono-ds tabular-nums">
              99.99<span className="text-muted-foreground">%</span>
            </div>
          </div>
          <BentoBars />
        </div>

        <div className="sm:col-span-2 sm:row-span-2 rounded-xl border border-border bg-elevated/60 p-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-success" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Requests
            </span>
          </div>
          <div className="mt-1 text-lg font-semibold font-mono-ds">2.4M</div>
          <div className="mt-2">
            <MiniChart />
          </div>
        </div>

        <div className="sm:col-span-4 sm:row-span-2 rounded-xl border border-border bg-elevated/60 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-secondary" />
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Activity
              </span>
            </div>
            <span className="rounded-full bg-warning/10 border border-warning/25 text-warning text-[9px] font-mono-ds px-1.5 py-0.5">
              3 new
            </span>
          </div>
          <ul className="mt-2 space-y-1.5 text-[11px]">
            {[
              { c: "bg-success", t: "Deploy succeeded", m: "prod · 2m" },
              { c: "bg-primary", t: "New signup", m: "eu-west · 4m" },
              { c: "bg-warning", t: "Rate limit near", m: "api · 7m" },
            ].map((r) => (
              <li key={r.t} className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${r.c}`} />
                <span className="text-foreground/90 truncate">{r.t}</span>
                <span className="ml-auto font-mono-ds text-muted-foreground">{r.m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardShell>
  );
}

function BentoBars() {
  const bars = [10, 14, 9, 18, 13, 20, 16, 24, 19, 22];
  return (
    <div className="flex items-end gap-1 h-10">
      {bars.map((b, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-t from-primary/60 to-primary/20"
          style={{ height: `${(b / 24) * 100}%` }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  CARD 03 — Profile                                                         */
/* -------------------------------------------------------------------------- */

function ProfileCard() {
  return (
    <CardShell
      name="Profile Card"
      category="People"
      description="Enterprise team member card with skills, stats and actions."
      source="card-profile.tsx"
    >
      <div className="min-h-[280px] flex flex-col">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div
              className="h-16 w-16 rounded-2xl grid place-items-center text-lg font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 55%, #ec4899 100%)",
              }}
            >
              EM
            </div>
            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-success border-[3px] border-background" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="text-[15px] font-semibold truncate">Oktavia Wulandari</h4>
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
              <span className="ml-auto rounded-md bg-primary/10 border border-primary/25 text-primary text-[10px] font-mono-ds px-1.5 py-0.5">
                Staff · L6
              </span>
            </div>
            <div className="text-[12px] text-muted-foreground truncate">
              Principal Design Engineer
            </div>
            <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Jakarta, ID
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                Wijaya Labs
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Design Systems", "React", "Motion", "Type"].map((s) => (
            <span
              key={s}
              className="rounded-md border border-border bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono-ds text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <MiniStat label="Followers" value="12.4k" />
          <MiniStat label="Projects" value="38" />
          <MiniStat label="Years" value="9" />
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
            <span className="uppercase tracking-wider">Availability</span>
            <span className="font-mono-ds text-success">Open · Q2</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
        </div>

        <div className="mt-auto pt-3 flex items-center gap-2">
          <button className="flex-1 h-9 rounded-lg bg-foreground text-background text-[12px] font-medium hover:opacity-90 transition-opacity">
            View Profile
          </button>
          <button className="h-9 px-3 rounded-lg border border-border bg-surface/60 text-[12px] flex items-center gap-1.5 hover:border-white/10 transition-colors">
            <MessageSquare className="h-3.5 w-3.5" />
            Message
          </button>
          <div className="ml-1 flex items-center gap-1 text-muted-foreground">
            <SocialBtn>
              <Twitter className="h-3.5 w-3.5" />
            </SocialBtn>
            <SocialBtn>
              <Linkedin className="h-3.5 w-3.5" />
            </SocialBtn>
            <SocialBtn>
              <Globe className="h-3.5 w-3.5" />
            </SocialBtn>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-white/[0.02] px-2.5 py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-[14px] font-semibold font-mono-ds tabular-nums">{value}</div>
    </div>
  );
}
function SocialBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="h-7 w-7 grid place-items-center rounded-md border border-border bg-surface/60 hover:text-foreground transition-colors">
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  CARD 04 — Pricing                                                         */
/* -------------------------------------------------------------------------- */

function PricingCard() {
  const features = [
    "Unlimited projects & workspaces",
    "Full REST & GraphQL API access",
    "Priority 24/7 engineering support",
    "Advanced analytics & audit logs",
    "Custom SSO and integrations",
  ];
  return (
    <CardShell
      name="Pricing Card"
      category="Commerce"
      description="SaaS pricing plan with feature checklist and primary CTA."
      source="card-pricing.tsx"
    >
      <div className="rounded-2xl border border-primary/25 bg-gradient-to-b from-primary/[0.06] to-transparent p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/25 grid place-items-center shrink-0">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Plan</div>
              <div className="text-[14px] font-semibold">Professional</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-[10px] font-medium shrink-0">
            <Sparkles className="h-3 w-3" /> Most popular
          </div>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-semibold tracking-tight tabular-nums font-mono-ds">
            $49
          </span>
          <span className="text-muted-foreground text-[13px]">/ month</span>
          <span className="ml-2 rounded-md bg-success/10 border border-success/25 text-success text-[10px] font-mono-ds px-1.5 py-0.5">
            Save 20%
          </span>
        </div>

        <ul className="space-y-1.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[12px] text-foreground/90">
              <span className="mt-[3px] h-3.5 w-3.5 shrink-0 rounded-full bg-primary/15 border border-primary/30 grid place-items-center">
                <Check className="h-2.5 w-2.5 text-primary" />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <button className="w-full h-10 rounded-lg bg-gradient-to-b from-primary to-[color:var(--primary)]/80 text-primary-foreground text-[13px] font-medium hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)]">
            Start free trial
          </button>
          <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
            <a href="#" className="hover:text-foreground">
              Compare plans →
            </a>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> No credit card required
            </span>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Inspector                                                                 */
/* -------------------------------------------------------------------------- */

function Inspector() {
  return (
    <div className="sticky top-20 card-elevated overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Command className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[12px] font-medium">Inspector</span>
        </div>
        <span className="font-mono-ds text-[10px] text-muted-foreground">Card / Bento</span>
      </div>

      <div className="p-4 space-y-4 text-[12px]">
        <InspectorSection icon={<Layers className="h-3.5 w-3.5" />} title="Variants">
          <div className="grid grid-cols-3 gap-1.5">
            {["default", "glass", "bento", "outline", "elevated", "ghost"].map((v, i) => (
              <span
                key={v}
                className={`rounded-md border px-2 py-1 text-center font-mono-ds text-[10px] ${i === 2
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-white/[0.02] text-muted-foreground"
                  }`}
              >
                {v}
              </span>
            ))}
          </div>
        </InspectorSection>

        <InspectorSection icon={<Ruler className="h-3.5 w-3.5" />} title="Properties">
          <PropRow name="padding" value="24px" />
          <PropRow name="radius" value="16px" />
          <PropRow name="border" value="1px / rgba" />
          <PropRow name="shadow" value="elevation-3" />
          <PropRow name="gap" value="8pt grid" />
        </InspectorSection>

        <InspectorSection icon={<Circle className="h-3.5 w-3.5" />} title="States">
          <div className="flex flex-wrap gap-1.5">
            {[
              ["default", "text-muted-foreground"],
              ["hover", "text-foreground"],
              ["focus", "text-primary"],
              ["pressed", "text-secondary"],
              ["loading", "text-warning"],
              ["disabled", "text-muted-foreground"],
            ].map(([s, c]) => (
              <span
                key={s}
                className={`rounded-md border border-border bg-white/[0.02] px-2 py-0.5 font-mono-ds text-[10px] ${c}`}
              >
                {s}
              </span>
            ))}
          </div>
        </InspectorSection>

        <InspectorSection icon={<Type className="h-3.5 w-3.5" />} title="Typography">
          <PropRow name="title" value="15 / 600 / -0.01em" />
          <PropRow name="body" value="13 / 400 / 1.5" />
          <PropRow name="mono" value="JetBrains 11" />
        </InspectorSection>

        <InspectorSection icon={<Palette className="h-3.5 w-3.5" />} title="Tokens">
          <div className="flex flex-wrap gap-1.5">
            {[
              ["bg", "#09090B"],
              ["surface", "#111318"],
              ["primary", "#3B82F6"],
              ["accent", "#8B5CF6"],
              ["success", "#22C55E"],
              ["danger", "#EF4444"],
            ].map(([n, c]) => (
              <div
                key={n}
                className="flex items-center gap-1.5 rounded-md border border-border bg-white/[0.02] px-1.5 py-1"
              >
                <span
                  className="h-3 w-3 rounded-sm border border-white/10"
                  style={{ background: c }}
                />
                <span className="font-mono-ds text-[10px] text-muted-foreground">{n}</span>
              </div>
            ))}
          </div>
        </InspectorSection>

        <InspectorSection icon={<Accessibility className="h-3.5 w-3.5" />} title="Accessibility">
          <ul className="space-y-1.5 text-muted-foreground text-[11px]">
            <li className="flex items-center gap-2">
              <Check className="h-3 w-3 text-success" />
              WCAG 2.2 AA contrast
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-3 w-3 text-success" />
              Keyboard focus ring
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-3 w-3 text-success" />
              Reduced motion aware
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-3 w-3 text-success" />
              Semantic landmarks
            </li>
          </ul>
        </InspectorSection>

        <div className="pt-2 grid grid-cols-3 gap-1.5">
          {["JSX", "CSS", "TW"].map((c) => (
            <button
              key={c}
              className="h-8 rounded-md border border-border bg-white/[0.02] hover:bg-white/[0.05] text-[11px] font-mono-ds text-muted-foreground hover:text-foreground transition-colors"
            >
              Copy {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function InspectorSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
        {icon}
        <span>{title}</span>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
function PropRow({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md px-2 py-1 hover:bg-white/[0.02]">
      <span className="font-mono-ds text-[11px] text-muted-foreground">{name}</span>
      <span className="font-mono-ds text-[11px] text-foreground/90">{value}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Code preview                                                              */
/* -------------------------------------------------------------------------- */

const codeSamples: Record<string, { file: string; code: string[] }> = {
  React: {
    file: "card.tsx",
    code: [
      'import * as React from "react"',
      'import { cn } from "@/lib/utils"',
      "",
      "export const Card = React.forwardRef<",
      "  HTMLDivElement,",
      "  React.HTMLAttributes<HTMLDivElement>",
      ">(({ className, ...props }, ref) => (",
      "  <div",
      "    ref={ref}",
      "    className={cn(",
      '      "rounded-2xl border border-border",',
      '      "bg-card text-card-foreground",',
      '      "shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]",',
      "      className",
      "    )}",
      "    {...props}",
      "  />",
      "))",
      'Card.displayName = "Card"',
    ],
  },
  TypeScript: {
    file: "card.types.ts",
    code: [
      "export interface CardProps",
      "  extends React.HTMLAttributes<HTMLDivElement> {",
      '  variant?: "default" | "glass" | "bento" | "outline"',
      "  elevation?: 0 | 1 | 2 | 3",
      "  interactive?: boolean",
      "}",
      "",
      "export interface CardHeaderProps {",
      "  title: string",
      "  description?: string",
      "  action?: React.ReactNode",
      "}",
    ],
  },
  Tailwind: {
    file: "card.tw.tsx",
    code: [
      "<article className={cn(",
      '  "group relative overflow-hidden rounded-2xl",',
      '  "border border-white/[0.06] bg-[#111318]",',
      '  "transition-all duration-300 ease-out",',
      '  "hover:-translate-y-0.5 hover:border-white/[0.12]",',
      '  "shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]"',
      ")}>",
      '  <header className="px-5 pt-5 pb-4">…</header>',
      '  <div className="px-5 pb-5">{children}</div>',
      "</article>",
    ],
  },
  CSS: {
    file: "card.css",
    code: [
      ".card {",
      "  border-radius: 16px;",
      "  border: 1px solid rgba(255, 255, 255, 0.06);",
      "  background: #111318;",
      "  box-shadow: 0 20px 40px -20px rgba(0,0,0,0.6);",
      "  transition: transform .3s cubic-bezier(.22,1,.36,1),",
      "              border-color .3s ease;",
      "}",
      ".card:hover {",
      "  transform: translateY(-2px);",
      "  border-color: rgba(255, 255, 255, 0.12);",
      "}",
    ],
  },
  Motion: {
    file: "card.motion.tsx",
    code: [
      'import { motion } from "framer-motion"',
      "",
      "export const MotionCard = motion(Card, { forwardMotionProps: true })",
      "",
      "<MotionCard",
      "  initial={{ opacity: 0, y: 8 }}",
      "  animate={{ opacity: 1, y: 0 }}",
      "  whileHover={{ y: -2 }}",
      "  whileTap={{ scale: 0.995 }}",
      '  transition={{ type: "spring", stiffness: 260, damping: 24 }}',
      "/>",
    ],
  },
};

function CodePreview() {
  const tabs = Object.keys(codeSamples);
  const [active, setActive] = useState(tabs[0]);
  const [copied, setCopied] = useState(false);
  const sample = codeSamples[active];

  return (
    <div className="mt-6 card-elevated overflow-hidden">
      <div className="flex items-center justify-between border-b border-border">
        <div className="flex overflow-x-auto min-w-0">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-4 h-11 text-[12px] font-medium border-r border-border transition-colors ${active === t
                ? "text-foreground bg-white/[0.03]"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 px-3 text-muted-foreground shrink-0 border-l border-border/50">
          <span className="font-mono-ds text-[11px]">{sample.file}</span>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(sample.code.join("\n"));
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="h-7 w-7 grid place-items-center rounded-md border border-border bg-surface/60 hover:text-foreground transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-success" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
      <pre className="font-mono-ds text-[12.5px] leading-6 overflow-x-auto">
        <code>
          {sample.code.map((line, i) => (
            <div key={i} className="flex hover:bg-white/[0.02]">
              <span className="select-none w-12 shrink-0 pr-4 pl-5 text-right text-muted-foreground/60 tabular-nums">
                {i + 1}
              </span>
              <span className="whitespace-pre pr-6">{highlight(line)}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

function highlight(line: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex =
    /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b(?:import|export|from|const|let|var|return|function|interface|extends|as|default|class)\b)|(\b(?:true|false|null|undefined|React)\b)|(\b\d+(?:\.\d+)?\b)|(<\/?[A-Z][\w.]*|<\/?[a-z][\w-]*)/g;

  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(line))) {
    if (m.index > last) parts.push(<span key={key++}>{line.slice(last, m.index)}</span>);
    const [tok, comment, str, kw, lit, num, tag] = m;
    let cls = "";
    if (comment) cls = "text-muted-foreground/70 italic";
    else if (str) cls = "text-[#a5f3b8]";
    else if (kw) cls = "text-[#c4b5fd]";
    else if (lit) cls = "text-[#fda4af]";
    else if (num) cls = "text-[#fcd34d]";
    else if (tag) cls = "text-[#93c5fd]";
    parts.push(
      <span key={key++} className={cls}>
        {tok}
      </span>,
    );
    last = m.index + tok.length;
  }
  if (last < line.length) parts.push(<span key={key++}>{line.slice(last)}</span>);
  return parts;
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-6 md:py-0 md:h-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-gradient-to-br from-primary to-secondary" />
          <span>Copyright &copy; Wijaya Kusuma</span>
        </div>
        <div className="hidden md:flex items-center gap-5 font-mono-ds">
          <span>build 2.4.1</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />
            All systems operational
          </span>
          <a href="#" className="hover:text-foreground flex items-center gap-1">
            <Bell className="h-3 w-3" /> Changelog
          </a>
          <a href="#" className="hover:text-foreground flex items-center gap-1">
            <Code2 className="h-3 w-3" /> Source
          </a>
        </div>
      </div>
    </footer>
  );
}
