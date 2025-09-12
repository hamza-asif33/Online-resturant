import React, { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import CategoryTabs from "../components/CategoryTabs";
import Pagination from "../components/Pagination";
import Toast from "../components/Toast";
import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);

  const { cart, addItem, removeItem, clearCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/items`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setMenuItems(data.items || []);
      } catch (err) {
        setToast({ message: "Failed to fetch menu", type: "error" });
      }
    };
    fetchMenu();
  }, []);

  const handleAddItem = (item) => {
    addItem(item, 1);
    setToast({ message: `${item.name} added to cart`, type: "success" });
  };

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category ? item.category === category : true)
  );

  const itemsPerPage = 5;
  const start = (page - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(start, start + itemsPerPage);

  // ✅ Fix: never let totalPages be less than 1
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h1 className="text-2xl font-bold mb-4">Menu</h1>

      <SearchBox query={search} setQuery={setSearch} />
      <CategoryTabs category={category} setCategory={setCategory} />

      <ul className="mt-4">
        {paginatedItems.map((item) => (
          <li
            key={item._id}
            className="border rounded p-3 mb-2 shadow hover:bg-gray-50 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="font-bold">Price: Rs {item.price}</p>
            </div>
            <button
              onClick={() => handleAddItem(item)}
              className="bg-blue-500 text-white px-2 py-1 mt-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      <Cart cart={cart} removeItem={removeItem} clearCart={clearCart} />
    </div>
  );
}
