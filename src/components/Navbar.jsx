import Button from "./ui/Button";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

function LeipzigClock({ withSeconds = false }) {
  const tz = "Europe/Berlin";
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeFmt = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        ...(withSeconds ? { second: "2-digit" } : {}),
        hour12: false,
        timeZone: tz,
        timeZoneName: "short",
      }),
    [tz, withSeconds]
  );

  const dateFmt = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        timeZone: tz,
      }),
    [tz]
  );

  const timeText = timeFmt.format(now);
  const dateText = dateFmt.format(now);

  return (
    <span
      className="hidden sm:inline font-mono text-gray-200/90"
      title={`${dateText}`}
    >
      <span className="tabular-nums">{timeText}</span>
    </span>
  );
}

export default function Navbar({ activeSection, scrollToSection }) {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const ITEMS = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "work", label: "Work" },
      { id: "skills", label: "Skills" },
    ],
    []
  );

  const activeIndex = useMemo(
    () => ITEMS.findIndex((i) => i.id === activeSection),
    [ITEMS, activeSection]
  );

  const showIndicator = activeIndex !== -1;
  const indicatorWidth = showIndicator ? `${100 / ITEMS.length}%` : "0px";
  const indicatorX = showIndicator
    ? `translateX(${activeIndex * 100}%)`
    : "translateX(0)";

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setProgress(pct);

      // Set scrolled state when past hero section (more reliable)
      setIsScrolled(scrollTop > 50);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress - always visible */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-gradient-to-r from-amber-400 via-rose-400 to-fuchsia-400"
        style={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      />

      {/* Main navbar container - always visible */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full">
        <div className="w-full px-4 pt-3">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            <motion.div
              animate={{
                backdropFilter: isScrolled ? "blur(24px)" : "blur(12px)",
                backgroundColor: isScrolled
                  ? "rgba(0, 0, 0, 0.95)"
                  : "rgba(0, 0, 0, 0.6)",
                borderColor: isScrolled
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(255, 255, 255, 0.15)",
                boxShadow: isScrolled
                  ? "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  : "0 8px 32px rgba(0, 0, 0, 0.4)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex h-14 items-center justify-between rounded-2xl
                         border backdrop-blur-md px-4"
            >
              {/* Brand */}
              <button
                onClick={() => scrollToSection("hero")}
                className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-white transition-colors duration-200"
              >
                <span
                  className="inline-flex size-7 items-center justify-center rounded-lg
                                 bg-white/15 border border-white/20 text-white text-xs font-medium
                                 hover:bg-white/25 transition-all duration-200"
                >
                  PM
                </span>
                <LeipzigClock withSeconds={true} />
              </button>

              {/* Desktop Nav */}
              <div className="relative hidden sm:block">
                <div className="flex">
                  {ITEMS.map((item) => (
                    <Button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`basis-24 text-sm mx-1 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer
                        ${
                          activeSection === item.id
                            ? "text-white bg-white/25 shadow-lg border border-white/20"
                            : "text-gray-200 hover:text-white hover:bg-white/15"
                        }`}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
                {showIndicator && (
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute left-1 top-[calc(100%-6px)]
                               h-[2px] rounded-full bg-gradient-to-r from-amber-400/80 to-rose-400/80"
                    style={{
                      width: `calc(${indicatorWidth} - 0.5rem)`,
                    }}
                    animate={{ transform: indicatorX }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>

              {/* Desktop CTA */}
              <Button
                onClick={() => scrollToSection("hire")}
                className="hidden sm:inline-flex text-sm px-3 py-1.5 rounded-lg
                           border border-white/25 bg-white/15 text-white
                           hover:bg-gradient-to-br hover:from-amber-400/25 hover:to-rose-400/25
                           hover:border-white/40 hover:shadow-lg
                           transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Achievements
              </Button>

              {/* Mobile Hamburger */}
              <button
                className="sm:hidden inline-flex items-center justify-center p-2 rounded-lg border border-white/25 bg-white/15 text-white hover:bg-white/25 transition-all duration-200 cursor-pointer"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70]"
        >
          <div
            className="absolute inset-0 bg-black/60 cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-64 bg-black/95 backdrop-blur-md border-l border-white/15 p-4"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-200 text-sm">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg border border-white/20 bg-white/10 text-white cursor-pointer hover:bg-white/15 transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col gap-3">
              {ITEMS.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setOpen(false);
                  }}
                  className={`text-sm px-3 py-2 rounded-lg text-left cursor-pointer transition-all ${
                    activeSection === item.id
                      ? "bg-white/20 text-white border border-white/20"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                onClick={() => {
                  scrollToSection("hire");
                  setOpen(false);
                }}
                className="mt-2 text-sm px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/15 hover:cursor-pointer transition-colors"
              >
                Let's talk
              </Button>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
