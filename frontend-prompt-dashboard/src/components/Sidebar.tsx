import { NavLink } from "react-router-dom";

const linkBase = "block py-1 px-3 rounded text-sm";
const linkActive = "bg-blue-100 text-blue-700 font-semibold";

export default function Sidebar() {
  return (
    <aside className="w-60 flex-shrink-0 bg-white border-r border-gray-200 p-4 space-y-6 h-screen overflow-y-auto">
      <div>
        <h2 className="text-xs font-bold text-gray-500 uppercase mb-2">Dashboard</h2>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : "hover:bg-blue-50"}`
          }
        >
          🏠 Overview
        </NavLink>
      </div>
      <div>
        <h2 className="text-xs font-bold text-gray-500 uppercase mb-2">Admin</h2>
        <nav className="space-y-1">
          <NavLink to="/admin/add-trader" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "hover:bg-blue-50"}`}>👤 Add Trader</NavLink>
          <NavLink to="/admin/add-book" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "hover:bg-blue-50"}`}>📘 Add Trading Book</NavLink>
          <NavLink to="/admin/link-book-trader" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "hover:bg-blue-50"}`}>🔗 Link Book ↔ Trader</NavLink>
          <NavLink to="/admin/add-customer" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "hover:bg-blue-50"}`}>👥 Add Customer</NavLink>
          <NavLink to="/admin/add-trade" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "hover:bg-blue-50"}`}>💱 Add FOREX Trade</NavLink>
        </nav>
      </div>
      <div>
        <h2 className="text-xs font-bold text-gray-500 uppercase mb-2">Trader</h2>
        <nav className="space-y-1">
          <NavLink to="/trader/prompt" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "hover:bg-blue-50"}`}>💬 Prompt Console</NavLink>
          <NavLink to="/trader/logs" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "hover:bg-blue-50"}`}>📄 Prompt Logs</NavLink>
        </nav>
      </div>
    </aside>
  );
}
