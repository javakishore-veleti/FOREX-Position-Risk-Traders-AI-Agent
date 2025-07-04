import { useState } from "react";

export default function AddTrader() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    desk: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/traders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("✅ Trader added successfully.");
        setForm({ name: "", role: "", desk: "", email: "" });
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
    <div className="max-w-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">👤 Add Trader</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Trader Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="desk" className="block text-sm font-medium text-gray-700">
            Desk / Department
          </label>
          <input
            id="desk"
            name="desk"
            value={form.desk}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Trader Role
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">-- Select a role --</option>
            <option value="junior">Junior Trader</option>
            <option value="senior">Senior Trader</option>
            <option value="quant">Quantitative Analyst</option>
            <option value="manager">Desk Manager</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition">
          ➕ Add Trader
        </button>
        {message && <p className="text-sm mt-3">{message}</p>}
      </form>
    </div>
  );
}
