import React from "react";

const categories = ["All", "Pizza", "Burger", "Drinks", "Snacks"];

export default function CategoryTabs({ category, setCategory }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 my-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat === "All" ? "" : cat)}
          className={`px-4 py-1 rounded border ${
            category === cat
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-red-500 border-red-500"
          } hover:bg-red-500 hover:text-white transition`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
