import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, removeItem, clearCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 border rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-2">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item._id} className="mb-2 flex justify-between items-center">
                <span>{item.name} x {item.quantity}</span>
                <div className="flex items-center gap-2">
                  <span>Rs {item.price * item.quantity}</span>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="font-bold mt-2">Total: Rs {total}</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={clearCart}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
            >
              Clear Cart
            </button>
            <Link
              to="/checkout"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
