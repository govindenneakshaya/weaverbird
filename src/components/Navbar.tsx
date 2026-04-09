import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="#home" className="flex flex-col">
          <span className={`font-heading text-2xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
            Weaverbird
          </span>
          <span className={`text-xs font-body tracking-[0.3em] uppercase -mt-1 transition-colors duration-300 ${scrolled ? "text-muted-foreground" : "text-primary-foreground/70"}`}>
            Interior Studio
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-body font-medium tracking-wide uppercase transition-colors duration-300 hover:text-accent ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            className="px-6 py-2.5 text-sm font-body font-semibold tracking-wide uppercase bg-primary text-primary-foreground rounded-sm hover:bg-accent transition-colors duration-300"
          >
            Book a Slot
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex flex-col gap-1.5 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
        >
          <span className={`block w-6 h-0.5 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border">
          <div className="flex flex-col items-center py-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-body font-medium tracking-wide uppercase text-foreground hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-2.5 text-sm font-body font-semibold tracking-wide uppercase bg-primary text-primary-foreground rounded-sm"
            >
              Book a Slot
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
