import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {
  const [totalMedicines, setTotalMedicines] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [todaySales, setTodaySales] = useState(0);
  const [totalBills, setTotalBills] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Total medicines
        const medRes = await api.get("/medicines");
        setTotalMedicines(medRes.data.length);

        // 2. Low stock count
        const lowStockRes = await api.get("/medicines/low-stock");
        setLowStockCount(lowStockRes.data.length);

        // 3. Bills (for total bills)
        const billRes = await api.get("/bills");
        setTotalBills(billRes.data.length);

        // 4. Today sales
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">
          Dashboard
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <p className="text-sm text-muted">Total Medicines</p>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {totalMedicines}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <p className="text-sm text-muted">Low Stock Items</p>
            <h2 className="text-3xl font-bold text-danger mt-2">
              {lowStockCount}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <p className="text-sm text-muted">Today’s Sales</p>
            <h2 className="text-3xl font-bold text-accent mt-2">
              ₹{todaySales}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <p className="text-sm text-muted">Total Bills</p>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {totalBills}
            </h2>
          </div>
        </div>

        {/* Info */}
        <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            Store Overview
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            This dashboard shows real-time inventory status, sales performance,
            and billing activity for Bellundagi Medicals.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
