const services = [
  {
    icon: "🏠",
    title: "Residential Interiors",
    description: "Complete home interiors from living rooms to bedrooms, kitchens, and beyond — designed to reflect your personality.",
  },
  {
    icon: "🏢",
    title: "Commercial Spaces",
    description: "Office interiors, retail stores, and hospitality spaces that combine functionality with stunning aesthetics.",
  },
  {
    icon: "📐",
    title: "Architectural Design",
    description: "Exterior elevation design, structural planning, and landscape architecture for your dream home.",
  },
  {
    icon: "🎨",
    title: "Turnkey Solutions",
    description: "End-to-end project management from concept to completion — on time, premium quality, at affordable prices.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            What We Do
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Our Services
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="group p-8 bg-card rounded-sm border border-border hover:border-accent/40 transition-all duration-500 hover:shadow-lg"
            >
              <span className="text-4xl block mb-6">{service.icon}</span>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
