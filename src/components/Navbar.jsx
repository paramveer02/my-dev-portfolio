import Button from "./ui/Button";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function Navbar({ activeSection, scrollToSection }) {
  const [progress, setProgress] = useState(0);

  // Keep nav items in one place (fused Hire/Contact)
  const ITEMS = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "work", label: "Work" },
      { id: "skills", label: "Skills" },
    ],
    []
  );

  const activeIndex = Math.max(
    0,
    ITEMS.findIndex((i) => i.id === activeSection)
  );
  const indicatorWidth = `${100 / ITEMS.length}%`;
  const indicatorX = `translateX(${activeIndex * 100}%)`;

  // Top scroll progress
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full">
      {/* scroll progress */}
      <div
        className="h-[2px] bg-gradient-to-r from-amber-400 via-rose-400 to-fuchsia-400 transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="container mx-auto"
      >
        {/* Glassy bar */}
        <div
          className="mx-4 mt-3 flex h-14 items-center justify-between rounded-2xl
                        border border-white/10 bg-black/30 backdrop-blur-md px-4
                        shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
        >
          {/* Brand */}
          <button
            onClick={() => scrollToSection("hero")}
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
          >
            <span
              className="inline-flex size-7 items-center justify-center rounded-lg
                             bg-white/5 border border-white/10 text-white/90 text-xs font-medium"
            >
              PM
            </span>
            <span className="hidden sm:inline">My Portfolio</span>
          </button>

          {/* Nav */}
          <div className="relative hidden sm:block">
            <div className="flex">
              {/* equal widths for smooth indicator */}
              {ITEMS.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`basis-24 text-sm mx-1 px-3 py-1.5 rounded-lg transition-colors
                    ${
                      activeSection === item.id
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Active indicator */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1 top-[calc(100%-6px)]
                         h-[2px] rounded-full bg-gradient-to-r from-amber-400/80 to-rose-400/80
                         transition-transform duration-300 ease-out"
              style={{
                width: `calc(${indicatorWidth} - 0.5rem)`,
                transform: indicatorX,
              }}
            />
          </div>

          {/* CTA (soft) */}
          <Button
            onClick={() => scrollToSection("hire")}
            className="hidden sm:inline-flex text-sm px-3 py-1.5 rounded-lg
                       border border-white/15 bg-white/5 text-white
                       hover:bg-gradient-to-br hover:from-amber-400/15 hover:to-rose-400/15
                       transition-colors"
          >
            Let’s talk
          </Button>

          {/* Mobile: minimal “Hire” CTA */}
          <Button
            onClick={() => scrollToSection("hire")}
            className="sm:hidden text-sm px-2.5 py-1 rounded-lg
                       border border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            Hire
          </Button>
        </div>
      </motion.div>
    </nav>
  );
}
