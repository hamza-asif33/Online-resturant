// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats"); // token automatically sent
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };
  fetchStats();
}, []);


  if (loading) return <p className="p-8">Loading stats...</p>;
  if (error)
    return (
      <p className="p-8 text-red-600 font-semibold">
        {error} <br /> Please login as Admin.
      </p>
    );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome, Admin 
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-2xl font-bold text-green-600">
            Rs {stats.totalRevenue}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-xl font-semibold">Customers</h2>
          <p className="text-2xl font-bold text-purple-600">{stats.totalCustomers}</p>
        </div>
      </div>

      {/* Menu Management */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">🍔 Menu Management</h2>
        <button
          onClick={() => (window.location.href = "/admin/menu")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add New Item
        </button>
      </div>

      {/* Order Management */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">📦 Order Management</h2>
        <button
          onClick={() => (window.location.href = "/admin/orders")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          View Orders
        </button>
      </div>
    </div>
  );
}
