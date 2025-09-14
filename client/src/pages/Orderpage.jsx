import React, { useEffect, useState } from "react";
import { api } from "../api/axios";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState(null);
  const { user } = useAuth();

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/user", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      setToast({ message: "Failed to load orders", type: "error" });
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const handleCancel = async (orderId) => {
    try {
      const res = await api.patch(
        `/orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setToast({ message: res.data.message, type: "success" });
      fetchOrders();
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Cancel failed",
        type: "error",
      });
    }
  };

  const activeOrders = orders.filter((o) => o.status !== "cancelled");
  const pastOrders = orders.filter((o) => o.status === "cancelled");

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">My Orders</h1>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Active Orders */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Active Orders</h2>
        {activeOrders.length === 0 ? (
          <p className="text-gray-600">No active orders.</p>
        ) : (
          <ul className="space-y-4">
            {activeOrders.map((order) => (
              <li
                key={order._id}
                className="border p-4 rounded shadow overflow-x-auto"
              >
                <p className="font-semibold">Order ID: {order._id}</p>
                <p>Status: <span className="capitalize">{order.status}</span></p>
                <p>Total: Rs {order.totalPrice}</p>

                <div className="mt-2">
                  <h4 className="font-semibold">Items:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {order.items.map((i, idx) => (
                      <li key={idx}>
                        {i.menu?.name} × {i.quantity} (Rs {i.menu?.price})
                      </li>
                    ))}
                  </ul>
                </div>

                {order.status === "pending" && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Cancel Order
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Past Orders */}
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Past Orders</h2>
        {pastOrders.length === 0 ? (
          <p className="text-gray-600">No past orders.</p>
        ) : (
          <ul className="space-y-4">
            {pastOrders.map((order) => (
              <li
                key={order._id}
                className="border p-4 rounded shadow bg-gray-100 overflow-x-auto"
              >
                <p className="font-semibold">Order ID: {order._id}</p>
                <p>Status: <span className="capitalize">{order.status}</span></p>
                <p>Total: Rs {order.totalPrice}</p>

                <div className="mt-2">
                  <h4 className="font-semibold">Items:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {order.items.map((i, idx) => (
                      <li key={idx}>
                        {i.menu?.name} × {i.quantity} (Rs {i.menu?.price})
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
