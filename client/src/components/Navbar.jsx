// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-red-500 text-white p-4 flex justify-between items-center shadow flex-wrap">
      {/* Logo / Home */}
      <Link
        to={user?.role === "admin" ? "/admin/dashboard" : "/menu"}
        className="text-2xl font-bold hover:text-gray-200"
      >
        RestaurantApp
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-3 mt-2 sm:mt-0">
        {user ? (
          <>
            {/* Links based on role */}
            {user.role === "customer" && (
              <>
                <Link
                  to="/menu"
                  className="bg-white text-red-500 px-3 py-1 rounded hover:bg-gray-100 transition"
                >
                  Menu
                </Link>
                <Link
                  to="/checkout"
                  className="bg-white text-red-500 px-3 py-1 rounded hover:bg-gray-100 transition"
                >
                  Checkout
                </Link>
                <Link
                  to="/orders"   
                  className="bg-white text-red-500 px-3 py-1 rounded hover:bg-gray-100 transition"
                >
                  My Orders
                </Link>
              </>
            )}

            {user.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="bg-white text-red-500 px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                Dashboard
              </Link>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-white text-red-500 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-red-500 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-red-500 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
