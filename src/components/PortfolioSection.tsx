import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import interiorBathroom from "@/assets/interior-bathroom.png";
import interiorExterior from "@/assets/interior-exterior.png";
import interiorBedroom1 from "@/assets/interior-bedroom1.png";
import interiorBedroom2 from "@/assets/interior-bedroom2.png";
import heroInterior from "@/assets/hero-interior.jpg";

type DbProject = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  is_upcoming: boolean;
};

const staticProjects = [
  { src: interiorExterior, title: "Tranquil Villa", category: "Exterior" },
  { src: interiorBedroom1, title: "Master Bedroom", category: "Bedroom" },
  { src: interiorBathroom, title: "Modern Bathroom", category: "Bathroom" },
  { src: interiorBedroom2, title: "Guest Bedroom", category: "Bedroom" },
  { src: heroInterior, title: "Luxury Living Room", category: "Living Room" },
];

const PortfolioSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dbProjects, setDbProjects] = useState<DbProject[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "upcoming">("all");

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from("projects").select("*").order("display_order", { ascending: true });
      if (data) setDbProjects(data);
    };
    fetchProjects();
  }, []);

  const completedDb = dbProjects.filter((p) => !p.is_upcoming);
  const upcomingDb = dbProjects.filter((p) => p.is_upcoming);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Our Craft
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Featured Projects
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-6" />
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {(["all", "completed", "upcoming"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 font-body text-sm tracking-wide uppercase rounded-sm transition-colors duration-300 ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              {f === "all" ? "All Projects" : f === "completed" ? "Completed" : "Upcoming"}
            </button>
          ))}
        </div>

        {/* Upcoming projects section */}
        {(filter === "all" || filter === "upcoming") && upcomingDb.length > 0 && (
          <div className="mb-16">
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              🔜 Upcoming Projects
            </h3>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {upcomingDb.map((project) => (
                <div
                  key={project.id}
                  className="break-inside-avoid group cursor-pointer overflow-hidden rounded-sm relative"
                  onClick={() => setSelectedImage(project.image_url)}
                >
                  <img src={project.image_url} alt={project.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-accent text-accent-foreground font-body text-xs tracking-wide uppercase rounded-sm">
                    Upcoming
                  </div>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-500 flex items-end">
                    <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/70">{project.category}</p>
                      <p className="font-heading text-xl text-primary-foreground font-semibold">{project.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed projects */}
        {(filter === "all" || filter === "completed") && (
          <div>
            {filter === "all" && upcomingDb.length > 0 && (
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                ✅ Completed Projects
              </h3>
            )}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {/* DB completed projects */}
              {completedDb.map((project) => (
                <div
                  key={project.id}
                  className="break-inside-avoid group cursor-pointer overflow-hidden rounded-sm relative"
                  onClick={() => setSelectedImage(project.image_url)}
                >
                  <img src={project.image_url} alt={project.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-500 flex items-end">
                    <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/70">{project.category}</p>
                      <p className="font-heading text-xl text-primary-foreground font-semibold">{project.title}</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Static projects */}
              {staticProjects.map((project, i) => (
                <div
                  key={`static-${i}`}
                  className="break-inside-avoid group cursor-pointer overflow-hidden rounded-sm relative"
                  onClick={() => setSelectedImage(project.src)}
                >
                  <img src={project.src} alt={project.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-500 flex items-end">
                    <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/70">{project.category}</p>
                      <p className="font-heading text-xl text-primary-foreground font-semibold">{project.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Project detail" className="max-w-full max-h-full object-contain rounded-sm" />
          <button className="absolute top-6 right-6 text-primary-foreground text-3xl font-light hover:text-accent transition-colors" onClick={() => setSelectedImage(null)}>
            ✕
          </button>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
