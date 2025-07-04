import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AddTrader from "./pages/admin/AddTrader";
import AddBook from "./pages/admin/AddBook.tsx";
import LinkBookTrader from "./pages/admin/LinkBookTrader.tsx";
import AddCustomer from "./pages/admin/AddCustomer.tsx";
import AddTrade from "./pages/admin/AddTrade.tsx";
import PromptConsole from "./pages/trader/PromptConsole.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<div className="text-xl font-bold">📊 Dashboard Coming Soon</div>} />
            <Route path="admin/add-trader" element={<AddTrader />} />
        <Route path="admin/add-book" element={<AddBook />} />
            <Route path="admin/link-book-trader" element={<LinkBookTrader />} />
            <Route path="admin/add-customer" element={<AddCustomer />} />
            <Route path="admin/add-trade" element={<AddTrade />} />
            <Route path="trader/prompt" element={<PromptConsole />} />





          {/* Other admin routes to follow */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
