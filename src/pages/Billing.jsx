import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Billing() {
  const [medicines, setMedicines] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMedicines = async () => {
      const res = await api.get("/medicines");
      setMedicines(res.data);
    };
    fetchMedicines();
  }, []);

  const addItem = (medicine) => {
    const exists = selectedItems.find(
      (item) => item.medicineId === medicine._id
    );

    if (exists) {
      setSelectedItems(
        selectedItems.map((item) =>
          item.medicineId === medicine._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedItems([
        ...selectedItems,
        {
          medicineId: medicine._id,
          name: medicine.name,
          mrp: medicine.mrp,
          quantity: 1,
        },
      ]);
    }
  };

  const updateQty = (index, qty) => {
    const updated = [...selectedItems];
    updated[index].quantity = Number(qty);
    setSelectedItems(updated);
  };

  const removeItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.mrp * item.quantity,
    0
  );

  const total = subtotal - discount;

  const createBill = async () => {
    try {
      const items = selectedItems.map((item) => ({
        medicineId: item.medicineId,
        quantity: item.quantity,
      }));

      await api.post("/bills", { items, discount });

      setSelectedItems([]);
      setDiscount(0);
      alert("Bill created successfully");
    } catch {
      alert("Failed to create bill");
    }
  };

  // 🔍 Filter medicines by search
  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-6">
          Billing
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: MEDICINES */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-3">
              Medicines
            </h2>

            {/* 🔍 SEARCH BAR */}
            <input
              type="text"
              placeholder="Search medicine..."
              className="w-full mb-4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredMedicines.length === 0 ? (
                <p className="text-gray-500 text-sm col-span-full">
                  No medicine found
                </p>
              ) : (
                filteredMedicines.map((med) => (
                  <button
                    key={med._id}
                    onClick={() => addItem(med)}
                    className="
                      rounded-xl p-3 text-left text-white
                      bg-gradient-to-br from-blue-600 to-cyan-500
                      hover:from-blue-700 hover:to-cyan-600
                      transition shadow-md
                    "
                  >
                    <p className="font-semibold text-sm sm:text-base">
                      {med.name}
                    </p>
                    <p className="text-xs sm:text-sm opacity-90">
                      ₹{med.mrp}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* RIGHT: BILL */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-4">
              Current Bill
            </h2>

            {selectedItems.length === 0 ? (
              <p className="text-gray-500 text-sm">No items added</p>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {selectedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border rounded-md p-2"
                  >
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">₹{item.mrp}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        className="w-14 border rounded px-2 py-1 text-sm"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQty(index, e.target.value)
                        }
                      />
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-600 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TOTALS */}
            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Discount</span>
                <input
                  type="number"
                  className="w-20 border rounded px-2 py-1 text-sm"
                  value={discount}
                  onChange={(e) =>
                    setDiscount(Number(e.target.value))
                  }
                />
              </div>

              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                disabled={selectedItems.length === 0}
                onClick={createBill}
                className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                Create Bill
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Billing;
