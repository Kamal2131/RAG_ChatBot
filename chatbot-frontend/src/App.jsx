import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://127.0.0.1:8000/chatbot/ask/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const isJson = res.headers
        .get("content-type")
        ?.includes("application/json");

      const data = isJson
        ? await res.json()
        : { answer: await res.text() };

      setAnswer(data.answer || "No answer provided.");
    } catch (err) {
      console.error(err);
      setAnswer("❌ Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">🧠 RAG Chatbot</h1>

        <textarea
          rows={4}
          placeholder="Ask something..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={askQuestion}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

        {answer && (
          <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg text-sm prose max-w-none overflow-auto">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
