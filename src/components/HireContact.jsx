// components/HireContact.jsx
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  Copy,
  Check,
  FileText,
  Briefcase,
  MapPin,
  Award,
  ExternalLink,
  Archive,
} from "lucide-react";
import { useState } from "react";

export default function HireContact() {
  const [copied, setCopied] = useState(false);

  // — Customize —
  const email = "paramveermarwahafc@gmail.com";
  const resumeUrl = "/Paramveer_Marwah_Resume.pdf";

  // Point these to your pages/files (Drive/Notion/folder routes, etc.)
  const certificatesListUrl = "/certs/";
  const certificatesZipUrl = "/certs/all-certs.zip"; // optional
  const lettersListUrl = "/letters/";
  const lettersZipUrl = "/letters/all-letters.zip"; // optional
  // ————————

  function handleCopy() {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
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
            Open to Full-Time Roles
          </h2>
          <div className="w-24 h-px bg-blue-600 mx-auto" />
          <p className="mt-6 text-gray-300/90 max-w-2xl mx-auto">
            I’m looking to join a team where I can ship reliable features, keep
            the codebase clean and tie my work to clear business goals.
          </p>
        </div>

        {/* Availability ribbon */}
        <div className="relative mx-auto max-w-3xl mb-8">
          <div className="absolute inset-0 -z-10 rounded-2xl blur-2xl bg-gradient-to-r from-blue-500/15 via-cyan-400/12 to-blue-500/15" />
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm px-3 py-2 md:px-4 md:py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-300/25 bg-emerald-400/10 text-emerald-200 text-sm md:text-[0.95rem]">
                <span className="relative inline-flex items-center justify-center">
                  <span className="absolute inline-block size-2.5 rounded-full bg-emerald-400/35 animate-ping" />
                  <span className="relative inline-block size-2 rounded-full bg-emerald-400" />
                </span>
                Actively seeking · Full-time
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/12 bg-white/5 text-gray-200 text-sm md:text-[0.95rem]">
                <Briefcase className="w-4 h-4 opacity-80" />
                Backend · Full-Stack
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/12 bg-white/5 text-gray-200 text-sm md:text-[0.95rem]">
                <MapPin className="w-4 h-4 opacity-80" />
                Germany (CET) · Remote-friendly
              </span>
            </div>
            <span className="availability-sheen" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Email — compact */}
          <motion.div
            whileHover={{ y: -3 }}
            className="surface p-5 surface-hover"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white text-lg font-medium">Email</h3>
            </div>
            <p className="text-gray-300/90 mb-4 text-[15px]">
              Best way to reach me. I usually reply within a day.
            </p>
            <div className="flex items-center justify-between gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <span className="text-gray-200 truncate">{email}</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-md px-2 py-1 bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <a
              href={`mailto:${email}?subject=Full-time%20opportunity%20(Backend%2FFull-Stack)&body=Hi%20Paramveer%2C%0A%0AWe%27d%20like%20to%20connect%20about%20a%20full-time%20role.%20Here%27s%20some%20context%3A%0A•%20Team%2FProduct%3A%20%0A•%20Role%2FLevel%3A%20%0A•%20Tech%20Stack%3A%20%0A•%20Location%2FRemote%3A%20%0A•%20JD%20link%3A%20%0A%0AThanks!`}
              className="mt-3 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 transition text-[15px]"
            >
              <Send className="w-4 h-4" />
              Write an email
            </a>
          </motion.div>

          {/* Achievements & Recommendations — no hover, inline actions (bulletproof) */}
          <motion.div
            whileHover={{ y: -3 }}
            className="surface p-5 surface-hover"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 -top-px h-px rounded-t-2xl bg-gradient-to-r from-blue-400/35 via-cyan-400/25 to-blue-400/35"
            />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white text-lg font-medium">
                Achievements & Recommendations
              </h3>
            </div>

            <div className="grid gap-3">
              {/* Row: Certificates */}
              <div className="flex items-center justify-between gap-3 rounded-lg border border-white/12 bg-white/[0.06] px-3.5 py-2.5">
                <span className="inline-flex items-center gap-2 text-white">
                  <Award className="w-4.5 h-4.5 opacity-90" />
                  Certificates
                </span>
                <span className="flex items-center gap-2">
                  <a
                    href={certificatesListUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/12 bg-white/5 px-2.5 py-1.5 text-sm text-gray-200 hover:bg-white/10 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View
                  </a>
                  {certificatesZipUrl && (
                    <a
                      href={certificatesZipUrl}
                      download
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/12 bg-white/5 px-2.5 py-1.5 text-sm text-gray-200 hover:bg-white/10 transition"
                    >
                      <Archive className="w-3.5 h-3.5" />
                      ZIP
                    </a>
                  )}
                </span>
              </div>

              {/* Row: Recommendation letters */}
              <div className="flex items-center justify-between gap-3 rounded-lg border border-white/12 bg-white/[0.06] px-3.5 py-2.5">
                <span className="inline-flex items-center gap-2 text-white">
                  <FileText className="w-4.5 h-4.5 opacity-90" />
                  Recommendation letters
                </span>
                <span className="flex items-center gap-2">
                  <a
                    href={lettersListUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/12 bg-white/5 px-2.5 py-1.5 text-sm text-gray-200 hover:bg-white/10 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View
                  </a>
                  {lettersZipUrl && (
                    <a
                      href={lettersZipUrl}
                      download
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/12 bg-white/5 px-2.5 py-1.5 text-sm text-gray-200 hover:bg-white/10 transition"
                    >
                      <Archive className="w-3.5 h-3.5" />
                      ZIP
                    </a>
                  )}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Files open in a new tab. PDFs are named clearly; ZIPs are
              optional.
            </p>
          </motion.div>

          {/* Links — compact */}
          <motion.div
            whileHover={{ y: -3 }}
            className="surface p-5 surface-hover"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white text-lg font-medium">Links</h3>
            </div>
            <p className="text-gray-300/90 mb-4 text-[15px]">
              Quick references: code, profile, and a one-page resume.
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="https://github.com/paramveer02"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 transition text-[15px]"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/paramveer-marwah/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 transition text-[15px]"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10 transition text-[15px]"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer line */}
        {/* <div className="mt-10 text-center text-gray-400 text-sm">
          Thanks for considering my profile. If the role aligns, I’d be glad to
          contribute and keep learning.
        </div> */}
      </motion.div>

      {/* Subtle sheen animation */}
      <style>{`
        @keyframes availability-sheen-move {
          from { transform: translateX(-120%); }
          to   { transform: translateX(120%); }
        }
        .availability-sheen {
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
          mix-blend-mode: screen;
          animation: availability-sheen-move 8s linear infinite;
          opacity: .18;
        }
      `}</style>
    </section>
  );
}
