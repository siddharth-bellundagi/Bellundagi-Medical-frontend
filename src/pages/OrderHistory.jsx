import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function OrderHistory() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState(null);

  // Daily print states
  const [printDate, setPrintDate] = useState("");
  const [printBills, setPrintBills] = useState([]);
  const [printMode, setPrintMode] = useState(false);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await api.get("/bills");
        setBills(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  const deleteBill = async (id) => {
    if (!window.confirm("Delete this bill?")) return;
    try {
      await api.delete(`/bills/${id}`);
      setBills(bills.filter((b) => b._id !== id));
      setSelectedBill(null);
    } catch {
      alert("Failed to delete bill");
    }
  };

  const printSingleBill = () => {
    window.print();
  };

  const printBillsByDate = () => {
    if (!printDate) {
      alert("Please select a date");
      return;
    }

    const filtered = bills.filter(
      (b) =>
        new Date(b.createdAt).toISOString().slice(0, 10) === printDate
    );

    if (filtered.length === 0) {
      alert("No bills found for selected date");
      return;
    }

    setPrintBills(filtered);
    setPrintMode(true);

    setTimeout(() => {
      window.print();
      setPrintMode(false);
    }, 300);
  };

  const dateGrandTotal = printBills.reduce(
    (sum, bill) => sum + bill.totalAmount,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Order History
        </h1>

        {/* ===== TOP ACTIONS ===== */}
        <div className="flex flex-wrap gap-3 items-end print:hidden">
          <input
            type="date"
            className="border rounded-md px-3 py-2"
            value={printDate}
            onChange={(e) => setPrintDate(e.target.value)}
          />

          <button
            onClick={printBillsByDate}
            className="bg-accent text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Print Bills of Date (PDF)
          </button>
        </div>

        {/* ===== BILLS TABLE ===== */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 border-b">
            <h2 className="text-lg font-semibold">Bills</h2>
          </div>

          {loading ? (
            <p className="p-5 text-muted">Loading bills…</p>
          ) : bills.length === 0 ? (
            <p className="p-5 text-muted">No bills found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Bill No</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-right">Items</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((bill) => (
                    <tr
                      key={bill._id}
                      className="border-t hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedBill(bill)}
                    >
                      <td className="px-4 py-3 font-medium">
                        {bill.billNumber}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(bill.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {bill.items.length}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        ₹{bill.totalAmount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ===== SINGLE BILL VIEW ===== */}
        {selectedBill && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 print:border-none print:shadow-none">
            <h2 className="text-xl font-semibold text-center mb-4">
              BELLUNDAGI MEDICALS
            </h2>

            <p><strong>Bill No:</strong> {selectedBill.billNumber}</p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedBill.createdAt).toLocaleString()}
            </p>

            <table className="w-full border mt-4 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left">Medicine</th>
                  <th className="border px-3 py-2 text-right">Qty</th>
                  <th className="border px-3 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedBill.items.map((item, i) => (
                  <tr key={i}>
                    <td className="border px-3 py-2">{item.name}</td>
                    <td className="border px-3 py-2 text-right">
                      {item.quantity}
                    </td>
                    <td className="border px-3 py-2 text-right">
                      ₹{item.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-3">
              <strong>Total:</strong> ₹{selectedBill.totalAmount}
            </p>

            <div className="mt-4 flex gap-3 print:hidden">
              <button
                onClick={printSingleBill}
                className="bg-accent text-white px-4 py-2 rounded-md"
              >
                Print Bill
              </button>

              <button
                onClick={() => deleteBill(selectedBill._id)}
                className="border border-red-300 text-danger px-4 py-2 rounded-md"
              >
                Delete Bill
              </button>
            </div>
          </div>
        )}

        {/* ===== DAILY PRINT MODE ===== */}
        {printMode && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-center mb-6">
              BELLUNDAGI MEDICALS – DAILY BILL REPORT
            </h2>

            <p className="mb-4 text-center">
              <strong>Date:</strong> {printDate}
            </p>

            {printBills.map((bill) => (
              <div key={bill._id} className="mb-6 border-b pb-4">
                <p><strong>Bill No:</strong> {bill.billNumber}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(bill.createdAt).toLocaleString()}
                </p>

                <table border="1" cellPadding="8" width="100%">
                  <thead>
                    <tr>
                      <th align="left">Medicine</th>
                      <th align="right">Qty</th>
                      <th align="right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bill.items.map((item, i) => (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td align="right">{item.quantity}</td>
                        <td align="right">₹{item.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="mt-2">
                  <strong>Bill Total:</strong> ₹{bill.totalAmount}
                </p>
              </div>
            ))}

            <h3 className="text-lg font-semibold text-right mt-6">
              GRAND TOTAL: ₹{dateGrandTotal}
            </h3>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default OrderHistory;
