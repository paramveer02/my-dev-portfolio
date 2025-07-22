import { useEffect, useState } from "react";
import "../App.css";

export default function IntroScreen({ onComplete }) {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [startTransition, setStartTransition] = useState(false);

  const greetings = ["Namaste", "सअगत हे", "Bonjour", "Hallo."];

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentGreeting < greetings.length - 1) {
          setCurrentGreeting(currentGreeting + 1);
        } else if (!showWelcome) {
          setShowWelcome(true);
        } else {
          // Start 3D transition
          setStartTransition(true);
          setTimeout(() => {
            onComplete();
          }, 1500);
        }
      },
      showWelcome ? 2000 : currentGreeting === greetings.length - 1 ? 900 : 400
    );

    return () => clearTimeout(timer);
  }, [currentGreeting, greetings.length, onComplete, showWelcome]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-all duration-1500 ease-out ${
        isVisible && !startTransition ? "opacity-100" : "opacity-0"
      } ${startTransition ? "transform-3d-transition" : ""}`}
      style={{
        transform: startTransition
          ? "perspective(1000px) rotateX(-15deg) rotateY(5deg) translateZ(-200px) scale(0.9)"
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Greeting or Welcome Section */}
      <div className="relative z-10 text-center">
        {!showWelcome ? (
          <>
            <div className="flex flex-col items-center justify-center min-h-[72px] md:min-h-[96px] relative">
              {greetings.map((greeting, index) => (
                <h1
                  key={greeting}
                  className={`absolute left-1/2 top-0 -translate-x-1/2 w-full text-3xl md:text-5xl font-light text-white tracking-wide transition-all duration-700 ease-in-out ${
                    index === currentGreeting
                      ? "opacity-100 transform translate-y-0 scale-100"
                      : index < currentGreeting
                      ? "opacity-0 transform -translate-y-6 scale-95"
                      : "opacity-0 transform translate-y-6 scale-95"
                  }`}
                  style={{ textAlign: "center" }}
                >
                  {greeting}
                </h1>
              ))}
              {/* Placeholder for consistent height */}
              <h1 className="invisible text-3xl md:text-5xl font-light tracking-wide">
                {greetings[0]}
              </h1>
            </div>
          </>
        ) : (
          <div className="animate-welcome-3d-entrance">
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-wide">
              Welcome to my Portfolio
            </h1>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto animate-pulse-glow"></div>
            <p className="text-lg text-gray-300 mt-6 opacity-80">
              Crafting digital experiences with passion
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
