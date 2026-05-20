import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, LogOut, Package, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { fetchCategories } from '../../services/api';
import '../../styles/navbar.css';

const logo = '/assets/logo.png';

export default function Navbar() {
  const { currentUser, logout, displayName, isCustomer, isSeller, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) { console.error(err); }
    };
    loadCategories();
  }, []);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) { navigate(`/shop?search=${encodeURIComponent(searchVal)}`); setSearchVal(''); }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const initials = displayName ? displayName.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase() : '?';

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="Dressora Logo" style={{ height: 64 }} />
          </Link>

          {/* Desktop Links */}
          <ul className="navbar-links">
            <li><Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link></li>
            <li><Link to="/shop" className={`nav-link ${isActive('/shop')}`}>Shop</Link></li>
            <li className="nav-dropdown">
              <span className="nav-link" style={{cursor:'pointer'}}>Categories ▾</span>
              <div className="nav-dropdown-menu">
                {categories.map(cat => (
                  <Link key={cat.categoryID} to={`/shop?category=${cat.categoryID}`} className="nav-dropdown-item">
                    <span>{cat.icon}</span> {cat.categoryName}
                  </Link>
                ))}
              </div>
            </li>
          </ul>

          {/* Search */}
          <form className="navbar-search" onSubmit={handleSearch}>
            <Search size={14} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
          </form>

          {/* Actions */}
          <div className="navbar-actions">
            <button className="nav-action-btn" onClick={() => navigate('/cart')} title="Cart">
              <ShoppingCart size={20} />
              {itemCount > 0 && <span className="badge-dot">{itemCount}</span>}
            </button>

            {currentUser ? (
              <div className="user-menu">
                <div className="user-avatar">{initials}</div>
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <div className="name">{displayName}</div>
                    <div className="role">{currentUser.userType}</div>
                  </div>
                  <div className="user-dropdown-body">
                    {isCustomer && <>
                      <Link to="/account/profile" className="user-dropdown-item"><User size={14} /> My Profile</Link>
                      <Link to="/account/orders" className="user-dropdown-item"><Package size={14} /> My Orders</Link>
                    </>}
                    {isSeller && <>
                      <Link to="/seller" className="user-dropdown-item"><LayoutDashboard size={14} /> Seller Dashboard</Link>
                      <Link to="/seller/products" className="user-dropdown-item"><Package size={14} /> My Products</Link>
                    </>}
                    {isAdmin && <>
                      <Link to="/admin" className="user-dropdown-item"><LayoutDashboard size={14} /> Admin Panel</Link>
                    </>}
                    <div className="user-dropdown-divider" />
                    <button className="btn btn-outline btn-sm user-dropdown-item danger" onClick={handleLogout} style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 12px' }}>
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">Sign In</Link>
            )}

            {/* Mobile Toggle */}
            <button className="mobile-toggle nav-action-btn" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <form onSubmit={handleSearch} style={{display:'flex',gap:8,marginBottom:16}}>
          <input className="form-control" placeholder="Search..." value={searchVal} onChange={e=>setSearchVal(e.target.value)} />
          <button className="btn btn-primary btn-sm" type="submit"><Search size={14}/></button>
        </form>
        <Link to="/" className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>Home</Link>
        <Link to="/shop" className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>Shop</Link>
        {categories.map(cat => (
          <Link key={cat.categoryID} to={`/shop?category=${cat.categoryID}`} className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>
            {cat.categoryName}
          </Link>
        ))}
        <Link to="/cart" className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>Cart ({itemCount})</Link>
        {currentUser ? (
          <>
            {isCustomer && <Link to="/account/profile" className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>My Account</Link>}
            {isSeller   && <Link to="/seller" className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>Seller Panel</Link>}
            {isAdmin    && <Link to="/admin"  className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>Admin Panel</Link>}
            <button className="mobile-nav-link" style={{border:'none',background:'none',width:'100%',textAlign:'left',color:'#c0143c'}} onClick={()=>{handleLogout();setMobileOpen(false);}}>Sign Out</button>
          </>
        ) : (
          <Link to="/login" className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>Sign In</Link>
        )}
      </div>
    </>
  );
}
