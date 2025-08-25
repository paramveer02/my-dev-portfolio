// components/Skills.jsx
import { Code, Server, Database } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Skills() {
  // Curated to mirror JobFix, EventSpark, Tic-Tac-Toe
  const CATEGORIES = [
    {
      title: "Frontend",
      icon: Code,
      accent: "from-blue-500/40 via-cyan-400/30 to-blue-500/40",
      blurb:
        "Sharp UIs with motion where it helps. I care about first-load speed, accessibility and clean component APIs.",
      skills: [
        "JavaScript (ES6+)",
        "React",
        "Vite",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Framer Motion",
        "Recharts",
      ],
    },
    {
      title: "Backend & APIs",
      icon: Server,
      accent: "from-emerald-500/40 via-teal-400/30 to-sky-400/40",
      blurb:
        "Pragmatic REST backends with auth, validation and good error handling. Built to be readable and easy to extend.",
      skills: [
        "Node.js",
        "Express",
        "REST APIs",
        "JWT Auth",
        "Python",
        "Django",
        "Spring Boot",
      ],
    },
    {
      title: "Databases & Ops",
      icon: Database,
      accent: "from-indigo-500/35 via-blue-500/30 to-purple-500/35",
      blurb:
        "Ship-ready workflows: from local dev to cloud. Sensible schemas, file uploads, and smooth deploys.",
      skills: [
        "MongoDB · Mongoose",
        "psql (CLI)",
        "pgAdmin 4",
        "Postman",
        "Git / GitHub / BitBucket",
        "Render",
        "Cloudinary",
        "Gemini GenAI",
        "Docker",
        "Zod Validation",
        "Leaflet / Google Maps",
      ],
    },
  ];

  return (
    <section id="skills" className="section-container">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container mx-auto max-w-6xl text-center mb-16"
      >
        <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-light text-white mb-6">
          Technical Skills
        </h2>
        <div className="w-24 h-px bg-blue-600 mx-auto" />
        <p className="mt-6 text-gray-300/90 max-w-2xl mx-auto">
          What I use day-to-day to design, build & deliver reliable apps.
        </p>
      </motion.div>

      {/* Skill cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-8 md:grid-cols-3"
      >
        {CATEGORIES.map(({ title, icon: Icon, skills, accent, blurb }) => (
          <motion.article
            key={title}
            variants={item}
            className="relative surface p-8 surface-hover group"
          >
            {/* Gradient top border accent */}
            <div
              aria-hidden
              className={`absolute inset-x-0 -top-px h-px rounded-t-2xl bg-gradient-to-r ${accent}`}
            />

            {/* Title / icon */}
            <header className="flex items-center gap-4 mb-7">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_6px_24px_rgba(0,0,0,.35)]">
                <Icon className="h-7 w-7 text-blue-400" />
              </div>
              <h3 className="text-[clamp(1.25rem,1.7vw,1.6rem)] font-semibold text-white tracking-tight">
                {title}
              </h3>
            </header>

            {/* One-line personal blurb */}
            <p className="text-white-400 text-sm mb-9">{blurb}</p>

            {/* Chips */}
            <ul className="flex flex-wrap gap-3">
              {skills.map((s) => (
                <li key={s}>
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                               bg-white/5 text-gray-200 text-sm border border-white/10
                               hover-lift"
                    title={s}
                  >
                    <span className="inline-block size-1.5 rounded-full bg-blue-400/80 shadow-[0_0_8px_rgba(59,130,246,.45)]" />
                    {s}
                  </span>
                </li>
              ))}
            </ul>

            {/* Soft corner glow on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "radial-gradient(600px 120px at 20% 0%, rgba(59,130,246,0.12), transparent), radial-gradient(600px 120px at 80% 100%, rgba(99,102,241,0.12), transparent)",
              }}
            />
          </motion.article>
        ))}
      </motion.div>

      {/* Footnote — keeps it human */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="mt-14 text-center text-gray-400 text-sm max-w-3xl mx-auto"
      >
        Most recent work: MERN apps with auth, file uploads, charts, maps and
        more.
      </motion.p>
    </section>
  );
}
