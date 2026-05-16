import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Package, ShoppingBag, Tag, BarChart2, Plus, Edit2, Trash2, ToggleLeft, ToggleRight, LogOut, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchProducts, fetchCategories, fetchUsers } from '../../services/api';
import { formatPrice, orders, customers, coupons } from '../../data/mockData';
import '../../styles/pages.css';

function AdminSidebar({ active }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const links = [
    { path:'/admin',            icon: BarChart2,  label:'Dashboard',  section:'Main' },
    { path:'/admin/users',      icon: Users,      label:'Users',      section:'Main' },
    { path:'/admin/products',   icon: Package,    label:'Products',   section:'Main' },
    { path:'/admin/orders',     icon: ShoppingBag,label:'Orders',     section:'Sales' },
    { path:'/admin/coupons',    icon: Tag,        label:'Coupons',    section:'Sales' },
  ];
  const sections = [...new Set(links.map(l=>l.section))];
  return (
    <div className="dashboard-sidebar">
      <div className="dash-logo">⚙️ <span>Admin Panel</span></div>
      {sections.map(sec => (
        <div key={sec} className="dash-nav-section">
          <div className="dash-section-label">{sec}</div>
          {links.filter(l=>l.section===sec).map(({ path, icon:Icon, label }) => (
            <Link key={path} to={path} className={`dash-nav-link ${active===path?'active':''}`}><Icon size={15}/> {label}</Link>
          ))}
        </div>
      ))}
      <div className="dash-nav-section" style={{ marginTop:24, borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:12 }}>
        <button className="btn btn-outline btn-sm dash-nav-link" onClick={()=>{logout();navigate('/');}}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const [counts, setCounts] = useState({ users: 0, products: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [u, p] = await Promise.all([fetchUsers(), fetchProducts()]);
        setCounts({ users: u.length, products: p.length });
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    loadStats();
  }, []);

  if (loading) return <div className="dashboard-layout"><AdminSidebar active="/admin" /><main className="dashboard-main">Loading stats...</main></div>;

  return (
    <div className="dashboard-layout">
      <AdminSidebar active="/admin" />
      <main className="dashboard-main">
        <div className="dashboard-header"><h1>Admin Dashboard</h1><p>System overview — {new Date().toLocaleDateString('en-PK',{dateStyle:'full'})}</p></div>
        <div className="stats-grid">
          {[
            { icon:Users,      label:'Total Users',    value: counts.users,            change:'Live from DB' },
            { icon:Package,    label:'Total Products', value: counts.products,         change:'Live from DB' },
            { icon:ShoppingBag,label:'Total Orders',   value: 0,                       change:'Coming soon' },
            { icon:BarChart2,  label:'Total Revenue',  value: 'Rs. 0',                 change:'Coming soon' },
          ].map(({ icon:Icon, label, value, change }) => (
            <div key={label} className="stat-card">
              <div className="stat-icon"><Icon size={20}/></div>
              <div className="stat-info"><div className="value">{value}</div><div className="label">{label}</div><div className="change">{change}</div></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export function AdminUsers() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUserList(data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    loadUsers();
  }, []);

  const toggleActive = (id) => setUserList(prev => prev.map(u => u._id===id ? {...u, isActive:!u.isActive} : u));
  const getRoleBadge = (t) => t==='admin'?'badge-danger':t==='seller'?'badge-primary':'badge-success';

  if (loading) return <div className="dashboard-layout"><AdminSidebar active="/admin/users" /><main className="dashboard-main">Loading users...</main></div>;

  return (
    <div className="dashboard-layout">
      <AdminSidebar active="/admin/users" />
      <main className="dashboard-main">
        <div className="dashboard-header"><h1>User Management</h1><p>Manage all registered users</p></div>
        <div className="data-table">
          <div className="data-table-header">
            <h3>{userList.length} Users</h3>
          </div>
          <table>
            <thead><tr><th>ID</th><th>Email</th><th>Phone</th><th>Role</th><th>Registered</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {userList.map(u => (
                <tr key={u._id}>
                  <td>#{u._id.slice(-6)}</td>
                  <td style={{ fontWeight:500 }}>{u.email}</td>
                  <td>{u.phoneNumber}</td>
                  <td><span className={`badge ${getRoleBadge(u.userType)}`}>{u.userType}</span></td>
                  <td>{new Date(u.createdAt).toLocaleDateString('en-PK',{dateStyle:'short'})}</td>
                  <td>
                    <button onClick={()=>toggleActive(u._id)} style={{ background:'none', border:'none', cursor:'pointer', color: u.isActive?'#1a8a4a':'var(--text-muted)' }}>
                      {u.isActive ? <ToggleRight size={22}/> : <ToggleLeft size={22}/>}
                    </button>
                  </td>
                  <td><button className="table-action-btn" onClick={() => { setSelectedUser(u); setShowUserModal(true); }}><Edit2 size={12}/> View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showUserModal && selectedUser && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowUserModal(false)}>
            <div className="modal">
              <div className="modal-header">
                <h3>User Details: {selectedUser.firstName} {selectedUser.lastName}</h3>
                <button className="modal-close" onClick={()=>setShowUserModal(false)}>✕</button>
              </div>
              <div className="modal-body">
                <div style={{ display:'grid', gap:16 }}>
                  <div><label className="form-label" style={{ marginBottom:4 }}>Full Name</label><div style={{ fontWeight:600 }}>{selectedUser.firstName} {selectedUser.lastName}</div></div>
                  <div><label className="form-label" style={{ marginBottom:4 }}>Email Address</label><div style={{ fontWeight:600 }}>{selectedUser.email}</div></div>
                  <div><label className="form-label" style={{ marginBottom:4 }}>Phone Number</label><div style={{ fontWeight:600 }}>{selectedUser.phoneNumber}</div></div>
                  <div><label className="form-label" style={{ marginBottom:4 }}>Role</label><div><span className={`badge ${getRoleBadge(selectedUser.userType)}`}>{selectedUser.userType}</span></div></div>
                  <div><label className="form-label" style={{ marginBottom:4 }}>Registration Date</label><div style={{ color:'var(--text-muted)' }}>{new Date(selectedUser.createdAt).toLocaleString('en-PK')}</div></div>
                  <div><label className="form-label" style={{ marginBottom:4 }}>Account Status</label><div style={{ color: selectedUser.isActive ? '#1a8a4a' : '#c0143c', fontWeight:700 }}>{selectedUser.isActive ? 'Active' : 'Inactive'}</div></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary btn-sm" onClick={()=>setShowUserModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export function AdminProducts() {
  const [prodList, setProdList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProdList(data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    loadProducts();
  }, []);

  const toggleActive = (id) => setProdList(prev => prev.map(p => p.productID===id ? {...p, isActive:!p.isActive} : p));

  if (loading) return <div className="dashboard-layout"><AdminSidebar active="/admin/products" /><main className="dashboard-main">Loading products...</main></div>;

  return (
    <div className="dashboard-layout">
      <AdminSidebar active="/admin/products" />
      <main className="dashboard-main">
        <div className="dashboard-header"><h1>All Products</h1><p>Monitor and manage all product listings</p></div>
        <div className="data-table">
          <table>
            <thead><tr><th>Image</th><th>Product</th><th>Price</th><th>Stock</th><th>Status</th></tr></thead>
            <tbody>
              {prodList.map(p => (
                <tr key={p.productID}>
                  <td>
                    <img 
                      src={p.image} 
                      alt={p.productName}
                      style={{ 
                        width: 50, 
                        height: 50,
                        borderRadius: 8,
                        objectFit: 'cover'
                      }}
                    />
                  </td>
                  <td style={{ fontWeight:600 }}>{p.productName}</td>
                  <td>{formatPrice(p.basePrice)}</td>
                  <td><span className={`badge ${p.stockQuantity===0?'badge-danger':p.stockQuantity<10?'badge-warning':'badge-success'}`}>{p.stockQuantity}</span></td>
                  <td><button onClick={()=>toggleActive(p.productID)} style={{ background:'none', border:'none', cursor:'pointer', color:p.isActive?'#1a8a4a':'var(--text-muted)' }}>{p.isActive?<ToggleRight size={22}/>:<ToggleLeft size={22}/>}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}


export function AdminOrders() {
  const [orderList, setOrderList] = useState(orders);
  const statusColors = { pending:'badge-warning', confirmed:'badge-info', processing:'badge-info', shipped:'badge-primary', delivered:'badge-success', cancelled:'badge-danger' };
  const statusFlow = ['pending','confirmed','processing','shipped','delivered'];

  const advanceStatus = (id) => {
    setOrderList(prev => prev.map(o => {
      if (o.orderID !== id) return o;
      const idx = statusFlow.indexOf(o.orderStatus);
      return idx < statusFlow.length-1 ? {...o, orderStatus: statusFlow[idx+1]} : o;
    }));
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar active="/admin/orders" />
      <main className="dashboard-main">
        <div className="dashboard-header"><h1>All Orders</h1><p>Track and manage all customer orders</p></div>
        <div className="data-table">
          <table>
            <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Discount</th><th>Final</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {orderList.map(o => {
                const cust = customers.find(c=>c.customerID===o.customerID);
                return (
                  <tr key={o.orderID}>
                    <td><span style={{ fontWeight:700, color:'var(--pink)' }}>#{o.orderID}</span></td>
                    <td>{cust ? `${cust.firstName} ${cust.lastName}` : `Customer #${o.customerID}`}</td>
                    <td>{new Date(o.orderDate).toLocaleDateString('en-PK',{dateStyle:'short'})}</td>
                    <td>{formatPrice(o.totalAmount)}</td>
                    <td style={{ color:'#1a8a4a' }}>-{formatPrice(o.discountAmount)}</td>
                    <td style={{ fontWeight:700 }}>{formatPrice(o.finalAmount)}</td>
                    <td><span className={`badge ${statusColors[o.orderStatus]}`}>{o.orderStatus}</span></td>
                    <td>
                      {o.orderStatus !== 'delivered' && o.orderStatus !== 'cancelled' && (
                        <button className="table-action-btn" onClick={()=>advanceStatus(o.orderID)}>Advance →</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export function AdminCoupons() {
  const [couponList, setCouponList] = useState(coupons);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ couponCode:'', discountType:'percentage', discountValue:'', minOrderAmount:'', expiryDate:'', usageLimit:'' });

  const handleAdd = (e) => {
    e.preventDefault();
    setCouponList(prev => [...prev, { couponID:Date.now(), ...form, discountValue:Number(form.discountValue), minOrderAmount:Number(form.minOrderAmount), usageLimit:Number(form.usageLimit), timesUsed:0 }]);
    setShowModal(false); setForm({ couponCode:'', discountType:'percentage', discountValue:'', minOrderAmount:'', expiryDate:'', usageLimit:'' });
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar active="/admin/coupons" />
      <main className="dashboard-main">
        <div className="dashboard-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div><h1>Coupons & Discounts</h1><p>Manage promotional coupon codes</p></div>
          <button className="btn btn-primary" onClick={()=>setShowModal(true)}><Plus size={16}/> New Coupon</button>
        </div>

        <div className="data-table">
          <table>
            <thead><tr><th>Code</th><th>Type</th><th>Value</th><th>Min Order</th><th>Expiry</th><th>Usage</th><th>Actions</th></tr></thead>
            <tbody>
              {couponList.map(c => (
                <tr key={c.couponID}>
                  <td><code style={{ fontSize:13, background:'var(--gradient)', color:'white', padding:'3px 10px', borderRadius:4, fontWeight:700 }}>{c.couponCode}</code></td>
                  <td><span className={`badge ${c.discountType==='percentage'?'badge-primary':'badge-info'}`}>{c.discountType}</span></td>
                  <td style={{ fontWeight:700 }}>{c.discountType==='percentage'?`${c.discountValue}%`:`Rs. ${c.discountValue}`}</td>
                  <td>{formatPrice(c.minOrderAmount)}</td>
                  <td style={{ color: new Date(c.expiryDate)<new Date()?'#c0143c':'var(--text-secondary)', fontSize:13 }}>{new Date(c.expiryDate).toLocaleDateString('en-PK',{dateStyle:'short'})}</td>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <div style={{ flex:1, height:6, background:'var(--border)', borderRadius:3, minWidth:60 }}>
                        <div style={{ height:'100%', width:`${Math.min(100, c.timesUsed/c.usageLimit*100)}%`, background:'var(--gradient)', borderRadius:3 }} />
                      </div>
                      <span style={{ fontSize:12, color:'var(--text-muted)' }}>{c.timesUsed}/{c.usageLimit}</span>
                    </div>
                  </td>
                  <td>
                    <button className="table-action-btn danger" onClick={()=>setCouponList(p=>p.filter(x=>x.couponID!==c.couponID))}><Trash2 size={12}/> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
            <div className="modal">
              <div className="modal-header"><h3>Create New Coupon</h3><button className="modal-close" onClick={()=>setShowModal(false)}>✕</button></div>
              <form onSubmit={handleAdd}>
                <div className="modal-body">
                  <div className="form-group"><label className="form-label">Coupon Code</label><input className="form-control" placeholder="e.g. SAVE20" value={form.couponCode} onChange={e=>setForm(f=>({...f,couponCode:e.target.value.toUpperCase()}))} required /></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Discount Type</label>
                      <select className="form-control form-select" value={form.discountType} onChange={e=>setForm(f=>({...f,discountType:e.target.value}))}>
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Amount (Rs.)</option>
                      </select>
                    </div>
                    <div className="form-group"><label className="form-label">Discount Value</label><input className="form-control" type="number" placeholder={form.discountType==='percentage'?'e.g. 20':'e.g. 500'} value={form.discountValue} onChange={e=>setForm(f=>({...f,discountValue:e.target.value}))} required /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Min Order Amount (Rs.)</label><input className="form-control" type="number" placeholder="e.g. 2000" value={form.minOrderAmount} onChange={e=>setForm(f=>({...f,minOrderAmount:e.target.value}))} required /></div>
                    <div className="form-group"><label className="form-label">Usage Limit</label><input className="form-control" type="number" placeholder="e.g. 100" value={form.usageLimit} onChange={e=>setForm(f=>({...f,usageLimit:e.target.value}))} required /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Expiry Date</label><input className="form-control" type="date" value={form.expiryDate} onChange={e=>setForm(f=>({...f,expiryDate:e.target.value}))} required /></div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-ghost btn-sm" onClick={()=>setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">Create Coupon</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
