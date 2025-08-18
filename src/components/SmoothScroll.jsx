// components/SmoothScroll.jsx
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Keep a single global instance so other components can use it.
    const lenis = new Lenis({
      duration: 1.05, // feel
      smoothWheel: true,
      smoothTouch: false,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      lerp: 0.1,
      easing: (t) => 1 - Math.pow(1 - t, 1.8), // snappy but not elastic
    });

    // Expose for programmatic scroll (navbar clicks).
    window.lenis = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return null;
}
