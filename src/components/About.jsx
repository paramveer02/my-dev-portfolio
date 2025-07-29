import { Code } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-4 bg-black/80 backdrop-blur-sm pt-24"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl font-light mb-8 text-white">
                About Me
              </h2>
              <div className="w-24 h-px bg-blue-600 mb-8"></div>
            </div>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                [IN PROGRESS] I'm an intermediate full-stack developer with 2+
                years of experience building modern web applications. My passion
                lies in creating elegant, efficient solutions that solve
                real-world problems.
              </p>
              <p>
                Specializing in JavaScript, React, Node.js, and Python, I bring
                ideas to life through clean code and thoughtful design. I'm
                constantly learning and evolving with the latest technologies.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <div className="text-4xl font-light text-blue-400 mb-2">5+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-light text-blue-400 mb-2">2+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border border-gray-700">
                <img
                  src="me.jpg"
                  alt="Paramveer MARWAH"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Code className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
