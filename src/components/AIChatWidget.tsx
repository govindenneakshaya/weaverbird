import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const INTERIOR_RESPONSES: Record<string, string> = {
  default:
    "Thank you for your interest in Weaverbird Interior Studio! I can help you with interior design ideas, color palettes, material suggestions, and more. What would you like to know?",
  color:
    "For a modern Indian home, we recommend warm neutrals like beige, cream, and taupe as base colors. Accent with gold, teal, or terracotta for a luxurious feel. Weaverbird specializes in creating personalized color schemes for each client!",
  bedroom:
    "For bedrooms, we love creating serene sanctuaries. Consider soft textures, ambient lighting with cove LEDs, and statement wardrobes with backlit panels — just like our signature designs. Book a consultation for personalized bedroom design!",
  bathroom:
    "Modern bathrooms are all about clean lines, textured tiles, and smart storage. Our team excels at creating spa-like bathrooms with premium materials. Check out our portfolio for inspiration!",
  cost:
    "Our pricing varies based on project scope and materials. We pride ourselves on offering premium quality at affordable prices. Book a free consultation and we'll provide a detailed estimate tailored to your needs!",
  kitchen:
    "Kitchens are the heart of the home! We design modular kitchens with smart layouts, premium finishes, and functional storage. From contemporary to traditional Indian styles — we do it all.",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("color") || lower.includes("colour") || lower.includes("palette")) return INTERIOR_RESPONSES.color;
  if (lower.includes("bedroom") || lower.includes("bed")) return INTERIOR_RESPONSES.bedroom;
  if (lower.includes("bathroom") || lower.includes("bath") || lower.includes("toilet")) return INTERIOR_RESPONSES.bathroom;
  if (lower.includes("cost") || lower.includes("price") || lower.includes("budget") || lower.includes("rate")) return INTERIOR_RESPONSES.cost;
  if (lower.includes("kitchen") || lower.includes("modular")) return INTERIOR_RESPONSES.kitchen;
  return INTERIOR_RESPONSES.default;
}

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Weaverbird's design assistant. Ask me about interior design ideas, colors, materials, or our services! 🏠" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAIResponse(input);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-accent transition-colors duration-300 flex items-center justify-center text-2xl"
      >
        {open ? "✕" : "✨"}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-background border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col" style={{ height: "28rem" }}>
          <div className="px-4 py-3 bg-primary text-primary-foreground">
            <p className="font-heading text-lg font-semibold">Design Assistant</p>
            <p className="font-body text-xs text-primary-foreground/70">Powered by AI • Ask anything about interiors</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg font-body text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground px-3 py-2 rounded-lg font-body text-sm">
                  Typing...
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about interiors..."
              className="flex-1 px-3 py-2 bg-muted border-none rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              onClick={send}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-sm font-body text-sm font-semibold hover:bg-accent transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
