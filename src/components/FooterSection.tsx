const FooterSection = () => {
  return (
    <footer id="contact" className="py-16 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-2xl font-bold mb-2">Weaverbird</h3>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/60 mb-4">
              Interior Studio
            </p>
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">
              Living closer to luxury. Crafting dream spaces with passion, precision, and purpose.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Home", "About", "Portfolio", "Services", "Book a Slot"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/ /g, "")}`}
                  className="font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-2 font-body text-sm text-primary-foreground/70">
              <p>📞 8919471571 | 6302362519</p>
              <p>🌐 weaverbirdinteriorsstudio.com</p>
              <p>📍 Hyderabad, India</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="font-body text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Weaverbird Interior Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
