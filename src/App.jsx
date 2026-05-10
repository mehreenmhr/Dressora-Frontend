import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import './styles/index.css';
import './styles/navbar.css';
import './styles/home.css';
import './styles/shop.css';
import './styles/cart.css';
import './styles/checkout.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/components.css';
import './styles/pages.css';

// Hide navbar/footer on auth pages and dashboard pages
function Layout() {
  const location = useLocation();
  const noLayout = ['/login', '/register'].includes(location.pathname);
  const isDashboard = location.pathname.startsWith('/seller') || location.pathname.startsWith('/admin');

  return (
    <>
      {!noLayout && !isDashboard && <Navbar />}
      <AppRoutes />
      {!noLayout && !isDashboard && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
