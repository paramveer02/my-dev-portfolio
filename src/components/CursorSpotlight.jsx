import { useEffect } from "react";

export default function CursorSpotlight() {
  useEffect(() => {
    const root = document.documentElement;

    // Smoothed cursor with rAF + lerp
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const onMove = (e) => {
      tx = e.clientX ?? tx;
      ty = e.clientY ?? ty;
    };

    function tick() {
      cx = lerp(cx, tx, 0.12);
      cy = lerp(cy, ty, 0.12);
      root.style.setProperty("--spot-x", `${cx}px`);
      root.style.setProperty("--spot-y", `${cy}px`);
      requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    // initialize center
    onMove({ clientX: cx, clientY: cy });
    tick();

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // z-[40] keeps it ABOVE sections, BELOW the navbar (your navbar is z-50)
  return (
    <div className="pointer-events-none fixed inset-0 z-[40] hidden md:block">
      <div className="spotlight-overlay aurora-spotlight" />
    </div>
  );
}
