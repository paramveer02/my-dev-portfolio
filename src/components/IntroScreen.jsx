import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroScreen({
  onComplete,
  stepMs = 300, // per greeting
  lastHold = 1000, // hold on LAST greeting
  welcomeHold = 2000, // how long "Welcome" stays
}) {
  const greetings = [
    "Namaste",
    "स्वागत है",
    "Olá",
    "привет",
    "Bonjour",
    "こんにちは",
    "Hallo!",
  ];
  const [phase, setPhase] = useState("greetings"); // 'greetings' | 'welcome' | 'leaving'
  const [i, setI] = useState(0);
  const timerRef = useRef(null);
  const skippingRef = useRef(false);

  // --- scroll helper
  const scrollToHero = () => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const gsap = window?.gsap;
    if (gsap?.to) {
      try {
        gsap.to(window, {
          duration: 0.6,
          scrollTo: { y: hero, offsetY: 80 },
          ease: "power2.out",
        });
        return;
      } catch {}
    }
    hero.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // --- fully finish intro (used by auto flow)
  const finishWithFade = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("leaving"); // triggers overlay fade
    // after fade completes, unmount + scroll
    setTimeout(() => {
      onComplete?.();
      // wait for DOM commit
      requestAnimationFrame(scrollToHero);
    }, 700);
  };

  // --- instant skip (no fade)
  const skipNow = () => {
    if (skippingRef.current) return;
    skippingRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    onComplete?.(); // unmount immediately
    requestAnimationFrame(() => {
      // scroll on next frame for reliability
      requestAnimationFrame(scrollToHero);
    });
  };

  // --- greetings/welcome flow
  useEffect(() => {
    if (phase === "greetings") {
      if (i < greetings.length - 1) {
        timerRef.current = setTimeout(() => setI((v) => v + 1), stepMs);
      } else {
        timerRef.current = setTimeout(() => setPhase("welcome"), lastHold);
      }
    } else if (phase === "welcome") {
      timerRef.current = setTimeout(finishWithFade, welcomeHold);
    }
    return () => clearTimeout(timerRef.current);
  }, [phase, i, stepMs, lastHold, welcomeHold]);

  const fade = {
    initial: { opacity: 0, y: 8, filter: "blur(3px)" },
    enter: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.28, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -6,
      filter: "blur(3px)",
      transition: { duration: 0.22, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden"
      initial={{ opacity: 1, scale: 1 }}
      animate={
        phase === "leaving"
          ? { opacity: 0, scale: 0.993 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-live="polite"
    >
      {/* Background — cool palette */}
      <div
        className="absolute inset-0 animate-bg-pan"
        style={{
          background:
            "radial-gradient(900px 450px at 50% -10%, rgba(251,146,60,0.18), transparent 60%)," +
            "radial-gradient(800px 460px at 80% 20%, rgba(59,130,246,0.20), transparent 60%)," +
            "linear-gradient(180deg, rgba(12,12,12,1) 0%, rgba(8,8,8,1) 100%)",
          backgroundSize: "200% 200%",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="min-h-[92px]">
          <AnimatePresence mode="wait">
            {phase === "greetings" && (
              <motion.h1
                key={`greet-${i}`}
                variants={fade}
                initial="initial"
                animate="enter"
                exit="exit"
                className="text-[clamp(4rem,7vw,4.5rem)] font-light tracking-wide text-white"
              >
                {greetings[i]}
              </motion.h1>
            )}
            {phase === "welcome" && (
              <motion.div
                key="welcome"
                variants={fade}
                initial="initial"
                animate="enter"
                exit="exit"
                className="flex flex-col items-center"
              >
                <h1
                  className="text-[clamp(5.1rem,6vw,5.75rem)] font-light
                             bg-gradient-to-r from-white via-white to-white/80
                             bg-clip-text text-transparent tracking-tight"
                >
                  Welcome to my portfolio
                </h1>
                <div className="mt-4 h-px w-32 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <p className="mt-4 text-[clamp(1rem,2.6vw,1.25rem)] text-gray-200/90"></p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress — greetings only */}
        {phase === "greetings" && (
          <div className="mt-3 flex items-center gap-2">
            {Array.from({ length: greetings.length }).map((_, idx) => {
              const active = idx === i;
              const filled = idx < i;
              return (
                <motion.span
                  key={idx}
                  animate={{
                    width: active ? 24 : filled ? 14 : 8,
                    opacity: active || filled ? 1 : 0.55,
                    scale: active ? 1.05 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className={`h-1.5 rounded-full ${
                    active
                      ? "bg-white shadow-[0_0_0_3px_rgba(255,255,255,0.08)]"
                      : filled
                      ? "bg-white/80"
                      : "bg-white/30"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Bloom veil during fade */}
      {phase === "leaving" && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.16, 0] }}
          transition={{ duration: 0.7, ease: "easeInOut", times: [0, 0.35, 1] }}
          style={{
            background:
              "radial-gradient(60vmax 60vmax at 50% 50%, rgba(255,255,255,0.25), transparent 70%)",
            mixBlendMode: "screen",
            filter: "blur(10px)",
          }}
        />
      )}

      {/* Skip — instant close */}
      {/* {phase !== "leaving" && (
        <button
          type="button"
          onClick={skipNow}
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8 inline-flex items-center gap-2
                     rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-gray-200
                     hover:bg-white/10 hover:text-white transition-colors"
        >
          Skip →
        </button>
      )} */}
    </motion.div>
  );
}
