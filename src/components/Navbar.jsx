import Button from "./ui/Button";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react"; // icons

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
            <LeipzigClock withSeconds={true} />
          </button>

          {/* Desktop Nav */}
          <div className="relative hidden sm:block">
            <div className="flex">
              {ITEMS.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`basis-24 text-sm mx-1 px-3 py-1.5 rounded-lg transition-colors cursor-pointer
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
            {showIndicator && (
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
            )}
          </div>

          {/* Desktop CTA */}
          <Button
            onClick={() => scrollToSection("hire")}
            className="hidden sm:inline-flex text-sm px-3 py-1.5 rounded-lg
                       border border-white/15 bg-white/5 text-white
                       hover:bg-gradient-to-br hover:from-amber-400/15 hover:to-rose-400/15
                       transition-colors cursor-pointer"
          >
            Let’s talk
          </Button>

          {/* Mobile Hamburger */}
          <button
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-lg border border-white/15 bg-white/5 text-white cursor-pointer"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-64 bg-black/90 backdrop-blur-md border-l border-white/10 p-4">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-200 text-sm">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg border border-white/15 bg-white/5 text-white cursor-pointer"
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
                  className={`text-sm px-3 py-2 rounded-lg text-left cursor-pointer ${
                    activeSection === item.id
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
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
                className="mt-2 text-sm px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:cursor-pointer"
              >
                Let’s talk
              </Button>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
