// components/ProjectShowcase.jsx
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Server,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

/* ===== HOVER SLIDESHOW (1 image at a time) ===== */
const DEFAULT_SECS_PER_IMAGE = 3.0;
const DEFAULT_MAX_FRAMES = 4;

function HoverCarousel({
  images = [],
  title,
  secsPerImage = DEFAULT_SECS_PER_IMAGE,
  maxFrames = DEFAULT_MAX_FRAMES,
  autoplay = false,
  className = "",
  fit = "contain",
  position = "center",
}) {
  const frames = useMemo(
    () => images.filter(Boolean).slice(0, maxFrames),
    [images, maxFrames]
  );
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(autoplay);
  const tRef = useRef(null);

  const start = () => frames.length > 1 && setPlaying(true);
  const stop = () => setPlaying(false);

  useEffect(() => {
    if (!playing || frames.length < 2) return;
    tRef.current = setInterval(
      () => setIdx((i) => (i + 1) % frames.length),
      secsPerImage * 1000
    );
    return () => clearInterval(tRef.current);
  }, [playing, frames.length, secsPerImage]);

  useEffect(() => {
    setIdx(0);
    setPlaying(autoplay);
  }, [frames.length, autoplay]);

  const prev = () =>
    frames.length > 1 && setIdx((i) => (i - 1 + frames.length) % frames.length);
  const next = () =>
    frames.length > 1 && setIdx((i) => (i + 1) % frames.length);

  const variants = {
    initial: { x: "100%", opacity: 0 },
    enter: {
      x: "0%",
      opacity: 1,
      transition: { duration: 0.45, ease: "easeInOut" },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.45, ease: "easeInOut" },
    },
  };

  return (
    <div
      onMouseEnter={start}
      onMouseLeave={stop}
      onTouchStart={start}
      onTouchEnd={stop}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="relative w-full aspect-[16/9] bg-black/30 rounded-2xl overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          {frames.length > 0 && (
            <motion.img
              key={`${title}-${idx}`}
              src={frames[idx]}
              alt={`${title} slide ${idx + 1}`}
              className={[
                "absolute inset-0 w-full h-full select-none pointer-events-none",
                fit === "contain" ? "object-contain" : "object-cover",
                position === "top"
                  ? "object-top"
                  : position === "bottom"
                  ? "object-bottom"
                  : position === "left"
                  ? "object-left"
                  : position === "right"
                  ? "object-right"
                  : "object-center",
              ].join(" ")}
              variants={variants}
              initial="initial"
              animate="enter"
              exit="exit"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Dots */}
      {frames.length > 1 && (
        <div className="mt-2 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 px-2 py-1">
            {frames.map((_, j) => (
              <button
                key={j}
                type="button"
                onClick={() => setIdx(j)}
                className={[
                  "h-1.5 rounded-full transition-all",
                  j === idx
                    ? "w-6 bg-white shadow-[0_0_0_3px_rgba(255,255,255,0.08)]"
                    : "w-1.5 bg-white/45 group-hover:bg-white/70",
                ].join(" ")}
                aria-label={`Show slide ${j + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Chevrons (on hover) */}
      {frames.length > 1 && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            type="button"
            onClick={prev}
            className="pointer-events-auto inline-flex items-center justify-center size-8 rounded-full bg-black/35 border border-white/10 hover:bg-black/55 text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="pointer-events-auto inline-flex items-center justify-center size-8 rounded-full bg-black/35 border border-white/10 hover:bg-black/55 text-white"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Soft edge mask */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      />
    </div>
  );
}

/* ===== INTERACTIVE CHIPS ===== */
function Pill({ text, dotColor = "bg-blue-400/80" }) {
  return (
    <motion.span
      whileHover={{ y: -2, boxShadow: "0 10px 24px rgba(0,0,0,0.35)" }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                 border border-white/10 bg-white/5 text-gray-200 text-sm
                 transition-colors hover:bg-white/10"
    >
      <span className={`inline-block size-1.5 rounded-full ${dotColor}`} />
      {text}
    </motion.span>
  );
}

function MetaBadge({ text }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                 text-xs border border-white/10 bg-white/5 text-gray-200
                 hover:bg-white/10 transition"
    >
      <span className="inline-block size-1.5 rounded-full bg-blue-400/80" />
      {text}
    </span>
  );
}

export default function ProjectShowcase({ project, index }) {
  const isReversed = index % 2 === 1;
  const {
    title,
    description,
    images = [],
    tech = [],
    tools = [],
    year,
    links = {},
    slideshowSec,
    slideshowMax,
    autoplay,
    meta = [],
    codeServer, // legacy support
  } = project;

  // Resolve code links (client + server)
  const clientCode = links.client || links.code || null;
  const serverCode = links.server || codeServer || null;
  const hasBoth = !!clientCode && !!serverCode;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="grid gap-10 lg:grid-cols-12 items-center"
    >
      {/* Media */}
      <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : ""}`}>
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-30
                       bg-[radial-gradient(600px_300px_at_50%_0%,rgba(59,130,246,0.18),transparent_70%)]"
          />
          <HoverCarousel
            images={images}
            title={title}
            secsPerImage={slideshowSec ?? DEFAULT_SECS_PER_IMAGE}
            maxFrames={slideshowMax ?? DEFAULT_MAX_FRAMES}
            autoplay={autoplay ?? false}
            fit="contain"
            position="center" // ← or "top" if you want to bias the top
          />
        </div>
      </div>

      {/* Content */}
      <div className={`lg:col-span-5 ${isReversed ? "lg:order-1" : ""}`}>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs tracking-wide bg-white/5 text-gray-300 border border-white/10">
              {year}
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <h3 className="text-[clamp(3.75rem,3.6vw,2.75rem)] leading-tight font-light text-white tracking-tight">
            {title}
          </h3>

          {meta.length > 0 && (
            <ul className="flex flex-wrap gap-2.5">
              {meta.map((m) => (
                <li key={`meta-${m}`}>
                  <MetaBadge text={m} />
                </li>
              ))}
            </ul>
          )}

          <p className="text-gray-300/90 leading-relaxed">{description}</p>

          {/* Tech */}
          {tech.length > 0 && (
            <div className="pt-1">
              <div className="mb-2 text-xs uppercase tracking-wide text-gray-400">
                Tech
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {tech.map((t) => (
                  <li key={`tech-${t}`}>
                    <Pill text={t} dotColor="bg-blue-400/80" />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tools */}
          {tools.length > 0 && (
            <div>
              <div className="mt-3 mb-2 h-px bg-white/10" />
              <div className="mb-2 text-xs uppercase tracking-wide text-gray-400">
                Tools
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {tools.map((t) => (
                  <li key={`tool-${t}`}>
                    <Pill text={t} dotColor="bg-cyan-400/80" />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTAs */}
          <div className="pt-2 flex items-center gap-3">
            {/* Live */}
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

            {/* Code – single or menu */}
            {!hasBoth && clientCode && (
              <a
                href={clientCode}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg
                           border border-white/15 bg-white/5 text-white
                           hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4 opacity-80 group-hover:opacity-100" />
                Code
              </a>
            )}

            {hasBoth && (
              <div
                className="relative"
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                             border border-white/15 bg-white/5 text-white
                             hover:bg-white/10 transition-all duration-300"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                >
                  <Github className="w-4 h-4" />
                  Code
                  <ChevronDown className="w-4 h-4 opacity-80" />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 top-[calc(100%+8px)] z-10 w-44 rounded-xl
                                 border border-white/10 bg-black/70 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)] p-2"
                      role="menu"
                    >
                      <a
                        href={clientCode}
                        target="_blank"
                        rel="noreferrer"
                        role="menuitem"
                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-gray-200 hover:bg-white/10"
                      >
                        <Github className="w-4 h-4" />
                        Client repo
                      </a>
                      <div className="h-px my-1 bg-white/10" />
                      <a
                        href={serverCode}
                        target="_blank"
                        rel="noreferrer"
                        role="menuitem"
                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-gray-200 hover:bg-white/10"
                      >
                        <Server className="w-4 h-4" />
                        Server repo
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
