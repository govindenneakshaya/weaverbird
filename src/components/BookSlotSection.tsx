import { useState } from "react";

const BookSlotSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi, I'm ${form.name}. I'd like to book a consultation.\n\nPhone: ${form.phone}\nEmail: ${form.email}\nPreferred Date: ${form.date}\nMessage: ${form.message}`;
    const whatsappUrl = `https://wa.me/918919471571?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <section id="book" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Get Started
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
              Book a Consultation
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mt-6" />
            <p className="font-body text-muted-foreground mt-4">
              Fill in your details and we'll connect with you on WhatsApp
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Your Name *"
                required
                value={form.name}
                onChange={update("name")}
                className="w-full px-4 py-3.5 bg-background border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                required
                value={form.phone}
                onChange={update("phone")}
                className="w-full px-4 py-3.5 bg-background border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={update("email")}
              className="w-full px-4 py-3.5 bg-background border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
            />
            <input
              type="date"
              value={form.date}
              onChange={update("date")}
              className="w-full px-4 py-3.5 bg-background border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
            />
            <textarea
              placeholder="Tell us about your project..."
              rows={4}
              value={form.message}
              onChange={update("message")}
              className="w-full px-4 py-3.5 bg-background border border-border rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide uppercase rounded-sm hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.61l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.352 0-4.55-.768-6.32-2.066l-.44-.33-3.088 1.035 1.035-3.088-.33-.44A9.965 9.965 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookSlotSection;
