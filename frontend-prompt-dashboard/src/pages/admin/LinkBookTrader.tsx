import { useEffect, useState } from "react";

interface Trader {
  id: string;
  name: string;
}

interface Book {
  id: string;
  name: string;
}

export default function LinkBookTrader() {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedTraderId, setSelectedTraderId] = useState("");
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/traders")
      .then((res) => res.json())
      .then(setTraders)
      .catch(() => setMessage("❌ Failed to load traders"));

    fetch("http://localhost:8000/api/trading-books")
      .then((res) => res.json())
      .then(setBooks)
      .catch(() => setMessage("❌ Failed to load books"));
  }, []);

  const handleCheckboxChange = (bookId: string) => {
    setSelectedBookIds((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/assign-books-to-trader", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trader_id: selectedTraderId,
          book_ids: selectedBookIds,
        }),
      });
      if (res.ok) {
        setMessage("✅ Trader linked to books.");
        setSelectedTraderId("");
        setSelectedBookIds([]);
      } else {
        const data = await res.json();
        setMessage(`❌ Error: ${data.detail || "unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error.");
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔗 Link Trader to Trading Books</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
        <div>
          <label htmlFor="trader" className="block text-sm font-medium text-gray-700 mb-1">
            Select Trader
          </label>
          <select
            id="trader"
            value={selectedTraderId}
            onChange={(e) => setSelectedTraderId(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">-- Choose trader --</option>
            {traders.map((trader) => (
              <option key={trader.id} value={trader.id}>
                {trader.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Assign Books</p>
          <div className="grid grid-cols-2 gap-2">
            {books.map((book) => (
              <label key={book.id} className="flex items-center text-sm gap-2">
                <input
                  type="checkbox"
                  value={book.id}
                  checked={selectedBookIds.includes(book.id)}
                  onChange={() => handleCheckboxChange(book.id)}
                />
                {book.name}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition"
        >
          🔗 Link Trader to Books
        </button>
        {message && <p className="text-sm mt-3">{message}</p>}
      </form>
    </div>
  );
}
