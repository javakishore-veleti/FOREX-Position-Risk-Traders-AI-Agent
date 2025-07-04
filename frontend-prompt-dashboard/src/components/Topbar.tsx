export default function Topbar() {
  return (
    <header className="bg-blue-900 text-white px-6 py-3 flex justify-between items-center shadow-sm">
      <h1 className="text-lg font-semibold tracking-wide flex items-center gap-2">
        🌐 FOREX Agent Portal
      </h1>
      <span className="text-sm opacity-80">Signed in as: Admin</span>
    </header>
  );
}
