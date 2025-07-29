import { useEffect, useState } from "react";
import IntroScreen from "./components/IntroScreen";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

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
    console.log("clicked");
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
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
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/40 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      </div>

      {/* Navigation */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      <Hero
        isVisible={isVisible}
        scrollY={scrollY}
        scrollToSection={scrollToSection}
      />
    </div>
  );
}

export default App;
