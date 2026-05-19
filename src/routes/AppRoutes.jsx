import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Home           from '../pages/Home';
import Shop           from '../pages/Shop';
import ProductDetail  from '../pages/ProductDetail';
import Cart           from '../pages/Cart';
import Checkout       from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';
import Login          from '../pages/auth/Login';
import Register       from '../pages/auth/Register';

import { Profile, Orders, OrderDetail, Addresses } from '../pages/customer/CustomerPages';
import { SellerProducts, SellerOrders } from '../pages/seller/SellerPages';
import { AdminUsers, AdminProducts, AdminOrders, AdminCoupons } from '../pages/admin/AdminPages';

// Route guards
function RequireAuth({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
}

function RequireSeller({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.userType !== 'seller') return <Navigate to="/" replace />;
  return children;
}

function RequireAdmin({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.userType !== 'admin') return <Navigate to="/" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"         element={<Home />} />
      <Route path="/shop"     element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart"     element={<Cart />} />
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected — any logged in user */}
      <Route path="/checkout"          element={<RequireAuth><Checkout /></RequireAuth>} />
      <Route path="/order-confirmation" element={<RequireAuth><OrderConfirmation /></RequireAuth>} />

      {/* Customer */}
      <Route path="/account/profile"       element={<RequireAuth><Profile /></RequireAuth>} />
      <Route path="/account/orders"        element={<RequireAuth><Orders /></RequireAuth>} />
      <Route path="/account/orders/:id"    element={<RequireAuth><OrderDetail /></RequireAuth>} />
      <Route path="/account/addresses"     element={<RequireAuth><Addresses /></RequireAuth>} />

      {/* Seller */}
      <Route path="/seller"          element={<RequireSeller><Navigate to="/seller/orders" replace /></RequireSeller>} />
      <Route path="/seller/products" element={<RequireSeller><SellerProducts /></RequireSeller>} />
      <Route path="/seller/orders"   element={<RequireSeller><SellerOrders /></RequireSeller>} />

      {/* Admin */}
        <Route path="/admin"              element={<RequireAdmin><Navigate to="/admin/users" replace /></RequireAdmin>} />
      <Route path="/admin/users"        element={<RequireAdmin><AdminUsers /></RequireAdmin>} />
      <Route path="/admin/products"     element={<RequireAdmin><AdminProducts /></RequireAdmin>} />
      <Route path="/admin/orders"       element={<RequireAdmin><AdminOrders /></RequireAdmin>} />
      <Route path="/admin/coupons"      element={<RequireAdmin><AdminCoupons /></RequireAdmin>} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
