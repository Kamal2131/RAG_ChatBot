import { useEffect, useRef, useState } from "react";
import { ChatBubble } from "@/components/ChatBubble";
import { ChatInput } from "@/components/ChatInput";

interface Message {
  role: "user" | "bot";
  content: string;
}

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chatbot/ask/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      const botMsg: Message = {
        role: "bot",
        content: data.answer || "No answer found.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "❌ Server error." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 hidden md:flex flex-col">
        <h2 className="text-lg font-semibold text-blue-600 mb-4">🧠 RAG Chatbot</h2>
        <nav className="flex flex-col gap-2 text-sm">
          <button className="text-left text-gray-700 hover:text-blue-600">
            New Chat
          </button>
          <button className="text-left text-gray-700 hover:text-blue-600">
            Chat History (Coming soon)
          </button>
          <button className="text-left text-gray-700 hover:text-blue-600">
            Settings
          </button>
        </nav>
      </aside>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 text-xl font-bold bg-white border-b shadow-sm text-blue-700 md:hidden">
          🧠 RAG Chatbot
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} message={msg.content} />
          ))}
          <div ref={scrollRef} />
        </main>

        <ChatInput
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
