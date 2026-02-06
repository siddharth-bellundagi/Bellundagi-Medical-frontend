import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Dashboard() {
  const [totalMedicines, setTotalMedicines] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [todaySales, setTodaySales] = useState(0);
  const [totalBills, setTotalBills] = useState(0);

  const [lowStockItems, setLowStockItems] = useState([]);
  const [showLowStock, setShowLowStock] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const medRes = await api.get("/medicines");
        setTotalMedicines(medRes.data.length);

        const lowStockRes = await api.get("/medicines/low-stock");
        setLowStockCount(lowStockRes.data.length);
        setLowStockItems(lowStockRes.data);

        const billRes = await api.get("/bills");
        setTotalBills(billRes.data.length);

        const today = new Date();
        const startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        ).toISOString();

        const endDate = new Date().toISOString();

        const salesRes = await api.get(
          `/analytics/summary?startDate=${startDate}&endDate=${endDate}`
        );

        setTodaySales(salesRes.data.totalSales);
      } catch (error) {
        console.error("Dashboard data error", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-6">
          Dashboard
        </h1>

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* TOTAL MEDICINES */}
          <div className="rounded-xl p-5 text-white bg-gradient-to-br from-purple-600 to-pink-500 shadow-md">
            <p className="text-sm opacity-90">Total Medicines</p>
            <h2 className="text-3xl font-bold mt-2">
              {totalMedicines}
            </h2>
          </div>

          {/* LOW STOCK */}
          <div
            onClick={() => setShowLowStock(true)}
            className="cursor-pointer rounded-xl p-5 text-white bg-gradient-to-br from-red-500 to-orange-500 shadow-md hover:scale-[1.02] transition"
          >
            <p className="text-sm opacity-90">Low Stock Items</p>
            <h2 className="text-3xl font-bold mt-2">
              {lowStockCount}
            </h2>
            <p className="text-xs mt-1 opacity-80">
              Click to view
            </p>
          </div>

          {/* TODAY SALES */}
          <div className="rounded-xl p-5 text-white bg-gradient-to-br from-blue-600 to-cyan-500 shadow-md">
            <p className="text-sm opacity-90">Today’s Sales</p>
            <h2 className="text-3xl font-bold mt-2">
              ₹{todaySales}
            </h2>
          </div>

          {/* TOTAL BILLS */}
          <div className="rounded-xl p-5 text-white bg-gradient-to-br from-green-600 to-teal-500 shadow-md">
            <p className="text-sm opacity-90">Total Bills</p>
            <h2 className="text-3xl font-bold mt-2">
              {totalBills}
            </h2>
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            Store Overview
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            This dashboard shows real-time inventory status, sales performance,
            and billing activity for Bellundagi Medicals.
          </p>
        </div>
      </main>

      {/* LOW STOCK MODAL */}
      {showLowStock && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Low Stock Items
              </h2>
              <button
                onClick={() => setShowLowStock(false)}
                className="text-xl text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {lowStockItems.length === 0 ? (
              <p className="text-sm text-gray-500">
                No low stock items 🎉
              </p>
            ) : (
              <ul className="space-y-3 max-h-[300px] overflow-y-auto">
                {lowStockItems.map((item) => (
                  <li
                    key={item._id}
                    className="border rounded-md p-3"
                  >
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} | Min: {item.minStock}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Dashboard;
