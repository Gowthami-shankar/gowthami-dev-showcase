import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  ArrowRight,
  ArrowUp,
  Menu,
  X,
  ExternalLink,
  Code2,
  Database,
  Server,
  Wrench,
  Layers,
  Cpu,
  GraduationCap,
  Award,
  Briefcase,
  Send,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gowthami — Full-Stack Developer Portfolio" },
      {
        name: "description",
        content:
          "Gowthami — MCA student and Full-Stack Developer. React, Node.js, Laravel, Python. Open to Software Developer roles.",
      },
      { property: "og:title", content: "Gowthami — Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Gowthami. Projects, internship experience, skills, and contact.",
      },
    ],
  }),
  component: Portfolio,
});

const RESUME_URL = "/Gowthami-Resume.pdf";
const GITHUB_URL = "https://github.com/Gowthami-shankar";
const LINKEDIN_URL = "https://linkedin.com/in/gowthami-shankar";
const EMAIL = "gowthi1212@gmail.com";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-clip text-foreground">
      <BackgroundFX />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <RevealOnScroll />
    </div>
  );
}

/* ---------------- Background ---------------- */
function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[oklch(0.72_0.18_255/0.25)] blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.68_0.20_300/0.20)] blur-3xl animate-pulse-glow" />
    </div>
  );
}

/* ---------------- Navbar ---------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/60 border-b border-white/5" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#home" className="font-display text-lg font-bold tracking-tight">
          Gowthami<span className="text-gradient">.</span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                  active === n.id
                    ? "text-foreground bg-white/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a href={RESUME_URL} download className="btn-primary hover:btn-primary-hover text-sm">
            <Download className="h-4 w-4" /> Resume
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden rounded-full border border-white/10 bg-white/5 p-2"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden glass-strong border-t border-white/5 px-5 py-4">
          <ul className="flex flex-col gap-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm ${
                    active === n.id
                      ? "bg-white/5 text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={RESUME_URL}
                download
                onClick={() => setOpen(false)}
                className="btn-primary hover:btn-primary-hover w-full text-sm"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
const ROLES = ["Software Developer", "Full-Stack Developer", "Problem Solver"];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to Software Development Opportunities
          </div>

          <p className="mt-6 text-lg text-muted-foreground">Hi, I'm Gowthami 👋</p>
          <h1 className="mt-3 font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
            <span className="text-gradient">Full-Stack</span>
            <br />
            Developer
          </h1>

          <div className="mt-5 h-8 text-lg sm:text-xl">
            <span className="text-muted-foreground">I'm a </span>
            <span
              key={i}
              className="inline-block font-semibold text-gradient animate-[fade-in_0.5s_ease-out]"
            >
              {ROLES[i]}
            </span>
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Motivated MCA student and Full-Stack Developer passionate about building
            scalable web applications, solving real-world problems, and creating
            meaningful digital experiences.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary hover:btn-primary-hover">
              View My Projects <ArrowRight className="h-4 w-4" />
            </a>
            <a href={RESUME_URL} download className="btn-ghost hover:bg-white/10">
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <SocialIcon href={GITHUB_URL} label="GitHub">
              <Github className="h-4.5 w-4.5" />
            </SocialIcon>
            <SocialIcon href={LINKEDIN_URL} label="LinkedIn">
              <Linkedin className="h-4.5 w-4.5" />
            </SocialIcon>
            <SocialIcon href={`mailto:${EMAIL}`} label="Email">
              <Mail className="h-4.5 w-4.5" />
            </SocialIcon>
          </div>
        </div>

        <div className="reveal">
          <CodeWindow />
        </div>
      </div>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full glass text-muted-foreground transition-all hover:text-foreground hover:-translate-y-0.5 hover:glow-primary"
    >
      {children}
    </a>
  );
}

function CodeWindow() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-[oklch(0.72_0.18_255/0.35)] to-[oklch(0.68_0.20_300/0.30)] blur-3xl opacity-70 animate-float-slow" />
      <div className="relative glass-strong rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            gowthami.dev — developer.ts
          </span>
        </div>
        <pre className="font-mono text-[13px] leading-relaxed p-5 overflow-x-auto">
{`const gowthami = {
  role: "Full-Stack Developer",
  education: "MCA @ Manipal Institute of Technology",
  stack: {
    frontend: ["React", "JavaScript", "HTML", "CSS"],
    backend:  ["Node.js", "Express", "PHP", "Laravel"],
    data:     ["MySQL", "MongoDB"],
    core:     ["Java", "Python", "C++", "REST", "JWT"],
  },
  focus: "Scalable web apps + clean UX",
  status: "Open to opportunities ✨",
};`}
        </pre>
      </div>
    </div>
  );
}

/* ---------------- Section shell ---------------- */
function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mb-12 max-w-2xl">
          {eyebrow && (
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.78_0.15_260)]">
              <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
            </div>
          )}
          <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  const highlights = [
    { top: "MCA", bottom: "Manipal Institute of Technology", icon: GraduationCap },
    { top: "8.26", bottom: "MCA CGPA", icon: Award },
    { top: "Full-Stack", bottom: "Development Focus", icon: Layers },
    { top: "Open to Work", bottom: "Software Development Roles", icon: Briefcase },
  ];
  return (
    <Section id="about" eyebrow="About" title="About Me">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="reveal space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            I'm a Full-Stack Developer currently completing my Master of Computer
            Applications at{" "}
            <span className="text-foreground font-medium">
              Manipal Institute of Technology, Manipal
            </span>
            . I enjoy developing practical software solutions using modern web
            technologies and have hands-on experience across frontend, backend,
            databases, and machine learning applications.
          </p>
          <p>
            Through my internship and projects, I've worked on real-world systems
            involving REST APIs, authentication, database-driven applications,
            analytics dashboards, and responsive user interfaces. I'm passionate
            about continuously learning and applying technology to solve
            meaningful problems.
          </p>
        </div>
        <div className="reveal grid grid-cols-2 gap-4">
          {highlights.map((h) => (
            <div
              key={h.bottom}
              className="glass rounded-2xl p-5 transition-transform hover:-translate-y-1"
            >
              <h.icon className="h-5 w-5 text-[oklch(0.78_0.15_260)]" />
              <div className="mt-3 font-display text-2xl font-bold text-gradient">
                {h.top}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{h.bottom}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Experience ---------------- */
function Experience() {
  const tech = ["Laravel", "PHP", "MySQL", "JavaScript", "HTML", "CSS"];
  const bullets = [
    "Developed a Construction CRM System using PHP Laravel, MySQL, JavaScript, HTML, and CSS.",
    "Implemented role-based authentication and project & client management functionality.",
    "Worked on database operations and improved application performance.",
    "Participated in requirement analysis, testing, debugging, and deployment.",
    "Followed MVC architecture and software development best practices.",
  ];
  return (
    <Section id="experience" eyebrow="Experience" title="Experience">
      <div className="reveal">
        <div className="glass-strong rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[oklch(0.72_0.18_255/0.25)] blur-3xl" />
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[oklch(0.78_0.17_255)] to-[oklch(0.68_0.20_300)] text-[oklch(0.15_0.03_265)]">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-bold sm:text-2xl">
                  Software Engineer Intern
                </h3>
                <span className="text-xs font-mono text-muted-foreground">
                  Jan 2026 – May 2026 · Remote
                </span>
              </div>
              <div className="mt-1 text-[oklch(0.78_0.15_260)] font-medium">
                Udupi Web Solutions
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.78_0.15_260)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {tech.map((t) => (
                  <TechBadge key={t}>{t}</TechBadge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/90">
      {children}
    </span>
  );
}

/* ---------------- Skills ---------------- */
function Skills() {
  const groups = [
    {
      icon: Code2,
      title: "Programming Languages",
      items: ["Java", "JavaScript", "Python", "C++"],
    },
    { icon: Layers, title: "Frontend", items: ["HTML", "CSS", "React"] },
    {
      icon: Server,
      title: "Backend",
      items: ["Node.js", "Express.js", "PHP", "Laravel"],
    },
    { icon: Database, title: "Databases", items: ["MySQL", "MongoDB"] },
    {
      icon: Cpu,
      title: "Core Concepts",
      items: [
        "Object-Oriented Programming",
        "Data Structures & Algorithms",
        "DBMS",
        "Operating Systems",
        "REST API Development",
        "JWT Authentication",
      ],
    },
    {
      icon: Wrench,
      title: "Tools & Platforms",
      items: ["Git", "GitHub", "VS Code", "Jest"],
    },
  ];
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technical Skills"
      subtitle="Technologies and tools I use to build applications."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <div
            key={g.title}
            className="reveal glass rounded-2xl p-6 transition-all hover:-translate-y-1 hover:glow-primary"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.78_0.17_255/0.25)] to-[oklch(0.68_0.20_300/0.25)] text-[oklch(0.85_0.14_255)]">
                <g.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold">{g.title}</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((it) => (
                <TechBadge key={it}>{it}</TechBadge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Projects ---------------- */
type Project = {
  title: string;
  description: string;
  stack: string[];
  features: string[];
  github: string;
  live?: string;
  visual: "analytics" | "commerce" | "parking";
  note?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Student Performance Prediction System",
    description:
      "An AI-powered web application that predicts students' final examination performance using academic factors and provides interactive analytics and personalized insights.",
    stack: ["Python", "Flask", "Scikit-learn", "SQLite"],
    features: [
      "ML-based score prediction using study hours, attendance, previous scores, and assignment completion.",
      "Interactive analytics dashboard with prediction trends, distributions, and historical tracking.",
      "Performance categorization, personalized recommendations, filtering, and CSV export.",
    ],
    github: GITHUB_URL,
    visual: "analytics",
  },
  {
    title: "Sweet Shop Management System",
    description:
      "A full-stack management platform for handling inventory, sales, authentication, and stock operations efficiently.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Jest"],
    features: [
      "Secure authentication and role-based access control using JWT.",
      "RESTful APIs for inventory CRUD, sales processing, and stock management.",
      "Responsive React interface with search, filtering, and real-time inventory updates.",
    ],
    github: GITHUB_URL,
    visual: "commerce",
    note: "Built following Test-Driven Development with Jest and Supertest.",
  },
  {
    title: "Hospital Parking Management System",
    description:
      "A full-stack web application designed to automate and simplify hospital parking management operations.",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    features: [
      "Vehicle entry and parking record management.",
      "Search and report generation.",
      "Parking category management and organized data handling.",
    ],
    github: GITHUB_URL,
    visual: "parking",
  },
];

function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Work"
      title="Featured Projects"
      subtitle="Some of the projects I've built while learning and solving real-world problems."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
      <div className="reveal mt-10 flex justify-center">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost hover:bg-white/10"
        >
          Explore More on GitHub <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="reveal group glass-strong rounded-2xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:glow-primary">
      <ProjectVisual variant={project.visual} />
      <div className="p-6 flex flex-col grow">
        <h3 className="font-display text-xl font-bold">{project.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <TechBadge key={s}>{s}</TechBadge>
          ))}
        </div>

        <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
          {project.features.map((f) => (
            <li key={f} className="flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.78_0.15_260)]" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {project.note && (
          <p className="mt-4 text-xs italic text-muted-foreground/80">{project.note}</p>
        )}

        <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-white/5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost hover:bg-white/10 !py-2 !px-4 text-sm"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hover:btn-primary-hover !py-2 !px-4 text-sm"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectVisual({ variant }: { variant: Project["visual"] }) {
  if (variant === "analytics") {
    return (
      <div className="relative h-44 overflow-hidden border-b border-white/5 bg-gradient-to-br from-[oklch(0.24_0.05_265)] to-[oklch(0.18_0.04_275)]">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <svg viewBox="0 0 400 160" className="relative h-full w-full">
          <defs>
            <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.78 0.17 255)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="oklch(0.78 0.17 255)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 120 L50 90 L100 100 L150 60 L200 75 L250 40 L300 55 L350 25 L400 45 L400 160 L0 160 Z"
            fill="url(#g1)"
          />
          <path
            d="M0 120 L50 90 L100 100 L150 60 L200 75 L250 40 L300 55 L350 25 L400 45"
            fill="none"
            stroke="oklch(0.85 0.14 255)"
            strokeWidth="2"
          />
          {[50, 100, 150, 200, 250, 300, 350].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy={[90, 100, 60, 75, 40, 55, 25][i]}
              r="3"
              fill="oklch(0.85 0.14 255)"
            />
          ))}
        </svg>
      </div>
    );
  }
  if (variant === "commerce") {
    return (
      <div className="relative h-44 overflow-hidden border-b border-white/5 bg-gradient-to-br from-[oklch(0.22_0.06_290)] to-[oklch(0.18_0.04_270)]">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative grid h-full grid-cols-3 gap-3 p-5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-white/10 bg-white/5"
              style={{ opacity: 1 - i * 0.1 }}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-44 overflow-hidden border-b border-white/5 bg-gradient-to-br from-[oklch(0.20_0.05_265)] to-[oklch(0.18_0.04_290)]">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <svg viewBox="0 0 400 160" className="relative h-full w-full">
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3, 4].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={30 + c * 70}
              y={20 + r * 40}
              width={55}
              height={26}
              rx={4}
              fill="oklch(1 0 0 / 0.05)"
              stroke="oklch(0.78 0.15 260 / 0.5)"
              strokeWidth="1"
            />
          )),
        )}
        <rect x={100} y={60} width={55} height={26} rx={4} fill="oklch(0.78 0.17 255 / 0.35)" />
        <rect x={240} y={100} width={55} height={26} rx={4} fill="oklch(0.68 0.20 300 / 0.35)" />
      </svg>
    </div>
  );
}

/* ---------------- Education ---------------- */
function Education() {
  const items = [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "Manipal Institute of Technology, Manipal",
      period: "2024 – 2026",
      score: "CGPA: 8.26",
      big: true,
    },
    {
      degree: "Bachelor of Science — Mathematics & Computer Science",
      school: "Mahatma Gandhi Memorial College, Udupi",
      period: "2021 – 2024",
      score: "CGPA: 9.5",
      big: true,
    },
    {
      degree: "Pre-University Education",
      school: "Poornaprajna Pre-University College, Udupi",
      period: "2019 – 2021",
      score: "Score: 88.33%",
      big: false,
    },
    {
      degree: "SSLC",
      school: "Karnataka Public School, Kokkarne",
      period: "2019",
      score: "Score: 84.5%",
      big: false,
    },
  ];
  return (
    <Section id="education" eyebrow="Academics" title="Education">
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[oklch(0.78_0.15_260/0.6)] via-white/10 to-transparent sm:left-6" />
        <ul className="space-y-5">
          {items.map((it) => (
            <li
              key={it.degree}
              className={`reveal relative pl-12 sm:pl-16 ${it.big ? "" : "opacity-90"}`}
            >
              <span
                className={`absolute left-2 top-5 grid place-items-center rounded-full sm:left-4 ${
                  it.big
                    ? "h-5 w-5 bg-gradient-to-br from-[oklch(0.78_0.17_255)] to-[oklch(0.68_0.20_300)]"
                    : "h-3 w-3 bg-white/20 ml-1 mt-1"
                }`}
              />
              <div
                className={`glass rounded-2xl ${it.big ? "p-6" : "p-4"} flex flex-wrap items-start justify-between gap-3`}
              >
                <div className="min-w-0">
                  <h3
                    className={`font-display font-semibold ${it.big ? "text-lg sm:text-xl" : "text-base"}`}
                  >
                    {it.degree}
                  </h3>
                  <div className="mt-1 text-sm text-muted-foreground">{it.school}</div>
                  <div className="mt-1 font-mono text-xs text-muted-foreground">
                    {it.period}
                  </div>
                </div>
                <div
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    it.big
                      ? "bg-gradient-to-r from-[oklch(0.78_0.17_255/0.25)] to-[oklch(0.68_0.20_300/0.25)] text-[oklch(0.9_0.1_260)]"
                      : "bg-white/5 text-muted-foreground"
                  }`}
                >
                  {it.score}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------------- Certifications ---------------- */
function Certifications() {
  const certs = [
    {
      title: "Responsive Website Basics: Code with HTML, CSS, and JavaScript",
      issuer: "Coursera",
      date: "October 2024",
    },
    {
      title: "Linear Algebra for Machine Learning and Data Science",
      issuer: "Coursera",
      date: "October 2024",
    },
    { title: "Introduction to MongoDB", issuer: "Coursera", date: "March 2025" },
  ];
  return (
    <Section id="certifications" eyebrow="Credentials" title="Certifications">
      <div className="grid gap-5 md:grid-cols-3">
        {certs.map((c) => (
          <div
            key={c.title}
            className="reveal glass rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-1 hover:glow-primary"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.78_0.17_255/0.25)] to-[oklch(0.68_0.20_300/0.25)] text-[oklch(0.85_0.14_255)]">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display font-semibold leading-snug">{c.title}</h3>
            <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{c.issuer}</span>
              <span className="font-mono">{c.date}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const [status, setStatus] = useState<null | "sent" | "error">(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const subject = String(fd.get("subject") ?? "");
    const message = String(fd.get("message") ?? "");
    // No backend configured — open user's mail client with a prefilled draft.
    const body = encodeURIComponent(`Hi Gowthami,\n\n${message}\n\n— ${name} (${email})`);
    const s = encodeURIComponent(subject || "Portfolio contact");
    window.location.href = `mailto:${EMAIL}?subject=${s}&body=${body}`;
    setStatus("sent");
    formRef.current?.reset();
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's Build Something Together"
      subtitle="I'm currently open to software development opportunities where I can contribute, learn, and grow. If you're hiring or would like to discuss an opportunity, feel free to reach out."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="reveal space-y-3">
          <ContactRow icon={Mail} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
          <ContactRow
            icon={Linkedin}
            label="LinkedIn"
            value="linkedin.com/in/gowthami-shankar"
            href={LINKEDIN_URL}
          />
          <ContactRow
            icon={Github}
            label="GitHub"
            value="github.com/Gowthami-shankar"
            href={GITHUB_URL}
          />
          <ContactRow icon={MapPin} label="Location" value="Udupi, Karnataka, India" />
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="reveal glass-strong rounded-2xl p-6 sm:p-8 space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Name" placeholder="Your name" required />
            <Field
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              required
            />
          </div>
          <Field name="subject" label="Subject" placeholder="What's this about?" required />
          <Field
            name="message"
            label="Message"
            placeholder="Tell me a little about the opportunity…"
            required
            textarea
          />
          <button type="submit" className="btn-primary hover:btn-primary-hover w-full sm:w-auto">
            <Send className="h-4 w-4" /> Send Message
          </button>
          <p className="text-xs text-muted-foreground">
            {status === "sent"
              ? "Opening your email client — thanks for reaching out!"
              : "This form opens your email client. A backend service can be plugged in later."}
          </p>
        </form>
      </div>
    </Section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="glass rounded-2xl p-4 flex items-center gap-4 transition-all hover:-translate-y-0.5 hover:glow-primary">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.78_0.17_255/0.25)] to-[oklch(0.68_0.20_300/0.25)] text-[oklch(0.85_0.14_255)]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="truncate font-medium">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required,
  textarea,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-[oklch(0.78_0.17_255/0.6)] focus:ring-2 focus:ring-[oklch(0.78_0.17_255/0.25)] transition";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} required={required} rows={5} className={cls} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} required={required} className={cls} />
      )}
    </label>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 mt-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <p className="text-sm text-muted-foreground">
          Designed &amp; Built by <span className="text-foreground font-medium">Gowthami</span>
        </p>
        <div className="flex items-center gap-3">
          <SocialIcon href={GITHUB_URL} label="GitHub">
            <Github className="h-4 w-4" />
          </SocialIcon>
          <SocialIcon href={LINKEDIN_URL} label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </SocialIcon>
          <SocialIcon href={`mailto:${EMAIL}`} label="Email">
            <Mail className="h-4 w-4" />
          </SocialIcon>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Back to top ---------------- */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full glass-strong text-foreground shadow-lg hover:glow-primary transition-all"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ---------------- Reveal ---------------- */
function RevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return null;
}
