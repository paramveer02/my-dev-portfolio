import { motion } from "framer-motion";
import {
  Mail,
  Calendar,
  Github,
  Linkedin,
  Send,
  Copy,
  Check,
  FileText,
  Briefcase,
  MapPin,
} from "lucide-react";
import { useState } from "react";

export default function HireContact() {
  const [copied, setCopied] = useState(false);

  // — Customize —
  const email = "paramveermarwahafc@gmail.com";
  const calendly = "https://calendly.com/app/availability/schedules"; // or "#"
  const resumeUrl = "/Paramveer_Marwah_Resume.pdf";
  // ————————

  function handleCopy() {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section id="hire" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container mx-auto max-w-6xl"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-light text-white mb-6">
            Let’s Build Something Great
          </h2>
          <div className="w-24 h-px bg-blue-600 mx-auto" />
          <p className="mt-6 text-gray-300/90 max-w-2xl mx-auto">
            No hard sell. If you’re hiring and want someone who ships clean,
            thoughtful work, I’m happy to share code, discuss scope, or do a
            short intro call.
          </p>
        </div>

        {/* Availability Ribbon (eye-catching, still classy) */}
        <div className="relative mx-auto max-w-3xl mb-10 group">
          {/* soft glow backdrop */}
          <div
            className="absolute inset-0 -z-10 rounded-2xl blur-2xl
                          bg-gradient-to-r from-blue-500/20 via-cyan-400/16 to-blue-500/20"
          />
          {/* glass band */}
          <div
            className="relative rounded-2xl border border-white/10 bg-white/[0.06]
                       backdrop-blur-sm px-3 py-2 md:px-4 md:py-2.5
                       shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          >
            {/* gradient hairlines */}
            <div
              className="pointer-events-none absolute inset-x-0 -top-px h-px rounded-t-2xl
                            bg-gradient-to-r from-blue-400/40 via-cyan-400/30 to-blue-400/40"
            />
            <div
              className="pointer-events-none absolute inset-x-0 -bottom-px h-px rounded-b-2xl
                            bg-gradient-to-r from-blue-400/20 via-cyan-400/15 to-blue-400/20"
            />

            {/* chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {/* Open to work (with pulsing dot) */}
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-emerald-300/25 bg-emerald-400/10
                           text-emerald-200 text-sm md:text-[0.95rem]
                           hover:bg-emerald-400/15 transition"
              >
                <span className="relative inline-flex items-center justify-center">
                  {/* subtle ping halo */}
                  <span className="absolute inline-block size-2.5 rounded-full bg-emerald-400/40 animate-ping" />
                  <span className="relative inline-block size-2 rounded-full bg-emerald-400" />
                </span>
                Open to full-time
              </span>

              {/* Role */}
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-white/12 bg-white/5 text-gray-200 text-sm md:text-[0.95rem]
                           hover:bg-white/10 transition"
              >
                <Briefcase className="w-4 h-4 opacity-80" />
                Backend · Full-Stack
              </span>

              {/* Location / Remote */}
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-white/12 bg-white/5 text-gray-200 text-sm md:text-[0.95rem]
                           hover:bg-white/10 transition"
              >
                <MapPin className="w-4 h-4 opacity-80" />
                Europe/Germany (CET) · Remote-friendly
              </span>
            </div>

            {/* elegant sheen */}
            <span className="availability-sheen" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Email */}
          <motion.div
            whileHover={{ y: -4 }}
            className="surface p-6 surface-hover"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white text-lg font-medium">Email</h3>
            </div>
            <p className="text-gray-300/90 mb-5">
              Quick note works best. I usually reply within 24 hours.
            </p>
            <div className="flex items-center justify-between gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <span className="text-gray-200 truncate">{email}</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-md px-2 py-1 bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <a
              href={`mailto:${email}?subject=Backend%2FFull-Stack%20Opportunity&body=Hi%20Paramveer%2C%0A%0AWe%27re%20hiring%20for%20%5Brole%5D%20and%20thought%20you%27d%20be%20a%20great%20fit.%20Here%27s%20a%20quick%20summary%3A%0A%E2%80%A2%20Team%2FProduct%3A%20%0A%E2%80%A2%20Tech%20Stack%3A%20%0A%E2%80%A2%20Location%2FRemote%3A%20%0A%E2%80%A2%20Timeline%3A%20%0A%0ABest%2C%0A`}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 transition"
            >
              <Send className="w-4 h-4" />
              Write an email
            </a>
          </motion.div>

          {/* Intro call */}
          <motion.div
            whileHover={{ y: -4 }}
            className="surface p-6 surface-hover relative"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 -top-px h-px rounded-t-2xl
                         bg-gradient-to-r from-blue-400/35 via-cyan-400/25 to-blue-400/35"
            />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white text-lg font-medium">
                Optional Intro Call
              </h3>
            </div>
            <p className="text-gray-300/90 mb-5">
              15–20 minutes to align on role, scope, and timelines. Zero
              pressure.
            </p>
            <a
              href={calendly}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg
                         border border-white/15 bg-white/5 text-white hover:bg-white/10 transition"
            >
              Check availability
            </a>
            <p className="text-xs text-gray-500 mt-3">
              No suitable slot? Email me—I'll adjust.
            </p>
          </motion.div>

          {/* Connect / Resume */}
          <motion.div
            whileHover={{ y: -4 }}
            className="surface p-6 surface-hover"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white text-lg font-medium">Connect</h3>
            </div>
            <p className="text-gray-300/90 mb-5">
              Browse code, say hi, or grab the resume:
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/yourhandle"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 transition"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/yourhandle"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 transition"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 transition"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Tailored case study available on request.
            </p>
          </motion.div>
        </div>

        {/* Footer line */}
        <div className="mt-14 text-center text-gray-400 text-sm">
          Prefer a short brief first? Send 2–3 lines—I’ll reply with options and
          timelines.
        </div>
      </motion.div>

      {/* Tiny CSS for the ribbon sheen (kept local to this component) */}
      <style>{`
        @keyframes availability-sheen-move {
          from { transform: translateX(-120%); }
          to   { transform: translateX(120%); }
        }
        .availability-sheen {
          position: absolute;
          inset: 0;
          border-radius: 1rem; /* matches rounded-2xl */
          pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          mix-blend-mode: screen;
          animation: availability-sheen-move 6s linear infinite;
          opacity: .28;
        }
      `}</style>
    </section>
  );
}
