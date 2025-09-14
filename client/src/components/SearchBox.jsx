import React from "react";

export default function SearchBox({ query, setQuery }) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search menu..."
      className="w-full sm:w-auto p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  );
}
