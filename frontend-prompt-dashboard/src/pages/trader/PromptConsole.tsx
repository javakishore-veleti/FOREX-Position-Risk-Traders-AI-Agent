import { useEffect, useState } from "react";

interface Book {
  id: string;
  name: string;
}

interface LLMResponse {
  provider: string;
  content: string;
  score: number;
}

export default function PromptConsole() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState<LLMResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/my-books")
      .then((res) => res.json())
      .then(setBooks)
      .catch(() => setMessage("❌ Failed to load trading books"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponses([]);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/llm/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          trading_book_id: selectedBookId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponses(data.responses);
        setMessage("✅ Prompt submitted successfully.");
      } else {
        const err = await res.json();
        setMessage(`❌ Error: ${err.detail || "unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">💬 Trader Prompt Console</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Trading Book</label>
          <select
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            required
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">-- Choose a book --</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Enter Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            required
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono"
            placeholder="e.g. Estimate VaR for GBP/JPY trade on 2025-07-02"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition"
        >
          {loading ? "⏳ Submitting..." : "🚀 Submit Prompt"}
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>

      {responses.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">🧠 Model Responses</h3>
          {responses.map((res, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-300 rounded p-4 shadow-sm space-y-2"
            >
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-700">{res.provider}</span>{" "}
                — score: <span className="font-mono">{res.score?.toFixed(2)}</span>
              </p>
              <pre className="text-sm whitespace-pre-wrap text-gray-800 font-mono">
                {res.content}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
