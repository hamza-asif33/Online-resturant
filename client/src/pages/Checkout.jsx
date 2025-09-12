import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      if (!user || !user.token) {
        alert("⚠️ Please login first!");
        navigate("/login");
        return;
      }

      setLoading(true);

      const items = cart.map(item => ({
        menu: item._id, // backend ko menuId chahiye
        quantity: item.quantity || 1
      }));

      const res = await api.post(
        "/orders",
        { items, totalPrice: total },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      alert("✅ Order placed successfully!");
      clearCart();

      // ✅ Redirect to Orders page for tracking
      navigate("/orders");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0)
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Your cart is empty!
      </p>
    );

  return (
    <div className="checkout max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <ul className="mb-4">
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - Rs {item.price} × {item.quantity || 1}
          </li>
        ))}
      </ul>

      <h3 className="font-bold mb-4">Total: Rs {total}</h3>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
