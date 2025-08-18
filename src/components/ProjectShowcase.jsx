import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectShowcase({ project, index }) {
  const isReversed = index % 2 === 1;
  const {
    title,
    description,
    images = [],
    tech = [],
    year,
    links = {},
  } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="grid gap-10 lg:grid-cols-12 items-center"
    >
      {/* Images */}
      <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : ""}`}>
        <div className="relative">
          {/* soft section glow */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-30
                       bg-[radial-gradient(600px_300px_at_50%_0%,rgba(59,130,246,0.18),transparent_70%)]"
          />
          <div className="grid grid-cols-12 gap-3">
            {/* Main image */}
            <motion.div
              whileHover={{ y: -6 }}
              className="col-span-12 md:col-span-12 rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            >
              {images[0] && (
                <img
                  src={images[0]}
                  alt={`${title} main`}
                  className="w-full h-[260px] md:h-[360px] object-cover"
                  loading="lazy"
                />
              )}
            </motion.div>

            {/* Thumbs */}
            {[images[1], images[2], images[3]].filter(Boolean).map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="col-span-4 rounded-xl overflow-hidden border border-white/10 bg-white/5"
              >
                <img
                  src={src}
                  alt={`${title} screen ${i + 2}`}
                  className="w-full h-28 md:h-32 object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`lg:col-span-5 ${isReversed ? "lg:order-1" : ""}`}>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs tracking-wide
                             bg-white/5 text-gray-300 border border-white/10"
            >
              {year}
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <h3 className="text-2xl md:text-3xl font-light text-white">
            {title}
          </h3>

          <p className="text-gray-300/90 leading-relaxed">{description}</p>

          {/* Tech chips */}
          {/* Tech chips */}
          <ul className="flex flex-wrap gap-2.5 pt-1">
            {tech.map((t) => (
              <li key={t}>
                <span className="chip chip--tech">
                  <span className="chip-dot" />
                  {t}
                </span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="pt-2 flex items-center gap-3">
            <a
              href={links.live || "#"}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg
                         border border-white/15 bg-white/5 text-white
                         hover:bg-gradient-to-br hover:from-amber-400/15 hover:to-rose-400/15
                         transition-all duration-300 hover:-translate-y-0.5"
            >
              <ExternalLink className="w-4 h-4 opacity-80 group-hover:opacity-100" />
              Live
            </a>
            <a
              href={links.code || "#"}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg
                         border border-white/15 bg-white/5 text-white
                         hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4 opacity-80 group-hover:opacity-100" />
              Code
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
