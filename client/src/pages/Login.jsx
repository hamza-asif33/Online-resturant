import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", { email, password });

    // save token + user
    login(res.data.token, {
      _id: res.data.user._id,      // ✅ corrected from id to _id
      name: res.data.user.name,
      email: res.data.user.email,
      role: res.data.user.role,
    });

    // role-based redirect
    if (res.data.user.role === "admin") navigate("/admin/dashboard");
    else navigate("/menu");
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Login failed");
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
