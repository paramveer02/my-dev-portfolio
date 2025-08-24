// components/Footer.jsx
import { Mail, Phone, MapPin, ArrowUpRight, ArrowUp } from "lucide-react";

export default function Footer({ scrollToSection }) {
  // ——— customize these ———
  const email = "paramveermarwahafc@gmail.com";
  const phone = "+49 17643835327";
  const location = "Leipzig, Germany";
  const NAV = [
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "hire", label: "Hire" },
  ];
  const OFFSET = 80; // sticky navbar height offset
  // ————————————————

  // Works even if parent forgets to pass scrollToSection
  const goTo = (id) => {
    // Prefer prop if provided
    if (typeof scrollToSection === "function") {
      scrollToSection(id);
      return;
    }
    // Fallback: Lenis or native smooth
    const el = document.getElementById(id);
    if (!el) return;
    if (window.lenis) {
      window.lenis.scrollTo(el, { offset: -OFFSET });
    } else {
      const top = Math.max(
        0,
        el.getBoundingClientRect().top + window.scrollY - OFFSET
      );
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative mt-28">
      {/* top gradient hairline */}
      <div className="h-px w-full bg-gradient-to-r from-amber-400/40 via-rose-400/30 to-fuchsia-400/40" />

      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand / Availability */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/90 text-sm font-medium">
                PM
              </span>
              <div className="text-white/90 text-lg font-medium">
                Paramveer Marwah
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-sm">
              Backend / Full-Stack developer focused on clean architecture,
              performance, and delightful UX.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="chip chip--accent text-xs text-gray-300">
                <span
                  className="chip-dot"
                  style={{ background: "rgb(52 211 153)" }}
                />
                Actively seeking full-time
              </span>
              <span className="chip chip--accent text-xs text-gray-300">
                Roles: Backend · Full-Stack
              </span>
              <span className="chip chip--accent text-xs text-gray-300">
                CET · Remote-friendly
              </span>
            </div>
          </div>

          {/* Quick links (fixed smooth scroll) */}
          {/* Quick links (fixed smooth scroll) */}
          <nav className="space-y-2">
            <div className="text-white/90 font-medium mb-2">Navigate</div>

            {/* one row with controlled gaps */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.id)}
                  className="group inline-flex items-center gap-1.5 text-gray-300 hover:text-white text-sm"
                >
                  <ArrowUpRight
                    className="w-3.5 h-3.5 -translate-y-px opacity-70 group-hover:opacity-100"
                    aria-hidden
                  />
                  <span className="underline decoration-white/0 group-hover:decoration-white/40 underline-offset-2 transition-colors">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          {/* Contact: email, phone, city */}
          <div className="space-y-3">
            <div className="text-white/90 font-medium">Contact</div>

            <a
              href={`mailto:${email}?subject=Backend%2FFull-Stack%20Opportunity`}
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
            >
              <Mail className="w-4 h-4" />
              {email}
            </a>

            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
            >
              <Phone className="w-4 h-4" />
              {phone}
            </a>

            <div className="flex items-center gap-1 text-sm mt-0.5 text-gray-300 hover:text-white cursor-pointer">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="mt-10 flex items-center justify-between gap-4 text-xs text-gray-500">
          <div>© {new Date().getFullYear()} Paramvir Marwah</div>
          <div className="hidden sm:block">
            Built with React · Tailwind · Framer Motion
          </div>
          <button
            type="button"
            onClick={() => goTo("hero")}
            className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            <ArrowUp className="w-4 h-4" /> Top
          </button>
        </div>
      </div>
    </footer>
  );
}
