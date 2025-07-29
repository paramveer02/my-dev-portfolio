import { useEffect, useState } from "react";
import IntroScreen from "./components/IntroScreen";
import Hero from "./components/Hero";

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
      <Hero
        isVisible={isVisible}
        scrollY={scrollY}
        scrollToSection={scrollToSection}
      />
    </div>
  );
}

export default App;
