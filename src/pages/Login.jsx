import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#020617] to-black">
      {/* CENTER CONTENT */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#0b1220]/90 backdrop-blur rounded-2xl shadow-2xl border border-gray-800 p-6 sm:p-8">
          {/* BRAND */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-white tracking-wide">
            BELLUNDAGI MEDICALS
          </h1>

          <p className="text-sm text-center text-gray-400 mt-1">
            Admin Login
          </p>

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-md bg-[#020617] border border-gray-700 px-3 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-md bg-[#020617] border border-gray-700 px-3 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* FOOT NOTE */}
          <p className="text-xs text-center text-gray-500 mt-6">
            Secure admin access only
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Login;
