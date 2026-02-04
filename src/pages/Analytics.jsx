import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Footer from "../components/Footer";


function Analytics() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [summary, setSummary] = useState(null);
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
      setSummary(res.data);
    } catch (err) {
      alert("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Sales Analytics
        </h1>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-wrap gap-4 items-end">
          <div>
            <label className="text-sm text-muted">Start Date</label>
            <input
              type="date"
              className="block border rounded-md px-3 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-muted">End Date</label>
            <input
              type="date"
              className="block border rounded-md px-3 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <button
            onClick={fetchAnalytics}
            className="bg-accent text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            View Summary
          </button>
        </div>

        {/* Summary Cards */}
        {loading ? (
          <p className="text-muted">Loading analytics…</p>
        ) : summary ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-sm text-muted">Total Sales</p>
              <h2 className="text-3xl font-bold text-accent mt-2">
                ₹{summary.totalSales}
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-sm text-muted">Total Bills</p>
              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {summary.totalBills}
              </h2>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-muted">
              Select a date range to view sales summary.
            </p>
          </div>
        )}

        {/* Info Note */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-sm text-muted">
          Detailed date-wise charts can be enabled in future versions.
        </div>
      </div>
        <Footer />
    </div>
  );
}

export default Analytics;
