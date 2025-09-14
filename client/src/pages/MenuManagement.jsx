import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function MenuManagement() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "Pizza",
  });

  const categories = ["Pizza", "Burger", "Drinks", "Snacks"];

  
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await api.get("/menu/items");
      setItems(res.data.items);
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };

  
  const handleAddItem = async () => {
    try {
      const res = await api.post("/menu", newItem);
      setItems([...items, res.data]); 
      setNewItem({ name: "", description: "", price: "", category: "Pizza" });
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await api.delete(`/menu/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  
  const handleUpdate = async (item) => {
    const newName = prompt("Enter new name", item.name);
    const newPrice = prompt("Enter new price", item.price);
    const newDesc = prompt("Enter new description", item.description);
    const newCategory = prompt(
      `Enter new category (${categories.join(", ")})`,
      item.category
    );

    if (!newName || !newPrice || !categories.includes(newCategory)) return;

    try {
      const res = await api.put(`/menu/${item._id}`, {
        name: newName,
        price: newPrice,
        description: newDesc,
        category: newCategory,
      });

      setItems(items.map((i) => (i._id === item._id ? res.data : i)));
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">🍔 Menu Management</h1>

      {/* Add Item Form */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Add New Item</h2>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border p-2 rounded w-40"
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            className="border p-2 rounded w-40"
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) =>
              setNewItem({ ...newItem, price: e.target.value })
            }
            className="border p-2 rounded w-32"
          />
          <select
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
            className="border p-2 rounded w-32"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddItem}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Menu List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item._id} className="p-4 border rounded shadow bg-white">
            <h2 className="font-bold">{item.name}</h2>
            <p>{item.description}</p>
            <p className="text-green-600">Rs {item.price}</p>
            <p className="text-sm text-gray-500">{item.category}</p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleUpdate(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
