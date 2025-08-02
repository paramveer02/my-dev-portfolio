import Button from "./ui/Button";
import { motion } from "framer-motion";

export default function Navbar({ activeSection, scrollToSection }) {
  return (
    <nav className="fixed top-0 z-50 w-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto flex h-20 items-center justify-between px-4"
      >
        <div className="text-sm text-gray-300 hover:text-white">
          Portfolio by Paramveer
        </div>
        <div className="flex items-center space-x-12 text-sm font-medium">
          <Button
            onClick={() => scrollToSection("work")}
            className={`transition-colors duration-300 ${
              activeSection === "work"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Work
          </Button>
          <Button
            onClick={() => scrollToSection("about")}
            className={`transition-colors duration-300 ${
              activeSection === "about"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            About
          </Button>
          <Button
            onClick={() => scrollToSection("hire")}
            className={`transition-colors duration-300 ${
              activeSection === "hire"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Hire
          </Button>
          <Button
            onClick={() => scrollToSection("contact")}
            className={`transition-colors duration-300 ${
              activeSection === "contact"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Contact
          </Button>
        </div>
      </motion.div>
    </nav>
  );
}
