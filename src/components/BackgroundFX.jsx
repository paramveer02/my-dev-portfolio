// components/BackgroundFX.jsx
export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Top-biased animated wash (no bottom radials) */}
      <div
        className="absolute inset-0 animate-bg-pan"
        style={{
          background:
            // blue (top-right)
            "radial-gradient(900px 480px at 82% 12%, rgba(59,130,246,0.24), transparent 62%)," +
            // soft warm tint overhead (very subtle for readability)
            "radial-gradient(1100px 520px at 50% -10%, rgba(251,146,60,0.12), transparent 60%)," +
            // base
            "linear-gradient(180deg, rgba(14,14,14,1) 0%, rgba(12,12,12,1) 38%, rgba(10,10,10,1) 100%)",
          backgroundSize: "200% 200%",
          // hard stop: fade the wash out past mid-screen so nothing pools near About/Work
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 82%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 82%)",
          willChange: "background, mask-image",
        }}
      />

      {/* Orbs — top only (no bottom orb) */}
      <div className="absolute -top-12 left-[12%] w-[30rem] h-[30rem] rounded-full bg-blue-500/14 blur-3xl sm:block hidden" />
      <div className="absolute top-[20%] right-[10%] w-[24rem] h-[24rem] rounded-full bg-blue-300/14 blur-3xl sm:block hidden" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          backgroundPosition: "0 0, 11px 11px",
        }}
      />

      {/* Top beam */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
    </div>
  );
}
