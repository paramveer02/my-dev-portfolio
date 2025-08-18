import ProjectShowcase from "./ProjectShowcase";
import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "E-Commerce Platform",
    year: "2024",
    description:
      "A full-stack e-commerce solution with auth, product management, and payments. Built for speed and DX.",
    images: [
      "https://placehold.co/800x520/0b0b0b/ffffff?text=E-Commerce+Homepage+Dark",
      "https://placehold.co/400x260/111111/ffffff?text=Product+Page+Dark",
      "https://placehold.co/400x260/161616/ffffff?text=Cart+Checkout+Dark",
      "https://placehold.co/400x260/1a1a1a/ffffff?text=Admin+Dashboard+Dark",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB"],
    links: {
      live: "#",
      code: "#",
    },
  },
  {
    title: "Task Management System",
    year: "2024",
    description:
      "Django-based task manager with real-time updates, team collaboration and clean responsive UI.",
    images: [
      "https://placehold.co/800x520/0b0b0b/ffffff?text=Calendar+View",
      "https://placehold.co/400x260/111111/ffffff?text=Dashboard",
      "https://placehold.co/400x260/161616/ffffff?text=Kanban+Board",
      "https://placehold.co/400x260/1a1a1a/ffffff?text=Team+Collab",
    ],
    tech: ["Python", "Django", "PostgreSQL", "Bootstrap"],
    links: {
      live: "#",
      code: "#",
    },
  },
  {
    title: "Weather Analytics Dashboard",
    year: "2023",
    description:
      "React weather app with API integration, location services and charted insights. Polished, fast, reliable.",
    images: [
      "https://placehold.co/800x520/0b0b0b/ffffff?text=Weather+Dashboard",
      "https://placehold.co/400x260/111111/ffffff?text=Charts+Analytics",
      "https://placehold.co/400x260/161616/ffffff?text=Map+View",
      "https://placehold.co/400x260/1a1a1a/ffffff?text=Mobile+View",
    ],
    tech: ["React", "JavaScript", "API", "CSS3"],
    links: {
      live: "#",
      code: "#",
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
