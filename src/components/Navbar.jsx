import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-slate-800 text-white"
      : "text-slate-300 hover:bg-slate-800 hover:text-white";

  return (
    <div className="bg-primary text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Left: Brand */}
      <div
        className="text-lg font-semibold tracking-wide cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        BELLUNDAGI MEDICALS
      </div>

      {/* Right: Navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/dashboard")}
          className={`px-4 py-2 rounded-md text-sm transition ${isActive(
            "/dashboard"
          )}`}
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/stock")}
          className={`px-4 py-2 rounded-md text-sm transition ${isActive(
            "/stock"
          )}`}
        >
          Stock
        </button>

        <button
          onClick={() => navigate("/billing")}
          className={`px-4 py-2 rounded-md text-sm transition ${isActive(
            "/billing"
          )}`}
        >
          Billing
        </button>

        <button
          onClick={() => navigate("/orders")}
          className={`px-4 py-2 rounded-md text-sm transition ${isActive(
            "/orders"
          )}`}
        >
          Orders
        </button>
        <button
  onClick={() => navigate("/analytics")}
  className={`px-4 py-2 rounded-md text-sm transition ${isActive(
    "/analytics"
  )}`}
>
  Analytics
</button>


        <button
          onClick={logoutHandler}
          className="ml-2 px-4 py-2 rounded-md text-sm bg-danger hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
