import { useState } from "react";

export default function AddCustomer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    tier: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("✅ Customer added successfully.");
        setForm({ name: "", email: "", organization: "", tier: "" });
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">👥 Add Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
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
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
            Organization
          </label>
          <input
            id="organization"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="tier" className="block text-sm font-medium text-gray-700">
            Tier
          </label>
          <select
            id="tier"
            name="tier"
            value={form.tier}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">-- Select tier --</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="bronze">Bronze</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition">
          ➕ Add Customer
        </button>
        {message && <p className="text-sm mt-3">{message}</p>}
      </form>
    </div>
  );
}
