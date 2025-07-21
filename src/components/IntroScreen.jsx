import { useEffect, useState } from "react";

export default function IntroScreen({ onComplete }) {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [startTransition, setStartTransition] = useState(false);

  const greetings = ["Namaste", "Guten Tag", "Bonjour", "Hallo."];

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentGreeting < greetings.length - 1) {
          setCurrentGreeting(currentGreeting + 1);
        } else if (!showWelcome) {
          setShowWelcome(true);
        } else {
          // Set 3D transition
          setStartTransition(true);
          setTimeout(() => {
            onComplete();
          }, 1500); // Allow time for 3D transition
        }
      },
      showWelcome ? 2000 : currentGreeting === greetings.length - 1 ? 1000 : 400
    );

    return () => clearTimeout(timer);
  }, [currentGreeting, greetings.length, onComplete, showWelcome]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-all duration-1500 ease-out ${
        isVisible && !startTransition ? "opacity-100" : "opacity-0"
      } ${startTransition ? "transform-3d-transition" : ""}`}
      // Welcome Screen Transition
      style={{
        transform: startTransition
          ? "perspective(1000px) rotateX(-15deg) rotateY(5deg) translateZ(-200px) scale(0.9)"
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
        transformStyle: "preserve-3d",
      }}
      // Or : Alternate transformation from Welcome to Landing Page
      //     transform: startTransition
      // ? "scale(0.7) opacity(0)"
      // : "scale(1) opacity(1)",
    >
      {/* Greeting Content */}
      <div className="relative z-10 text-center">
        {!showWelcome ? (
          <div className="relative">
            {greetings.map((greeting, index) => (
              <h1
                key={greeting}
                className={`absolute inset-0 text-3xl md:text-5xl font-light text-white tracking-wide transition-all duration-700 ease-in-out whitespace-nowrap ${
                  index === currentGreeting
                    ? "opacity-100 transform translate-y-0 scale-100"
                    : index < currentGreeting
                    ? "opacity-0 transform -translate-y-6 scale-95"
                    : "opacity-0 transform translate-y-6 scale-95"
                }`}
              >
                {greeting}
              </h1>
            ))}
            {/* Placeholder for consistent height : GENERATED h1*/}
            <h1 className="text-3xl md:text-5xl font-light text-transparent tracking-wide">
              {greetings[0]}
            </h1>
          </div>
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
