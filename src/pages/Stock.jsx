import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Stock() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [mrp, setMrp] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minStock, setMinStock] = useState("");

  const fetchMedicines = async () => {
    try {
      const res = await api.get("/medicines");
      setMedicines(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      await api.post("/medicines", {
        name,
        company,
        expiryDate,
        mrp: Number(mrp),
        quantity: Number(quantity),
        minStock: Number(minStock),
      });

      setName("");
      setCompany("");
      setExpiryDate("");
      setMrp("");
      setQuantity("");
      setMinStock("");

      fetchMedicines();
    } catch {
      alert("Failed to add medicine");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;
    try {
      await api.delete(`/medicines/${id}`);
      fetchMedicines();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-semibold text-slate-800">
          Stock Management
        </h1>

        {/* Add Medicine Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Add Medicine
          </h2>

          <form
            onSubmit={handleAddMedicine}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              className="border rounded-md px-3 py-2"
              placeholder="Medicine Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="border rounded-md px-3 py-2"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <input
              type="date"
              className="border rounded-md px-3 py-2"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
            <input
              type="number"
              className="border rounded-md px-3 py-2"
              placeholder="MRP"
              value={mrp}
              onChange={(e) => setMrp(e.target.value)}
              required
            />
            <input
              type="number"
              className="border rounded-md px-3 py-2"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <input
              type="number"
              className="border rounded-md px-3 py-2"
              placeholder="Min Stock"
              value={minStock}
              onChange={(e) => setMinStock(e.target.value)}
              required
            />

            <button className="md:col-span-3 bg-accent text-white py-2 rounded-md hover:bg-blue-700 transition">
              Add Medicine
            </button>
          </form>
        </div>

        {/* Stock Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 border-b">
            <h2 className="text-lg font-semibold text-slate-800">
              Current Stock
            </h2>
          </div>

          {loading ? (
            <p className="p-5 text-muted">Loading medicines…</p>
          ) : medicines.length === 0 ? (
            <p className="p-5 text-muted">No medicines found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Company</th>
                    <th className="px-4 py-3 text-left">Expiry</th>
                    <th className="px-4 py-3 text-right">MRP</th>
                    <th className="px-4 py-3 text-right">Qty</th>
                    <th className="px-4 py-3 text-right">Min</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((m) => {
                    const low = m.quantity <= m.minStock;
                    return (
                      <tr
                        key={m._id}
                        className={`border-t ${
                          low ? "bg-red-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-3 font-medium">
                          {m.name}
                        </td>
                        <td className="px-4 py-3">{m.company}</td>
                        <td className="px-4 py-3">
                          {new Date(m.expiryDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          ₹{m.mrp}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {m.quantity}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {m.minStock}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleDelete(m._id)}
                            className="text-danger hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stock;
