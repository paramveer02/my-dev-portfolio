import { ArrowDown } from "lucide-react";
import Button from "./ui/Button";
import "../App.css";
import { motion } from "framer-motion";

export default function Hero({ isVisible, scrollY, scrollToSection }) {
  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-4 "
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`text-center space-y-8 transform transition-all duration-2000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-light tracking-tight leading-none">
              <div className="block">PARAMVEER</div>
              <div className="block text-gray-300">MARWAH</div>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 font-light max-w-4xl mx-auto">
              Full Stack Developer crafting digital experiences
            </p>
          </div>
          <Button
            onClick={() => scrollToSection("work")}
            className="w-32 h-32 rounded-full bg-cyan-900 hover:bg-gray-900 text-white border-4 border-white text-lg font-medium transform hover:scale-105 transition-all duration-500 shadow-2xl"
          >
            View Work
          </Button>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-400" />
        </div>
      </section>
    </>
  );
}
