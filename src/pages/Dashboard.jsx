import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Dashboard() {
  const [totalMedicines, setTotalMedicines] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [todaySales, setTodaySales] = useState(0);
  const [totalBills, setTotalBills] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const medRes = await api.get("/medicines");
        setTotalMedicines(medRes.data.length);

        const lowStockRes = await api.get("/medicines/low-stock");
        setLowStockCount(lowStockRes.data.length);

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

      {/* MAIN CONTENT */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-6">
          Dashboard
        </h1>

        {/* RESPONSIVE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 border border-gray-200">
            <p className="text-sm text-gray-500">Total Medicines</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2">
              {totalMedicines}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 border border-gray-200">
            <p className="text-sm text-gray-500">Low Stock Items</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-red-500 mt-2">
              {lowStockCount}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 border border-gray-200">
            <p className="text-sm text-gray-500">Today’s Sales</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">
              ₹{todaySales}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 border border-gray-200">
            <p className="text-sm text-gray-500">Total Bills</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2">
              {totalBills}
            </h2>
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="mt-8 sm:mt-10 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">
            Store Overview
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            This dashboard shows real-time inventory status, sales performance,
            and billing activity for Bellundagi Medicals.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
