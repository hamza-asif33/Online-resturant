import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    if (!cart.length) return alert("Your cart is empty!");
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ items: cart, total }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Order failed");
      alert("Order placed successfully!");
      clearCart();
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>Rs {item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <p className="font-bold mb-4">Total: Rs {total}</p>
          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            {loading ? "Placing..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
}
