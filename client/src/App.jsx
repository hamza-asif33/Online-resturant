import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrdersPage from "./pages/Orderpage.jsx"; // ✅ add this import
import AdminDashboard from "./pages/AdminDashboard.jsx";
import MenuManagement from "./pages/MenuManagement.jsx";
import OrderManagement from "./pages/OrderManagement.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/menu" replace />} />

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Customer routes */}
            <Route
              path="/menu"
              element={
                <ProtectedRoute role="customer">
                  <MenuPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute role="customer">
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"   // ✅ customer order tracking page
              element={
                <ProtectedRoute role="customer">
                  <OrdersPage />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/menu"
              element={
                <ProtectedRoute role="admin">
                  <MenuManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute role="admin">
                  <OrderManagement />
                </ProtectedRoute>
              }
            />

            {/* Default fallback */}
            <Route path="*" element={<Navigate to="/menu" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

