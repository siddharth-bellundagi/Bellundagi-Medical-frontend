import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Billing() {
  const [medicines, setMedicines] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [discount, setDiscount] = useState(0);

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Medicines */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Medicines
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {medicines.map((med) => (
              <button
                key={med._id}
                onClick={() => addItem(med)}
                className="border rounded-lg p-3 text-left hover:bg-gray-50 transition"
              >
                <p className="font-medium">{med.name}</p>
                <p className="text-sm text-muted">₹{med.mrp}</p>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Bill */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Current Bill
          </h2>

          {selectedItems.length === 0 ? (
            <p className="text-muted">No items added</p>
          ) : (
            <div className="space-y-3">
              {selectedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border rounded-md p-2"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted">₹{item.mrp}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      className="w-16 border rounded px-2 py-1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQty(index, e.target.value)
                      }
                    />
                    <button
                      onClick={() => removeItem(index)}
                      className="text-danger text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Totals */}
          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span>Discount</span>
              <input
                type="number"
                className="w-24 border rounded px-2 py-1"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              disabled={selectedItems.length === 0}
              onClick={createBill}
              className="w-full mt-3 bg-accent text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              Create Bill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
