import { Code, Server, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <section className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="conatiner mx-auto max-w-6xl"
      >
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-white">
            Technical Skills
          </h2>
          <div className="w-24 h-px bg-blue-600 mx-auto"></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid gap-12 md:grid-cols-3"
      >
        {[
          {
            title: "Frontend",
            icon: Code,
            skills: ["JavaScript", "React", "HTML5", "CSS3", "Tailwind CSS"],
          },
          {
            title: "Backend",
            icon: Server,
            skills: ["Node.js", "Express", "Python", "Django", "REST APIs"],
          },
          {
            title: "Database & Tools",
            icon: Database,
            skills: ["MongoDB", "PostgreSQL", "Git", "VS Code", "Postman"],
          },
        ].map((category, index) => (
          <div
            key={category.title}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-gray-800 hover:border-gray-700 transition-all duration-500"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <category.icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-medium text-white">
                {category.title}
              </h3>
            </div>
            <div className="space-y-3">
              {category.skills.map((skill) => (
                <div key={skill} className="text-gray-300">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
