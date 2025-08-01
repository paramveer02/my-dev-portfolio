import { useState, useEffect } from "react";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import { IconBrandGithub } from "@tabler/icons-react";
import { ExternalLink } from "lucide-react";

export default function ProjectShowcase({ project, index }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovering, project.images.length]);

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
        <div className="text-sm text-blue-400 font-medium">{project.year}</div>
        <h3 className="text-4xl font-light text-white">{project.title}</h3>
        <p className="text-lg text-gray-300 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-3">
          {project.tech.map((tech) => (
            <Badge
              key={tech}
              className="bg-white/10 text-gray-300 border-gray-700 px-3 py-1 hover:bg-white/20 transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-4 pt-4">
          <Button
            className="border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white bg-transparent"
            asChild
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub className="mr-2 h-4 w-4" />
              Code
            </a>
          </Button>
          <Button
            className="border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white bg-transparent"
            asChild
          >
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
        </div>
      </div>

      <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
        <div
          className="relative aspect-video rounded-lg overflow-hidden border border-gray-800 group cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setCurrentImageIndex(0);
          }}
        >
          {/* Image Container */}
          <div className="relative w-full h-full">
            {project.images.map((image, imgIndex) => (
              <div
                key={imgIndex}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  imgIndex === currentImageIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <img
                  src={`${image}`}
                  alt={`${project.title} - View ${imgIndex + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Overlay with slide indicators */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {project.images.map((_, imgIndex) => (
                <div
                  key={imgIndex}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    imgIndex === currentImageIndex
                      ? "bg-blue-400 w-8"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  onClick={() => setCurrentImageIndex(imgIndex)}
                />
              ))}
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
              {currentImageIndex + 1} / {project.images.length}
            </div>

            {/* Hover Instruction */}
            {!isHovering && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  Hover to view slideshow
                </div>
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          {isHovering && (
            <>
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? project.images.length - 1 : prev - 1
                  )
                }
              >
                ←
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                onClick={() =>
                  setCurrentImageIndex(
                    (prev) => (prev + 1) % project.images.length
                  )
                }
              >
                →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
