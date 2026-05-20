import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, LogOut, Star, Edit2, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchCustomerOrders, updateOrderStatus, fetchCustomerAddresses, addCustomerAddress } from '../../services/api';
import { formatPrice } from '../../data/mockData';
import '../../styles/pages.css';

function AccountSidebar({ active }) {
  const { currentUser, logout, displayName } = useAuth();
  const navigate = useNavigate();
  const initials = displayName ? displayName.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() : '?';
  const links = [
    { path:'/account/profile',   icon: User,    label:'My Profile' },
    { path:'/account/orders',    icon: Package, label:'My Orders' },
    { path:'/account/addresses', icon: MapPin,  label:'Addresses' },
  ];
  return (
    <div className="account-sidebar">
      <div className="account-profile-header">
        <div className="account-avatar">{initials}</div>
        <div style={{ fontWeight:700, fontSize:15 }}>{displayName}</div>
        <div style={{ fontSize:12, opacity:0.8, marginTop:2 }}>{currentUser?.email}</div>
        <div style={{ fontSize:12, marginTop:4, background:'rgba(255,255,255,0.2)', padding:'2px 10px', borderRadius:20 }}>🏆 {currentUser?.profile?.loyaltyPoints || 0} pts</div>
      </div>
      {links.map(({ path, icon:Icon, label }) => (
        <Link key={path} to={path} className={`account-nav-link ${active===path?'active':''}`}>
          <Icon size={15} /> {label}
        </Link>
      ))}
      <button className="account-nav-link" style={{ width:'100%', border:'none', background:'none', color:'#c0143c', cursor:'pointer' }} onClick={() => { logout(); navigate('/'); }}>
        <LogOut size={15} /> Sign Out
      </button>
    </div>
  );
}

export function Profile() {
  const { currentUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const profile = currentUser?.profile || {};
  const [form, setForm] = useState({ firstName: profile.firstName||'', lastName: profile.lastName||'', email: currentUser?.email||'', phoneNumber: currentUser?.phoneNumber||'' });

  return (
    <div>
      <div className="page-header"><div className="container"><h1>My Account</h1><div className="breadcrumb"><Link to="/">Home</Link> / <span>Profile</span></div></div></div>
      <div className="container section">
        <div className="account-layout">
          <AccountSidebar active="/account/profile" />
          <div>
            <div className="card card-body" style={{ marginBottom:20 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                <h3 style={{ fontSize:16 }}>Personal Information</h3>
                <button className="btn btn-outline btn-sm" onClick={() => setEditing(!editing)}>{editing ? <><Save size={13}/> Save</> : <><Edit2 size={13}/> Edit</>}</button>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">First Name</label><input className="form-control" value={form.firstName} disabled={!editing} onChange={e=>setForm(f=>({...f,firstName:e.target.value}))} /></div>
                <div className="form-group"><label className="form-label">Last Name</label><input className="form-control" value={form.lastName} disabled={!editing} onChange={e=>setForm(f=>({...f,lastName:e.target.value}))} /></div>
              </div>
              <div className="form-group"><label className="form-label">Email Address</label><input className="form-control" type="email" value={form.email} disabled={!editing} /></div>
              <div className="form-group"><label className="form-label">Phone Number</label><input className="form-control" value={form.phoneNumber} disabled={!editing} placeholder="0300-1234567" /></div>
            </div>

            <div className="card card-body" style={{ background:'linear-gradient(135deg,var(--pink-light),var(--purple-light))' }}>
              <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                <div style={{ width:56, height:56, background:'var(--gradient)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'white' }}><Star size={24}/></div>
                <div>
                  <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:2 }}>Your Loyalty Points</div>
                  <div style={{ fontSize:2+'rem', fontWeight:700, fontFamily:"'Playfair Display',serif", background:'var(--gradient)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{profile.loyaltyPoints || 0}</div>
                  <div style={{ fontSize:12, color:'var(--text-secondary)' }}>Keep shopping to earn more points!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Orders() {
  const { currentUser } = useAuth();
  const customerID = currentUser?.profile?.customerID || 1;
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchCustomerOrders(customerID);
        setMyOrders(data);
      } catch (err) {
        console.error('Error loading customer orders:', err);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [customerID]);

  const statusColors = { pending:'badge-warning', confirmed:'badge-info', processing:'badge-info', shipped:'badge-primary', delivered:'badge-success', cancelled:'badge-danger' };

  return (
    <div>
      <div className="page-header"><div className="container"><h1>My Orders</h1><div className="breadcrumb"><Link to="/">Home</Link> / <span>Orders</span></div></div></div>
      <div className="container section">
        <div className="account-layout">
          <AccountSidebar active="/account/orders" />
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading orders...</div>
            ) : myOrders.length === 0 ? (
              <div className="empty-state"><Package size={48}/><h3>No orders yet</h3><p>Start shopping to see your orders here!</p><Link to="/shop" className="btn btn-primary" style={{ marginTop:16, display:'inline-flex' }}>Shop Now</Link></div>
            ) : myOrders.map(order => {
              return (
                <div key={order.orderID} className="card" style={{ marginBottom:16 }}>
                  <div style={{ padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid var(--border)', flexWrap:'wrap', gap:10 }}>
                    <div>
                      <div style={{ fontSize:13, color:'var(--text-muted)' }}>Order #{order.orderID}</div>
                      <div style={{ fontSize:12, color:'var(--text-muted)' }}>{new Date(order.orderDate).toLocaleDateString('en-PK', { dateStyle:'medium' })}</div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <span className={`badge ${statusColors[order.orderStatus]}`}>{order.orderStatus.charAt(0).toUpperCase()+order.orderStatus.slice(1)}</span>
                      <span style={{ fontWeight:700, color:'var(--pink)' }}>{formatPrice(order.finalAmount)}</span>
                    </div>
                  </div>
                  <div style={{ padding:'14px 20px' }}>
                    {order.orderItems.map(item => (
                      <div key={item.orderItemID} style={{ display:'flex', gap:12, marginBottom:8, alignItems:'center' }}>
                        <div style={{ width:48, height:60, borderRadius:8, overflow:'hidden', flexShrink:0, border:'1px solid var(--border)' }}>
                          <img 
                            src={item.image} 
                            alt={item.productName}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;font-size:10px;color:#999;">📷</div>';
                            }}
                          />
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:13, fontWeight:600 }}>{item.productName}</div>
                          <div style={{ fontSize:12, color:'var(--text-muted)' }}>Qty: {item.quantity} × {formatPrice(item.unitPrice)}</div>
                        </div>
                        <div style={{ fontWeight:600, fontSize:13 }}>{formatPrice(item.subtotal)}</div>
                      </div>
                    ))}
                    <div style={{ display:'flex', gap:10, marginTop:12 }}>
                      <Link to={`/account/orders/${order.orderID}`} className="btn btn-outline btn-sm">View Details</Link>
                      {order.orderStatus === 'pending' && (
                        <button 
                          className="btn btn-sm" 
                          style={{ background:'#fde8f0', color:'#c0143c', border:'none' }}
                          onClick={async () => {
                            if (window.confirm('Are you sure you want to cancel this order?')) {
                              try {
                                await updateOrderStatus(order.orderID, 'cancelled');
                                setMyOrders(prev => prev.map(o => o.orderID === order.orderID ? { ...o, orderStatus: 'cancelled' } : o));
                              } catch (err) {
                                alert('Failed to cancel order: ' + err.message);
                              }
                            }
                          }}
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrderDetail() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const orderID = parseInt(window.location.pathname.split('/').pop());
  const customerID = currentUser?.profile?.customerID || 1;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchCustomerOrders(customerID);
        const found = data.find(o => o.orderID === orderID);
        setOrder(found);
      } catch (err) {
        console.error('Error loading order detail:', err);
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [customerID, orderID]);

  if (loading) {
    return (
      <div>
        <div className="page-header"><div className="container"><h1>Order #{orderID}</h1><div className="breadcrumb"><Link to="/">Home</Link> / <Link to="/account/orders">Orders</Link> / <span>#{orderID}</span></div></div></div>
        <div className="container section">
          <div className="account-layout">
            <AccountSidebar active="/account/orders" />
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Loading order details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) return <div className="container" style={{ paddingTop:80 }}><h3>Order not found.</h3><button className="btn btn-primary" onClick={() => navigate('/account/orders')}>Back to Orders</button></div>;

  const statusList = ['pending','confirmed','processing','shipped','delivered'];
  const currentIdx = statusList.indexOf(order.orderStatus);

  return (
    <div>
      <div className="page-header"><div className="container"><h1>Order #{order.orderID}</h1><div className="breadcrumb"><Link to="/">Home</Link> / <Link to="/account/orders">Orders</Link> / <span>#{order.orderID}</span></div></div></div>
      <div className="container section">
        <div className="account-layout">
          <AccountSidebar active="/account/orders" />
          <div>
            <div className="card card-body" style={{ marginBottom:20 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <h3>Order Status</h3>
                <span className="badge badge-info">{order.orderStatus}</span>
              </div>
              <div className="status-stepper">
                {statusList.map((s, i) => (
                  <div key={s} className={`status-step ${i < currentIdx ? 'done' : i === currentIdx ? 'current' : ''}`}>
                    <div className="step-circle">{i < currentIdx ? '✓' : i+1}</div>
                    <div className="step-label">{s.charAt(0).toUpperCase()+s.slice(1)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card card-body" style={{ marginBottom:20 }}>
              <h3 style={{ marginBottom:16 }}>Order Items</h3>
              {order.orderItems.map(item => (
                <div key={item.orderItemID} style={{ display:'flex', gap:14, marginBottom:14, paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
                  <div style={{ width:64, height:80, borderRadius:8, overflow:'hidden', flexShrink:0, border:'1px solid var(--border)' }}>
                    <img 
                      src={item.image} 
                      alt={item.productName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;font-size:10px;color:#999;">📷</div>';
                      }}
                    />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600 }}>{item.productName}</div>
                    <div style={{ fontSize:13, color:'var(--text-muted)' }}>Qty: {item.quantity} × {formatPrice(item.unitPrice)}</div>
                  </div>
                  <div style={{ fontWeight:700, color:'var(--pink)' }}>{formatPrice(item.subtotal)}</div>
                </div>
              ))}
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:8 }}>
                {[['Total Amount', formatPrice(order.totalAmount)],['Discount', `-${formatPrice(order.discountAmount)}`],['Tax', formatPrice(order.taxAmount)],['Final Amount', formatPrice(order.finalAmount)]].map(([l,v]) => (
                  <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:14 }}><span style={{ color:'var(--text-muted)' }}>{l}</span><span style={{ fontWeight:600, color: l==='Final Amount'?'var(--pink)':'var(--text-primary)' }}>{v}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Addresses() {
  const { currentUser } = useAuth();
  const customerID = currentUser?.profile?.customerID || 1;
  const [addrList, setAddrList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ street:'', city:'', state:'', postalCode:'', country:'Pakistan', addressType:'home', isDefault:false });

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const data = await fetchCustomerAddresses(customerID);
        setAddrList(data);
      } catch (err) {
        console.error('Error loading addresses:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAddresses();
  }, [customerID]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const saved = await addCustomerAddress({ customerID, ...form });
      setAddrList(prev => {
        if (saved.isDefault) {
          return prev.map(a => ({ ...a, isDefault: false })).concat(saved);
        }
        return [...prev, saved];
      });
      setShowForm(false);
      setForm({ street:'', city:'', state:'', postalCode:'', country:'Pakistan', addressType:'home', isDefault:false });
    } catch (err) {
      alert('Failed to save address: ' + err.message);
    }
  };

  return (
    <div>
      <div className="page-header"><div className="container"><h1>Saved Addresses</h1><div className="breadcrumb"><Link to="/">Home</Link> / <span>Addresses</span></div></div></div>
      <div className="container section">
        <div className="account-layout">
          <AccountSidebar active="/account/addresses" />
          <div>
            <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:16 }}>
              <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>+ Add New Address</button>
            </div>

            {showForm && (
              <div className="card card-body" style={{ marginBottom:20 }}>
                <h3 style={{ marginBottom:16 }}>Add New Address</h3>
                <form onSubmit={handleAdd}>
                  <div className="form-group"><label className="form-label">Street / House No.</label><input className="form-control" placeholder="e.g. House 5, Block B, Gulberg" value={form.street} onChange={e=>setForm(f=>({...f,street:e.target.value}))} required /></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">City</label><input className="form-control" placeholder="Lahore" value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} required /></div>
                    <div className="form-group"><label className="form-label">State / Province</label><input className="form-control" placeholder="Punjab" value={form.state} onChange={e=>setForm(f=>({...f,state:e.target.value}))} required /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Postal Code</label><input className="form-control" placeholder="54000" value={form.postalCode} onChange={e=>setForm(f=>({...f,postalCode:e.target.value}))} required /></div>
                    <div className="form-group"><label className="form-label">Address Type</label>
                      <select className="form-control form-select" value={form.addressType} onChange={e=>setForm(f=>({...f,addressType:e.target.value}))}>
                        <option value="home">🏠 Home</option><option value="work">🏢 Work</option><option value="other">📍 Other</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
                    <input type="checkbox" id="isDefault" checked={form.isDefault} onChange={e=>setForm(f=>({...f,isDefault:e.target.checked}))} style={{ accentColor:'var(--pink)' }} />
                    <label htmlFor="isDefault" style={{ fontSize:14, cursor:'pointer' }}>Set as default address</label>
                  </div>
                  <div style={{ display:'flex', gap:10 }}>
                    <button className="btn btn-primary" type="submit">Save Address</button>
                    <button className="btn btn-ghost" type="button" onClick={() => setShowForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            {loading ? (
              <p style={{ color:'var(--text-muted)' }}>Loading addresses...</p>
            ) : (
              <div className="grid-2">
                {addrList.map(addr => (
                  <div key={addr.addressID} className="card card-body" style={{ borderColor: addr.isDefault ? 'var(--pink)' : 'var(--border)', position:'relative' }}>
                    {addr.isDefault && <span className="badge badge-primary" style={{ position:'absolute', top:12, right:12 }}>Default</span>}
                    <div style={{ fontSize:14, fontWeight:700, marginBottom:8 }}>{addr.addressType === 'home' ? '🏠 Home' : addr.addressType === 'work' ? '🏢 Work' : '📍 Other'}</div>
                    <div style={{ fontSize:14, color:'var(--text-secondary)', lineHeight:1.6 }}>
                      {addr.street}<br/>{addr.city}, {addr.state} {addr.postalCode}<br/>{addr.country}
                    </div>
                    <div style={{ display:'flex', gap:8, marginTop:14 }}>
                      <button className="btn btn-outline btn-sm"><Edit2 size={12}/> Edit</button>
                      {!addr.isDefault && <button className="btn btn-ghost btn-sm" onClick={() => setAddrList(prev => prev.map(a => ({...a, isDefault: a.addressID===addr.addressID})))}>Set Default</button>}
                      <button className="btn btn-sm" style={{ background:'#fde8f0', color:'#c0143c', border:'none' }} onClick={() => setAddrList(prev=>prev.filter(a=>a.addressID!==addr.addressID))}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
