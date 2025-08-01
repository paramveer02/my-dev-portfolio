import { useEffect, useState } from "react";
import IntroScreen from "./components/IntroScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

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

      const sections = ["hero", "about", "work", "hire", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) setActiveSection(currentSection);
    };

    if (!showIntro) {
      window.addEventListener("scroll", handleScroll);
      // Smooth entrance animation for portfolio
      setTimeout(() => {
        setPortfolioReady(true);
        setIsVisible(true);
      }, 100);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showIntro]);

  const scrollToSection = (sectionId) => {
    console.log(sectionId);
    const element = document.getElementById(sectionId);
    if (!element) return;

    gsap.to(window, {
      duration: 0.2, // scroll seconds
      scrollTo: {
        y: element,
        offsetY: 80,
      },
      ease: "power2.inOut",
    });
  };

  const handleIntroComplete = () => setShowIntro(false);

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <div
      className={`min-h-screen bg-black text-white overflow-x-hidden transition-all duration-1000 ease-out ${
        portfolioReady
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-8"
      }`}
    >
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-300 via-black to-gray-300"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-gray-100/40 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      </div>

      {/* Navigation */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Hero */}
      <Hero
        isVisible={isVisible}
        scrollY={scrollY}
        scrollToSection={scrollToSection}
      />

      {/* About */}
      <About />

      {/* Work */}
      <Work />
    </div>
  );
}

export default App;
