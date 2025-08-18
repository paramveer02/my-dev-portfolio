import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function About() {
  return (
    <section id="about" className="section-container">
      {/* Centered header (consistent with Work/Skills) */}
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="text-center mb-12"
      >
        <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-light text-white mb-6">
          About Me
        </h2>
        <div className="w-24 h-px bg-blue-600 mx-auto" />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 items-center"
      >
        {/* Copy */}
        <div className="lg:col-span-7">
          <div className="space-y-6 text-[clamp(1rem,1.8vw,1.125rem)] text-gray-300/90 leading-relaxed max-w-2xl">
            <p>
              I’m a full-stack developer with{" "}
              <span className="text-white/90 font-medium">2+ years</span> of
              experience. I care about{" "}
              <span className="text-white/90 font-medium">
                speed, clean code, and UX
              </span>
              —turning ideas into reliable, elegant products.
            </p>
            {/* <p>
              Recent stack: <span className="text-white/90">React</span>,{" "}
              <span className="text-white/90">JavaScript</span>,{" "}
              <span className="text-white/90">Node.js</span>,{" "}
              <span className="text-white/90">Express</span>,{" "}
              <span className="text-white/90">MongoDB</span> + a dash of{" "}
              <span className="text-white/90">Python</span>.
            </p> */}
          </div>

          {/* Chips */}
          <ul className="flex flex-wrap gap-3 pt-6 max-w-2xl">
            {[
              "React",
              "JavaScript",
              "Node.js",
              "Express",
              "MongoDB",
              "PostgreSQL",
              "Tailwind CSS",
              "Framer Motion",
              "Docker",
            ].map((t) => (
              <li
                key={t}
                className="px-3 py-1.5 rounded-full text-sm text-gray-200 border border-white/10 bg-white/5 hover-lift"
              >
                {t}
              </li>
            ))}
          </ul>

          {/* Compact stats (separate, not huge) */}
          <div className="grid grid-cols-2 gap-6 pt-8 max-w-2xl">
            <div className="surface p-6">
              <div className="text-4xl font-light text-blue-400 mb-1">5+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="surface p-6">
              <div className="text-4xl font-light text-blue-400 mb-1">2+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Floating circular portrait (contained, cool glow, no bleed) */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto w-72 h-72 md:w-80 md:h-80">
            {/* Contained ambient glow (masked to the circle area) */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                // keep the bloom inside ~75% of the circle to avoid section pooling
                maskImage:
                  "radial-gradient(closest-side, black 75%, transparent 78%)",
                WebkitMaskImage:
                  "radial-gradient(closest-side, black 75%, transparent 78%)",
                background:
                  //   // cool blue/cyan only
                  "radial-gradient(55% 55% at 30% 30%, rgba(0, 0, 0, 0.22), transparent 60%)," +
                  "radial-gradient(55% 55% at 72% 70%, rgba(0, 0, 0, 0.18), transparent 64%)",
                filter: "blur(12px)",
              }}
            />

            {/* Soft halo (very subtle) */}
            <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/8 blur-2xl" />

            {/* The avatar ring (blue/cyan gradient only) */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: 0.25 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-full h-full rounded-full p-[2px]
                 bg-gradient-to-br from-blue-500/40 via-cyan-400/30 to-blue-500/40
                 shadow-[0_12px_40px_rgba(59,130,246,0.18)]"
            >
              <div className="rounded-full overflow-hidden bg-black/60 border border-white/10 w-full h-full">
                <img
                  src="/profile.jpg"
                  alt="Paramveer Marwah portrait"
                  className="w-full h-full object-cover object-[18%_35%] grayscale transition-all duration-500 hover:grayscale-0"
                />
              </div>

              {/* Subtle rotating sheen */}
              <span
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  WebkitMask: "radial-gradient(transparent 55%, black 60%)",
                  mask: "radial-gradient(transparent 55%, black 60%)",
                  background:
                    "conic-gradient(from 0deg, rgba(255,255,255,0.0), rgba(255,255,255,0.33), rgba(255,255,255,0.0))",
                  animation: "spin 6s linear infinite",
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
