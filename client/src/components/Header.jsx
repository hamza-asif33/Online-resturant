// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Online Restaurant</h1>

      <nav>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="mr-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
