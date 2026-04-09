import { useState } from "react";
import interiorBathroom from "@/assets/interior-bathroom.png";
import interiorExterior from "@/assets/interior-exterior.png";
import interiorBedroom1 from "@/assets/interior-bedroom1.png";
import interiorBedroom2 from "@/assets/interior-bedroom2.png";
import heroInterior from "@/assets/hero-interior.jpg";

const projects = [
  { src: interiorExterior, title: "Tranquil Villa", category: "Exterior", aspect: "aspect-video" },
  { src: interiorBedroom1, title: "Master Bedroom", category: "Bedroom", aspect: "aspect-video" },
  { src: interiorBathroom, title: "Modern Bathroom", category: "Bathroom", aspect: "aspect-square" },
  { src: interiorBedroom2, title: "Guest Bedroom", category: "Bedroom", aspect: "aspect-video" },
  { src: heroInterior, title: "Luxury Living Room", category: "Living Room", aspect: "aspect-square" },
];

const PortfolioSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Our Craft
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Featured Projects
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-6" />
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {projects.map((project, i) => (
            <div
              key={i}
              className="break-inside-avoid group cursor-pointer overflow-hidden rounded-sm relative"
              onClick={() => setSelectedImage(project.src)}
            >
              <img
                src={project.src}
                alt={project.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-500 flex items-end">
                <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/70">
                    {project.category}
                  </p>
                  <p className="font-heading text-xl text-primary-foreground font-semibold">
                    {project.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Project detail"
            className="max-w-full max-h-full object-contain rounded-sm"
          />
          <button
            className="absolute top-6 right-6 text-primary-foreground text-3xl font-light hover:text-accent transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
