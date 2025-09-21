// components/HireContact.jsx
import { motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  Award,
  GraduationCap,
  FileText,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ---------------- Reusable Gallery Card ---------------- */
function GalleryCard({
  icon: Icon,
  title,
  subtitle,
  images = [],
  actions = [], // [{label, href, download?:bool}]
}) {
  const [hovered, setHovered] = useState(false);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!hovered || images.length < 2) return;
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, 1800);
    return () => clearInterval(timerRef.current);
  }, [hovered, images.length]);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative surface p-5 surface-hover overflow-hidden"
    >
      {/* Top border glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px h-px rounded-t-2xl bg-gradient-to-r from-blue-400/35 via-cyan-400/25 to-blue-400/35"
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-white text-lg font-medium">{title}</h3>
          {subtitle && (
            <p className="text-[13px] text-gray-300/80 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Image stack / carousel */}
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-white/5">
        {/* When hovered, we crossfade through images */}
        {images.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: i === 0 ? 1 : 0 }}
            animate={{
              opacity: hovered ? (i === idx ? 1 : 0) : i === 0 ? 1 : 0,
            }}
            transition={{ duration: 0.45 }}
            draggable={false}
          />
        ))}

        {/* subtle magnify on hover */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.35 }}
        />
        {/* gradient scrim for button readability */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        {actions.map((a) => (
          <a
            key={a.label}
            href={a.href}
            {...(a.newTab ? { target: "_blank", rel: "noreferrer" } : {})}
            {...(a.download ? { download: true } : {})}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-gray-100 text-[14px] hover:bg-white/10 transition"
          >
            {a.icon === "download" ? (
              <Download className="w-4 h-4" />
            ) : (
              <ExternalLink className="w-4 h-4" />
            )}
            {a.label}
          </a>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- Main Section ---------------- */
export default function HireContact() {
  // PDF links (keep your existing names/paths)
  const resumeUrl = "/docs/Paramvir_Resume_JavaScript_Fullstack.pdf";
  const resumeUrlDe = "/docs/DE_Paramvir_Resume.pdf";
  const degreesListUrl = "/docs/degrees-2025.pdf";
  const certificatesListUrl = "/docs/certificates-2025.pdf";
  const lettersListUrl = "/docs/Recommendation-2025.pdf";
  const completeApplicationUrl = "/docs/Application-2025.pdf";

  // Images under: /public/hire-images/**

  const certsImages = [
    "/hire-images/certificatesAndRecommendations/wbs.png",
    "/hire-images/certificatesAndRecommendations/udemy-node.png",
    "/hire-images/certificatesAndRecommendations/udemy-ai.jpg",
    "/hire-images/certificatesAndRecommendations/udemy-javascript.png",
    "/hire-images/certificatesAndRecommendations/carus-digital.png",
    "/hire-images/certificatesAndRecommendations/wirbauen.png",
    "/hire-images/certificatesAndRecommendations/dmns.png",
    "/hire-images/certificatesAndRecommendations/python.png",
    "/hire-images/certificatesAndRecommendations/testdaf.png",
  ];

  const degreesImages = [
    "/hire-images/degrees/Masters.png",
    "/hire-images/degrees/Bachelors.png",
  ];

  const cvImages = [
    "/hire-images/resume/cv-en-1.png",
    "/hire-images/resume/cv-en-2.png",
    "/hire-images/resume/cv-de-1.png",
    "/hire-images/resume/cv-de-2.png",
  ];

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
            Recently graduated from a full-time coding bootcamp. I focus on
            shipping reliable features, keeping the codebase clean, and tying
            work to clear business outcomes.
          </p>
        </div>

        {/* Availability ribbon (kept) */}
        <div className="relative mx-auto max-w-3xl mb-8">
          <div className="absolute inset-0 -z-10 rounded-2xl blur-2xl bg-gradient-to-r from-blue-500/15 via-cyan-400/12 to-blue-500/15" />
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm px-3 py-2 md:px-4 md:py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              <span className="chip chip--accent inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-300/25 bg-emerald-400/10 text-emerald-200 text-sm md:text-[0.95rem]">
                <span className="relative inline-flex items-center justify-center">
                  <span className="absolute inline-block size-2.5 rounded-full bg-emerald-400/35 animate-ping" />
                  <span className="relative inline-block size-2 rounded-full bg-emerald-400" />
                </span>
                Actively seeking · Full-time
              </span>
              <span className="chip chip--accent inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/12 bg-white/5 text-gray-200 text-sm md:text-[0.95rem]">
                Backend · Full-Stack
              </span>
              <span className="chip chip--accent inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/12 bg-white/5 text-gray-200 text-sm md:text-[0.95rem]">
                Germany (CET) · Remote-friendly
              </span>
            </div>
            <span className="availability-sheen" />
          </div>
        </div>

        {/* 3 Gallery Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <GalleryCard
            icon={Award}
            title="Certifications & Recommendations"
            subtitle="Selected highlights from 2023–2025"
            images={certsImages}
            actions={[
              {
                label: "View Certificates (PDF)",
                href: certificatesListUrl,
                newTab: true,
              },
              {
                label: "View Recommendation Letters",
                href: lettersListUrl,
                newTab: true,
              },
              {
                label: "Download Certificates",
                href: certificatesListUrl,
                download: true,
                icon: "download",
              },
            ]}
          />

          <GalleryCard
            icon={GraduationCap}
            title="Degrees"
            subtitle="Masters & Bachelors"
            images={degreesImages}
            actions={[
              {
                label: "View Degrees (PDF)",
                href: degreesListUrl,
                newTab: true,
              },
              {
                label: "Download Degrees",
                href: degreesListUrl,
                download: true,
                icon: "download",
              },
            ]}
          />

          <GalleryCard
            icon={FileText}
            title="CV / Résumé"
            subtitle="English / Deutsch"
            images={cvImages}
            actions={[
              {
                label: "View CV (English)",
                href: resumeUrl,
                newTab: true,
              },
              {
                label: "Download EN",
                href: "/docs/Paramvir_Resume_JavaScript_Fullstack.pdf",
                download: true,
                icon: "download",
              },
              {
                label: "View CV (Deutsch)",
                href: resumeUrlDe,
                newTab: true,
              },
              {
                label: "Download DE",
                href: "/docs/DE_Paramvir_Resume.pdf",
                download: true,
                icon: "download",
              },
            ]}
          />
        </div>

        {/* Complete Application download */}
        <div className="mt-6 flex justify-center">
          <a
            href={completeApplicationUrl}
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg
            border border-white/15 bg-white/5 text-gray-100 text-[15px]
            hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          >
            <Download className="w-4 h-4" />
            Download Complete Application (merged PDF)
          </a>
        </div>
      </motion.div>

      {/* Sheen animation */}
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
