import { motion } from "framer-motion";
import { Layers, Award, Briefcase, MapPin } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function About() {
  return (
    <section id="about" className="section-container">
      {/* Header */}
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
        className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12 items-start"
      >
        {/* Copy — wider, consistent width, smaller gutter */}
        <div className="lg:col-span-7 lg:pr-4 xl:pr-6">
          <div className="space-y-5 text-[clamp(1rem,1.05vw,1.06rem)] text-gray-300/90 leading-relaxed max-w-4xl">
            <p className="text-justify">
              I’m{" "}
              <span className="text-white/90 font-medium">
                Paramveer Marwah
              </span>
              , a backend-leaning full-stack developer who turns fuzzy
              requirements into clear APIs and small, safe releases. My recent
              focus is the{" "}
              <span className="text-white/90 font-medium">MERN</span> stack,
              grounded by prior work in{" "}
              <span className="text-white/90 font-medium">Python/Django</span>{" "}
              and <span className="text-white/90 font-medium">Java/Spring</span>
              . In production settings, I’ve shipped a{" "}
              <span className="text-white/90 font-medium">
                carbon-emissions module
              </span>
              that made calculations faster and more precise, and an{" "}
              <span className="text-white/90 font-medium">
                HR compensation (gross↔net) feature
              </span>
              that simplified payroll steps and reduced manual work. I care
              about readable, DRY code, focused tests where they matter, and
              brief docs that let teams move quicker.
            </p>

            <p className="text-justify">
              I work best in teams—pairing on tricky bits, keeping reviews calm
              and constructive, and maintaining tidy tickets so progress stays
              steady. In my current bootcamp capstone I collaborate end-to-end,
              own features, and help keep standards consistent. I stay curious
              about new tools and practical AI, and adopt them when they clearly
              lift quality or speed. Off the keyboard I reset with hiking,
              football, travel, and chess.
            </p>
          </div>

          {/* Compact stats — smaller cards, 4-up */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-[48rem] md:max-w-[52rem]">
            <StatCard icon={Layers} primary="5+" secondary="Projects" />
            <StatCard icon={Award} primary="2+" secondary="Years Experience" />
            <StatCard
              icon={Briefcase}
              primary="MERN & Django"
              secondary="Current focus"
              isTextPrimary
            />
            <StatCard
              icon={MapPin}
              primary="Germany (CET)"
              secondary="Remote-friendly"
              isTextPrimary
            />
          </div>
        </div>

        {/* Portrait (as you have it, slightly nudged up & right) */}
        <div className="lg:col-span-5 lg:self-start lg:justify-self-end">
          <div className="relative mx-auto lg:mx-0 w-96 h-96 md:w-[28rem] md:h-[28rem] lg:translate-x-3 lg:-translate-y-3 xl:translate-x-5 xl:-translate-y-4">
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                maskImage:
                  "radial-gradient(closest-side, black 75%, transparent 78%)",
                WebkitMaskImage:
                  "radial-gradient(closest-side, black 75%, transparent 78%)",
                background:
                  "radial-gradient(55% 55% at 30% 30%, rgba(0,0,0,0.22), transparent 60%), radial-gradient(55% 55% at 72% 70%, rgba(0,0,0,0.18), transparent 64%)",
                filter: "blur(12px)",
              }}
            />
            <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/8 blur-2xl" />
            <motion.div
              whileHover={{ scale: 1.03, rotate: 0.25 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-br from-blue-500/40 via-cyan-400/30 to-blue-500/40 shadow-[0_12px_40px_rgba(59,130,246,0.18)]"
            >
              <div className="rounded-full overflow-hidden bg-black/60 border border-white/10 w-full h-full">
                <img
                  src="/profile.jpg"
                  alt="Paramveer Marwah portrait"
                  className="w-full h-full object-cover object-[18%_35%] grayscale transition-all duration-500 hover:grayscale-0"
                />
              </div>
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

/* ——— small stat card ——— */
function StatCard({ icon: Icon, primary, secondary, isTextPrimary = false }) {
  return (
    <div className="surface p-4 sm:p-5 surface-hover">
      <div className="flex items-center gap-3 mb-1.5">
        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Icon className="w-4.5 h-4.5 text-blue-400" />
        </div>
        <div
          className={[
            "font-light",
            isTextPrimary
              ? "text-base sm:text-[1.05rem] text-gray-200"
              : "text-3xl text-blue-400",
          ].join(" ")}
        >
          {primary}
        </div>
      </div>
      <div className="text-gray-400 text-sm">{secondary}</div>
    </div>
  );
}
