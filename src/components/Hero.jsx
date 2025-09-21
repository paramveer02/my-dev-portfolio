import { ArrowDown } from "lucide-react";
import Button from "./ui/Button";
import { motion } from "framer-motion";

export default function Hero({ isVisible, scrollY, scrollToSection }) {
  // Smoother, more subtle parallax with dampening
  const parallaxY = Math.min(scrollY * 0.08, 40);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] pt-[84px] md:pt-[96px] flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Light ambient scrim */}
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

      {/* Parallax wrapper with smoother motion */}
      <motion.div
        className="relative z-10 w-full"
        style={{
          transform: `translateY(${parallaxY}px)`,
          willChange: "transform",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 32, scale: 0.96 }
          }
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1,
          }}
          className="text-center space-y-8"
        >
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="font-light tracking-tight leading-[0.85]">
              <motion.span
                className="block text-[clamp(2.5rem,9vw,10.5rem)]"
                initial={{ y: 20, opacity: 0 }}
                animate={
                  isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                PARAMVIR
              </motion.span>
              <motion.span
                className="block text-[clamp(2.5rem,9vw,10.5rem)]
                           bg-gradient-to-r from-amber-300 via-orange-200 to-rose-300
                           bg-clip-text text-transparent"
                initial={{ y: 20, opacity: 0 }}
                animate={
                  isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                MARWAH
              </motion.span>
            </h1>

            <motion.p
              className="text-[clamp(1.1rem,2.4vw,1.875rem)] text-gray-300/90 font-light max-w-4xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Full-stack developer crafting fast, elegant web apps.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
            }
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              onClick={() => scrollToSection("work")}
              className="group inline-flex items-center justify-center w-36 h-36 rounded-full
                         border border-white/20 bg-white/5 backdrop-blur-sm text-white
                         text-base md:text-lg font-medium transition-all duration-300
                         hover:scale-105 hover:bg-gradient-to-br hover:from-amber-400/20 hover:to-rose-400/20
                         hover:shadow-[0_0_30px_rgba(251,146,60,0.6),0_0_60px_rgba(251,146,60,0.4)]
                         animate-pulse cursor-pointer"
            >
              <span className="pointer-events-none group-hover:font-bold transition-all duration-200">
                View Work
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400/70"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="flex items-center gap-2 text-sm">
          <ArrowDown aria-hidden className="h-5 w-5 animate-bounce" />
          <span className="sr-only">Scroll</span>
        </div>
      </motion.div>
    </section>
  );
}
