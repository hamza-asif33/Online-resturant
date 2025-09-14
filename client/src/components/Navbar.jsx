import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-red-500 text-white p-4 shadow relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to={user?.role === "admin" ? "/admin/dashboard" : "/menu"}
          className="text-2xl font-bold hover:text-gray-200"
        >
          RestaurantApp
        </Link>

        {/* Hamburger for Mobile */}
        <button
          className={`sm:hidden block focus:outline-none p-2 rounded-full transition-colors duration-300 ${
            isOpen ? "bg-white text-red-500" : "text-white"
          }`}
          onClick={() => setIsOpen(true)}
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-3">
          {user ? (
            <>
              {user.role === "customer" && (
                <>
                  <Link to="/menu" className="hover:underline">
                    Menu
                  </Link>
                  <Link to="/checkout" className="hover:underline">
                    Checkout
                  </Link>
                  <Link to="/orders" className="hover:underline">
                    My Orders
                  </Link>
                </>
              )}
              {user.role === "admin" && (
                <Link to="/admin/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              )}
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 left-0 w-64 h-full bg-white text-red-500 z-50 p-6 transform transition-transform duration-300 ease-in-out shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">RestaurantApp</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {user ? (
                <>
                  {user.role === "customer" && (
                    <>
                      <Link
                        to="/menu"
                        onClick={() => setIsOpen(false)}
                        className="hover:underline"
                      >
                        Menu
                      </Link>
                      <Link
                        to="/checkout"
                        onClick={() => setIsOpen(false)}
                        className="hover:underline"
                      >
                        Checkout
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setIsOpen(false)}
                        className="hover:underline"
                      >
                        My Orders
                      </Link>
                    </>
                  )}
                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="hover:underline"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="hover:underline text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
