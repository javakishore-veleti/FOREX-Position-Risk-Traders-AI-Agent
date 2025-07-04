import { useState } from "react";

export default function AddBook() {
  const [name, setName] = useState("");
  const [desk, setDesk] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      desk,
    };

    try {
      const res = await fetch("http://localhost:8000/api/trading-books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("✅ Trading book created successfully.");
        setName("");
        setDesk("");
      } else {
        const data = await res.json();
        setMessage(`❌ Error: ${data.detail || "unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error connecting to server.");
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📘 Add Trading Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Book Name
          </label>
          <input
            id="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. EUR-Asia Desk"
          />
        </div>
        <div>
          <label htmlFor="desk" className="block text-sm font-medium text-gray-700">
            Desk / Department
          </label>
          <input
            id="desk"
            value={desk}
            required
            onChange={(e) => setDesk(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. FX Risk Team"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          ➕ Add Book
        </button>
        {message && <p className="text-sm mt-3">{message}</p>}
      </form>
    </div>
  );
}
