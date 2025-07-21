import { useState } from "react";
import IntroScreen from "./components/IntroScreen";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => setShowIntro(false);

  return <IntroScreen onComplete={handleIntroComplete} />;
}

export default App;
