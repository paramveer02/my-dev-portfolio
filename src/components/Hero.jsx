import { ArrowDown } from "lucide-react";
import Button from "./ui/Button";
import { motion } from "framer-motion";

export default function Hero({ isVisible, scrollY, scrollToSection }) {
  // gentle parallax; capped so it never drifts too far
  const parallaxY = Math.min(scrollY * 0.12, 64);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] pt-[84px] md:pt-[96px] flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Light ambient scrim so BackgroundFX shines through but text stays readable */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            "radial-gradient(60% 50% at 50% 42%, black 60%, transparent 100%)",
          maskImage:
            "radial-gradient(60% 50% at 50% 42%, black 60%, transparent 100%)",
          background:
            "radial-gradient(1200px 600px at 50% -5%, rgba(251,146,60,0.22), transparent 70%)",
        }}
      />

      {/* Parallax wrapper */}
      <div
        className="relative z-10 w-full will-change-transform"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 24, scale: 0.98 }
          }
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h1 className="font-light tracking-tight leading-[0.85]">
              <span className="block text-[clamp(2.5rem,9vw,10.5rem)]">
                PARAMVEER
              </span>
              <span
                className="block text-[clamp(2.5rem,9vw,10.5rem)]
                           bg-gradient-to-r from-amber-300 via-orange-200 to-rose-300
                           bg-clip-text text-transparent"
              >
                MARWAH
              </span>
            </h1>

            <p className="text-[clamp(1.1rem,2.4vw,1.875rem)] text-gray-300/90 font-light max-w-4xl mx-auto">
              Full-stack developer crafting fast, elegant web apps.
            </p>
          </div>

          <Button
            onClick={() => scrollToSection("work")}
            className="group inline-flex items-center justify-center w-36 h-36 rounded-full
                       border border-white/20 bg-white/5 backdrop-blur-sm text-white
                       text-base md:text-lg font-medium transition-transform duration-100
                       hover:scale-100 hover:bg-gradient-to-br hover:from-amber-400/20 hover:to-rose-400/20
             hover:shadow-[0_0_20px_rgba(251,146,60,0.5),0_0_40px_rgba(251,146,60,0.4)]
             animate-pulse cursor-pointer"
          >
            <span className="pointer-events-none group-hover:font-bold transition-all duration-200 ">
              View Work
            </span>
          </Button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400/70">
        <div className="flex items-center gap-2 text-sm">
          <ArrowDown aria-hidden className="h-5 w-5 animate-bounce" />
          <span className="sr-only">Scroll</span>
        </div>
      </div>
    </section>
  );
}
