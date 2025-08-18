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
  const CATEGORIES = [
    {
      title: "Frontend",
      icon: Code,
      accent: "from-blue-500/40 via-cyan-400/30 to-purple-500/40",
      skills: [
        "JavaScript (ES6+)",
        "React",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      title: "Backend",
      icon: Server,
      accent: "from-emerald-500/40 via-teal-400/30 to-sky-400/40",
      skills: ["Node.js", "Express", "REST APIs", "Python", "Django"],
    },
    {
      title: "Database & Tools",
      icon: Database,
      accent: "from-amber-400/40 via-rose-400/30 to-fuchsia-400/40",
      skills: ["MongoDB", "PostgreSQL", "Git", "Docker", "Postman", "VS Code"],
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
          The tools and technologies I use to design, build, and ship reliable
          web apps.
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
        {CATEGORIES.map(({ title, icon: Icon, skills, accent }) => (
          <motion.article
            key={title}
            variants={item}
            className="relative surface p-8 surface-hover"
          >
            {/* Gradient top border accent */}
            <div
              aria-hidden
              className={`absolute inset-x-0 -top-px h-px rounded-t-2xl bg-gradient-to-r ${accent}`}
            />

            {/* Title / icon */}
            <header className="flex items-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center
                              shadow-[0_6px_24px_rgba(0,0,0,.35)]"
              >
                <Icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-medium text-white">{title}</h3>
            </header>

            {/* Chips */}
            <ul className="flex flex-wrap gap-3">
              {skills.map((s) => (
                <li key={s}>
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                               bg-white/5 text-gray-200 text-sm border border-white/10
                               hover-lift"
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
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100
                         transition-opacity duration-500"
              style={{
                background:
                  "radial-gradient(600px 120px at 20% 0%, rgba(59,130,246,0.12), transparent), radial-gradient(600px 120px at 80% 100%, rgba(168,85,247,0.12), transparent)",
              }}
            />
          </motion.article>
        ))}
      </motion.div>

      {/* Subtle marquee of comfort zones (optional, purely visual) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="mt-14 text-center text-gray-400 text-sm"
      >
        <span className="opacity-80">Comfort zones: </span>
        <span className="text-gray-300">
          SPA architecture · RESTful APIs · Auth & JWT · CI-friendly code ·
          Responsive UI
        </span>
      </motion.div>
    </section>
  );
}
