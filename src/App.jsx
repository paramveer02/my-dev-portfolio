import { useEffect, useState, useRef } from "react";
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
  const sectionsRef = useRef(new Map());
  const lastActiveRef = useRef("hero");

  // Improved scroll handler with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);

          // Improved section detection with hysteresis
          const sections = ["hero", "about", "work", "skills", "hire"];
          const threshold = 150; // pixels from top
          const hysteresis = 50; // prevent rapid switching

          let newActiveSection = lastActiveRef.current;

          for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const el = document.getElementById(section);
            if (!el) continue;

            const rect = el.getBoundingClientRect();
            const isInView = rect.top <= threshold && rect.bottom >= threshold;

            if (isInView) {
              // Add hysteresis to prevent rapid switching
              if (section !== lastActiveRef.current) {
                const timeSinceLastChange =
                  Date.now() - (lastActiveRef.lastChangeTime || 0);
                if (timeSinceLastChange > 100) {
                  // 100ms minimum between changes
                  newActiveSection = section;
                  lastActiveRef.lastChangeTime = Date.now();
                }
              } else {
                newActiveSection = section;
              }
              break;
            }
          }

          if (newActiveSection !== lastActiveRef.current) {
            lastActiveRef.current = newActiveSection;
            setActiveSection(newActiveSection);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    if (!showIntro) {
      window.addEventListener("scroll", handleScroll, { passive: true });

      // Initialize portfolio with staggered animations
      const timer = setTimeout(() => {
        setPortfolioReady(true);
        setTimeout(() => setIsVisible(true), 100);
      }, 200);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(timer);
      };
    }
  }, [showIntro]);

  // Improved scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // Use Lenis if available (preferred)
    if (window.lenis) {
      window.lenis.scrollTo(element, {
        offset: -100,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      return;
    }

    // Fallback to GSAP
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: element, offsetY: 100 },
      ease: "power2.out",
    });
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <div
      className={`min-h-screen text-white overflow-x-hidden transition-all duration-700 ease-out ${
        portfolioReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Background layers */}
      <BackgroundFX />
      <CursorSpotlight />
      <SmoothScroll />

      {/* Navigation */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Main content */}
      <main>
        <Hero
          isVisible={isVisible}
          scrollY={scrollY}
          scrollToSection={scrollToSection}
        />
        <About />
        <Work />
        <Skills />
        <HireContact />
      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

export default App;
