import { useEffect, useState } from "react";
import IntroScreen from "./components/IntroScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Skills from "./components/Skills";
import HireContact from "./components/HireContact";
import BackgroundFX from "./components/BackgroundFX";
import CursorSpotlight from "./components/CursorSpotlight";
import { gsap } from "gsap";
import SmoothScroll from "./components/SmoothScroll";

import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollToPlugin);

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [portfolioReady, setPortfolioReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Keep this in the same order your sections appear
      const sections = ["hero", "work", "about", "skills", "hire"];
      const currentSection = sections.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) setActiveSection(currentSection);
    };

    if (!showIntro) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      // Smooth entrance
      const t = setTimeout(() => {
        setPortfolioReady(true);
        setIsVisible(true);
      }, 100);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(t);
      };
    }
  }, [showIntro]);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    // Prefer Lenis for silky programmatic scrolling
    if (window.lenis) {
      window.lenis.scrollTo(el, { offset: -100 });
      return;
    }

    // Fallback to GSAP if Lenis isn't ready
    gsap.to(window, {
      duration: 0.6,
      scrollTo: { y: el, offsetY: 80 },
      ease: "power2.inOut",
    });
  };

  const handleIntroComplete = () => setShowIntro(false);

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <div
      className={`min-h-screen text-white overflow-x-hidden portfolio-entrance ${
        portfolioReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Cinematic background (fixed layers) */}
      <BackgroundFX />
      <CursorSpotlight />
      <SmoothScroll />

      {/* Nav */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Sections */}
      <Hero
        isVisible={isVisible}
        scrollY={scrollY}
        scrollToSection={scrollToSection}
      />
      <About />
      <Work />
      <Skills />
      <HireContact />
      <Footer />
    </div>
  );
}

export default App;
