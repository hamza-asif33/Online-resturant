import { useState, useEffect } from "react";

export default function useCart() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addItem = (menuItem, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === menuItem._id);
      if (existing) {
        return prev.map((item) =>
          item._id === menuItem._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...menuItem, quantity }];
    });
  };

  // Remove one item completely
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // Clear cart
  const clearCart = () => setCart([]);

  return { cart, addItem, removeItem, clearCart };
}
