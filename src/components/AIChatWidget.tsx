import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string; quickReplies?: string[] };

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const SYSTEM_PROMPT = `You are Weaverbird's friendly interior design assistant on their website. You work for Weaverbird Interior Studio, a premium interior design firm in Hyderabad, India, founded by Chaitanya Chakravarthy.

Key facts:
- Services: Residential interiors, commercial spaces, modular kitchens, architectural design, turnkey solutions, renovation
- Speciality: Modern Indian contemporary design, premium quality, affordable prices
- Experience: 50+ projects, 5+ years, 100% client satisfaction
- Location: Hyderabad, India
- Founder: Chaitanya Chakravarthy

Pricing:
- Basic: ~₹1,200/sq.ft | Premium: ~₹1,800-2,500/sq.ft | Luxury: ₹3,000+/sq.ft
- Modular kitchen from ~₹1.5L | EMI options available

Timelines: 1BHK 30-40 days, 2BHK 40-55 days, 3BHK 55-75 days, Villa 75-120 days
Warranty: 5-year woodwork, 10-year hardware (Hettich/Hafele)
Materials: Century/Greenply plywood, Merino/Greenlam laminates, Hettich/Hafele hardware, Asian Paints

Rules:
- Be warm, helpful, concise (2-4 sentences, short bullet lists for details)
- Guide users toward booking a free consultation
- Stay on interior design topics
- Use ₹ for currency
- Never make up client names or specific project details`;

function pickQuickReplies(text: string): string[] {
  const lower = text.toLowerCase();
  if (/welcome|hello|hi there|how can i help/.test(lower)) return ["Our Services", "Design Ideas", "Pricing", "Book Consultation"];
  if (/service|offer|provide|speciali/.test(lower)) return ["Residential", "Commercial", "Modular Kitchen", "Pricing"];
  if (/price|cost|budget|package|₹|emi|afford/.test(lower)) return ["EMI Options", "Book Free Consultation", "Timeline"];
  if (/bedroom|kitchen|living|bathroom|design|color|idea/.test(lower)) return ["Bedroom", "Living Room", "Kitchen", "Bathroom"];
  if (/book|consult|visit|free|schedule|call/.test(lower)) return ["Our Process", "Pricing", "Timeline"];
  return ["Services", "Pricing", "Design Ideas", "Book Consultation"];
}

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Weaverbird's design assistant. Ask me anything about interior design, our services, pricing, or book a free consultation!",
      quickReplies: ["Our Services", "Design Ideas", "Pricing", "Book Consultation"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Build chat history (last 10 messages for context)
    const history = [...messages, userMsg]
      .map(({ role, content }) => ({ role, content }))
      .slice(-10);

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
          temperature: 0.7,
          max_tokens: 400,
        }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();
      const reply = data.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, quickReplies: pickQuickReplies(reply) },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please try again or reach us via the booking form below!",
          quickReplies: ["Try Again", "Book Consultation"],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform duration-200 flex items-center justify-center"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-background border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300" style={{ height: "30rem" }}>
          <div className="px-4 py-3 bg-primary text-primary-foreground flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-bold">W</div>
            <div>
              <p className="font-heading text-base font-semibold leading-tight">Weaverbird Assistant</p>
              <p className="font-body text-xs text-primary-foreground/70 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                AI-Powered
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2.5 rounded-2xl font-body text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
                {msg.role === "assistant" && msg.quickReplies && i === messages.length - 1 && !isTyping && (
                  <div className="flex flex-wrap gap-1.5 mt-2 ml-1">
                    {msg.quickReplies.map((label) => (
                      <button
                        key={label}
                        onClick={() => handleSend(label)}
                        className="px-3 py-1.5 text-xs font-body font-medium border border-primary/30 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground px-4 py-2.5 rounded-2xl rounded-bl-sm font-body text-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="Ask about interiors, pricing, services..."
              className="flex-1 px-3 py-2 bg-muted border-none rounded-full font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
