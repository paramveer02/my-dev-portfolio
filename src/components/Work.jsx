import ProjectShowcase from "./ProjectShowcase";
import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "JobFix — Job Tracking App",
    year: "2025",
    description:
      "A full-stack tracker that keeps every application in one place: secure auth, profile/avatars, job CRUD, powerful search & filters, and charts for monthly trends. Built for management with a clean, focused UX.",
    images: [
      "jobFix/jobfix-1.png",
      "jobFix/jobfix-2.png",
      "jobFix/jobfix-3.png",
      "jobFix/jobfix-4.png",
    ],
    meta: ["Responsive"],
    tech: ["React", "Vite", "Node.js", "Express", "MongoDB"],
    links: {
      live: "https://jobfix.onrender.com",
      code: "https://github.com/paramveer02/Jobfix-platform", // client README links to server repo
    },
    codeServer: "https://github.com/paramveer02/jobfix-mern-server",
  },
  {
    title: "EventSpark — Event Discovery Platform",
    year: "2025",
    description:
      "A modern event discovery and management platform where users can create, explore, and manage events with location-based filtering, AI-powered city guides, and sleek interactive UI.",
    images: [
      "eventSpark/event-1.jpg",
      "eventSpark/event-2.jpg",
      "eventSpark/event-3.jpg",
      "eventSpark/event-4.jpg",
    ],
    meta: ["Responsive", "AI-powered (Gemini)", "Location-based"],
    tech: ["React", "Vite", "Node.js", "Express", "MongoDB"],
    codeServer: "https://github.com/paramveer02/events-node-backend",
    links: {
      live: "https://eventspark-vjnm.onrender.com",
      code: "https://github.com/paramveer02/react-city-events",
    },
  },
  {
    title: "Tic-Tac-Toe — React Mini-Game",
    year: "2025",
    description:
      "A polished, pure-React take on the classic. Two players alternate on a 3×3 board with inline name editing, move log (row/column), winner & draw detection, and one-click rematch. Built to showcase clean component design and immutable state updates.",
    images: [
      "tic-tac-toe/tic-1.png",
      "tic-tac-toe/tic-2.png",
      "tic-tac-toe/tic-3.png",
    ],
    tech: ["React", "Vite", "JavaScript"],
    links: {
      live: "https://react-tic-tac-toe-b8v0.onrender.com",
      code: "https://github.com/paramveer02/react-tic-tac-toe",
    },
  },
];

export default function Work() {
  return (
    <section id="work" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container mx-auto max-w-7xl"
      >
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-light text-white mb-6">
            Selected Work
          </h2>
          <div className="w-24 h-px bg-blue-600 mx-auto" />
          <p className="mt-6 text-gray-300/90 max-w-2xl mx-auto">
            Real projects that demonstrate product thinking, performance, and
            clean execution.
          </p>
        </div>

        <div className="space-y-28">
          {PROJECTS.map((project, index) => (
            <ProjectShowcase
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
