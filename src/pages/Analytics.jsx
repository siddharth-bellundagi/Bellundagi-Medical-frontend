import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Analytics() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalSales, setTotalSales] = useState(0);
  const [totalBills, setTotalBills] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async () => {
    if (!startDate || !endDate) {
      alert("Please select both dates");
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(
        `/analytics/summary?startDate=${startDate}&endDate=${endDate}`
      );

      setTotalSales(res.data.totalSales);
      setTotalBills(res.data.totalBills);
    } catch (error) {
      alert("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
          Analytics
        </h1>

        {/* DATE FILTER */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold mb-4">
            Select Date Range
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
            <div className="w-full sm:w-auto">
              <label className="block text-sm text-gray-600 mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="border rounded-md px-3 py-2 w-full"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="w-full sm:w-auto">
              <label className="block text-sm text-gray-600 mb-1">
                End Date
              </label>
              <input
                type="date"
                className="border rounded-md px-3 py-2 w-full"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <button
              onClick={fetchAnalytics}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
            >
              {loading ? "Loading..." : "View Report"}
            </button>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Total Sales</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">
              ₹{totalSales}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Total Bills</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2">
              {totalBills}
            </h2>
          </div>
        </div>

        {/* INFO NOTE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            This analytics section provides a summary of total sales and
            billing activity for the selected date range. These numbers
            are calculated from real billing data and are used for
            daily and monthly business analysis.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Analytics;
