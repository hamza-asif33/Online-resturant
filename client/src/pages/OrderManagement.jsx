import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/admin/orders"); // ✅ Correct endpoint
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await api.patch(`/admin/orders/${id}/status`, { status });
      setOrders(orders.map((o) => (o._id === id ? res.data : o)));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📦 Order Management</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="p-4 bg-white rounded shadow">
              <h2 className="font-bold">Order #{order._id}</h2>
              <p>Customer: {order.user?.name} ({order.user?.email})</p>
              <p>Status: {order.status}</p>
              <p>Total: Rs {order.totalPrice}</p>
              <div className="mt-2">
                {["pending","preparing","ready","delivered"].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(order._id, s)}
                    className={`px-2 py-1 mr-2 rounded ${
                      order.status === s ? "bg-green-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
