import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-white border-b-2 border-blue-500"
      : "text-gray-300 hover:text-white";

  const navItem =
    "px-3 py-2 text-sm font-medium transition duration-200";

  return (
    <nav className="bg-[#1f1f1f] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          {/* LOGO / BRAND */}
          <div
            className="text-white font-semibold text-lg cursor-pointer tracking-wide"
            onClick={() => navigate("/dashboard")}
          >
            BELLUNDAGI MEDICALS
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className={`${navItem} ${isActive("/dashboard")}`}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`${navItem} ${isActive("/stock")}`}
              onClick={() => navigate("/stock")}
            >
              Stock
            </button>
            <button
              className={`${navItem} ${isActive("/billing")}`}
              onClick={() => navigate("/billing")}
            >
              Billing
            </button>
            <button
              className={`${navItem} ${isActive("/orders")}`}
              onClick={() => navigate("/orders")}
            >
              Orders
            </button>
            <button
              className={`${navItem} ${isActive("/analytics")}`}
              onClick={() => navigate("/analytics")}
            >
              Analytics
            </button>

            <button
              onClick={logoutHandler}
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#1f1f1f] border-t border-gray-700 px-4 pb-4 space-y-2">
          <button
            className="block w-full text-left text-gray-300 hover:text-white py-2"
            onClick={() => {
              navigate("/dashboard");
              setOpen(false);
            }}
          >
            Dashboard
          </button>
          <button
            className="block w-full text-left text-gray-300 hover:text-white py-2"
            onClick={() => {
              navigate("/stock");
              setOpen(false);
            }}
          >
            Stock
          </button>
          <button
            className="block w-full text-left text-gray-300 hover:text-white py-2"
            onClick={() => {
              navigate("/billing");
              setOpen(false);
            }}
          >
            Billing
          </button>
          <button
            className="block w-full text-left text-gray-300 hover:text-white py-2"
            onClick={() => {
              navigate("/orders");
              setOpen(false);
            }}
          >
            Orders
          </button>
          <button
            className="block w-full text-left text-gray-300 hover:text-white py-2"
            onClick={() => {
              navigate("/analytics");
              setOpen(false);
            }}
          >
            Analytics
          </button>

          <button
            onClick={() => {
              logoutHandler();
              setOpen(false);
            }}
            className="block w-full text-left text-red-400 hover:text-red-500 py-2"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
