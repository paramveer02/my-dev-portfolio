import ProjectShowcase from "./ProjectShowcase";
import { motion } from "framer-motion";

export default function Work() {
  return (
    <section id="work" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto max-w-7xl"
      >
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-white">
            Selected Work
          </h2>
          <div className="w-24 h-px bg-blue-600 mx-auto"></div>
        </div>

        <div className="space-y-24">
          {[
            {
              title: "E-Commerce Platform",
              description:
                "A full-stack e-commerce solution with user authentication, product management, and payment integration. Built with React, Node.js, and MongoDB.",
              images: [
                "https://placehold.co/600x400/1a1a1a/ffffff?text=Task E-Commerce+Homepage+Dark",
                "https://placehold.co/600x400/1a1a1a/ffffff?text=TaskProduct+Page+Dark",
                "https://placehold.co/600x400/1a1a1a/ffffff?text=Task Cart+Checkout+Dark",
                "https://placehold.co/600x400/1a1a1a/ffffff?text=Task Admin+Dashboard+Dark",
              ],
              tech: ["React", "Node.js", "MongoDB", "Express"],
              year: "2024",
            },
            {
              title: "Task Management System",
              description:
                "Django-based task manager with real-time updates, team collaboration features, and responsive design. Includes user authentication and CRUD operations.",
              images: [
                "https://placehold.co/600x400/1a1a1a/ffffff?text=Task Calendar View Dark",
                "https://placehold.co/600x400/1a1a1a/ffffff?text=Task Management Dashboard Dark",
                "https://placehold.co/600x400/1a1a1a/ffffff?text=Task Board Kanban Dark",
                "https://placehold.co/600x400/1a1a1a/ffffff?text=Task Team Collaboration Dark",
              ],
              tech: ["Python", "Django", "PostgreSQL", "Bootstrap"],
              year: "2024",
            },
            {
              title: "Weather Analytics Dashboard",
              description:
                "React weather application with API integration, location services, and data visualization. Features clean UI and real-time weather updates.",
              images: [
                "https://placehold.co/600x400/1a1a1a/ffffff?text=Weather+Dashboard",
                "https://placehold.co/600x400/1a1a1a/ffffff?text=Charts+Analytics",
                "https://placehold.co/600x400/1a1a1a/ffffff?text=Map+View",
                "https://placehold.co/600x400/1a1a1a/ffffff?text=Mobile+View",
              ],
              tech: ["React", "JavaScript", "API", "CSS3"],
              year: "2023",
            },
          ].map((project, index) => (
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
