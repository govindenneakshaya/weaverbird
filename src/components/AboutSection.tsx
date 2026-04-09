import clientPhoto from "@/assets/client-photo.png";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src={clientPhoto}
                alt="Chaitanya Chakravarthy - Founder of Weaverbird Interior Studio"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-accent rounded-sm -z-10" />
          </div>

          <div>
            <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              The Visionary
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Chaitanya<br />Chakravarthy
            </h2>
            <div className="w-16 h-0.5 bg-accent mb-8" />
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
              With a passion for crafting spaces that tell stories, Chaitanya Chakravarthy founded Weaverbird Interior Studio to bring luxury, comfort, and authenticity into every home. Every project is a masterpiece — from concept to completion.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              Specializing in modern Indian contemporary design, Weaverbird delivers premium quality interiors with on-time delivery at affordable prices. Our attention to detail and commitment to excellence sets us apart.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {[
                { num: "50+", label: "Projects" },
                { num: "5+", label: "Years" },
                { num: "100%", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading text-3xl font-bold text-accent">{stat.num}</p>
                  <p className="font-body text-xs tracking-wider uppercase text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
