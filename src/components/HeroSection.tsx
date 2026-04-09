import heroImage from "@/assets/hero-interior.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Luxury interior design by Weaverbird Interior Studio"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <p className="font-body text-sm tracking-[0.4em] uppercase text-primary-foreground/70 mb-4 animate-fade-up opacity-0 animation-delay-200">
          Living Closer to Luxury
        </p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-tight animate-fade-up opacity-0 animation-delay-400">
          Your Dream<br />
          <em className="font-normal italic">Home,</em> Crafted.
        </h1>
        <p className="font-body text-base md:text-lg text-primary-foreground/80 mt-6 max-w-xl animate-fade-up opacity-0 animation-delay-600">
          Modern & trending interiors designed with precision, passion, and purpose by Weaverbird Interior Studio.
        </p>
        <div className="mt-10 flex gap-4 animate-fade-up opacity-0 animation-delay-600">
          <a
            href="#portfolio"
            className="px-8 py-3.5 font-body text-sm font-semibold tracking-wide uppercase bg-primary text-primary-foreground rounded-sm hover:bg-accent transition-colors duration-300"
          >
            View Our Work
          </a>
          <a
            href="#book"
            className="px-8 py-3.5 font-body text-sm font-semibold tracking-wide uppercase border border-primary-foreground/40 text-primary-foreground rounded-sm hover:bg-primary-foreground/10 transition-colors duration-300"
          >
            Book a Slot
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary-foreground/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
