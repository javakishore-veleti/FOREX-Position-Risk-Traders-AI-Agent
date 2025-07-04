import { useEffect, useState } from "react";

interface Book {
  id: string;
  name: string;
}

interface Customer {
  id: string;
  name: string;
}

export default function AddTrade() {
  const [form, setForm] = useState({
    from_currency: "",
    to_currency: "",
    amount: "",
    trade_date: "",
    customer_id: "",
  });
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/trading-books")
      .then((res) => res.json())
      .then(setBooks)
      .catch(() => setMessage("❌ Failed to load books"));

    fetch("http://localhost:8000/api/customers")
      .then((res) => res.json())
      .then(setCustomers)
      .catch(() => setMessage("❌ Failed to load customers"));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleBook = (bookId: string) => {
    setSelectedBookIds((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      amount: parseFloat(form.amount),
      book_ids: selectedBookIds,
    };

    try {
      const res = await fetch("http://localhost:8000/api/forex-trades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("✅ Trade recorded.");
        setForm({
          from_currency: "",
          to_currency: "",
          amount: "",
          trade_date: "",
          customer_id: "",
        });
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        💱 Add FOREX Trade
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded shadow"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              From Currency
            </label>
            <input
              name="from_currency"
              value={form.from_currency}
              onChange={handleChange}
              required
              placeholder="e.g. USD"
              className="mt-1 w-full border px-3 py-2 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              To Currency
            </label>
            <input
              name="to_currency"
              value={form.to_currency}
              onChange={handleChange}
              required
              placeholder="e.g. EUR"
              className="mt-1 w-full border px-3 py-2 rounded text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              type="number"
              step="0.01"
              className="mt-1 w-full border px-3 py-2 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trade Date
            </label>
            <input
              name="trade_date"
              value={form.trade_date}
              onChange={handleChange}
              required
              type="date"
              className="mt-1 w-full border px-3 py-2 rounded text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assign Books
          </label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {books.map((book) => (
              <label key={book.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedBookIds.includes(book.id)}
                  onChange={() => toggleBook(book.id)}
                />
                {book.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assign Customer
          </label>
          <select
            name="customer_id"
            value={form.customer_id}
            onChange={handleChange}
            required
            className="mt-1 w-full border px-3 py-2 rounded text-sm"
          >
            <option value="">-- Choose customer --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition"
        >
          ➕ Record Trade
        </button>
        {message && <p className="text-sm mt-3">{message}</p>}
      </form>
    </div>
  );
}
