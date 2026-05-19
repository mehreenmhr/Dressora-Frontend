import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, DollarSign, Star, Plus, Edit2, Trash2, ToggleLeft, ToggleRight, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { products, orders, orderItems, getProductById, formatPrice, categories } from '../../data/mockData';
import '../../styles/pages.css';

function SellerSidebar({ active }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="dashboard-sidebar">
      <div className="dash-logo">🏪 <span>Seller Panel</span></div>
      <div className="dash-nav-section">
        <div className="dash-section-label">Main</div>
        {[
          { path:'/seller/products', icon: Package,     label:'My Products' },
          { path:'/seller/orders',   icon: DollarSign,  label:'Orders' },
        ].map(({ path, icon:Icon, label }) => (
          <Link key={path} to={path} className={`dash-nav-link ${active===path?'active':''}`}>
            <Icon size={15} /> {label}
          </Link>
        ))}
      </div>
      <div className="dash-nav-section" style={{ marginTop:'auto', borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:12 }}>
        <button className="btn btn-outline btn-sm dash-nav-link" onClick={() => { logout(); navigate('/'); }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  );
}

export function SellerDashboard() {
  const { currentUser } = useAuth();
  const sellerID = currentUser?.profile?.sellerID || 1;
  const myProducts = products.filter(p => p.sellerID === sellerID);
  const myOrderItems = orderItems.filter(oi => myProducts.some(p => p.productID === oi.productID));
  const revenue = myOrderItems.reduce((s, oi) => s + oi.subtotal, 0);
  const avgRating = myProducts.length ? (myProducts.reduce((s,p)=>s+p.rating,0)/myProducts.length).toFixed(1) : 0;

  return (
    <div className="dashboard-layout">
      <SellerSidebar active="/seller" />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Welcome back, {currentUser?.profile?.storeName || 'Seller'} 👋</h1>
          <p>Here's how your store is performing</p>
        </div>
        <div className="stats-grid">
          {[
            { icon: Package,    label:'Total Products',  value: myProducts.length,         change:'+2 this month' },
            { icon: ShoppingBag,label:'Total Orders',    value: myOrderItems.length,        change:'+5 this week' },
            { icon: DollarSign, label:'Total Revenue',   value: formatPrice(revenue),       change:'+12% vs last' },
            { icon: Star,       label:'Average Rating',  value: avgRating + '★',            change:'Based on reviews' },
          ].map(({ icon:Icon, label, value, change }) => (
            <div key={label} className="stat-card">
              <div className="stat-icon"><Icon size={20} /></div>
              <div className="stat-info"><div className="value">{value}</div><div className="label">{label}</div><div className="change">{change}</div></div>
            </div>
          ))}
        </div>

        <div className="data-table">
          <div className="data-table-header">
            <h3>Recent Products</h3>
            <Link to="/seller/products" className="btn btn-primary btn-sm">View All</Link>
          </div>
          <table>
            <thead><tr><th>Product</th><th>Image</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Rating</th></tr></thead>
            <tbody>
              {myProducts.slice(0,5).map(p => (
                <tr key={p.productID}>
                  <td style={{ fontWeight:600 }}>{p.productName}</td>
                  <td>
                    <img 
                      src={p.image} 
                      alt={p.productName}
                      style={{ 
                        width: 40, 
                        height: 40, 
                        objectFit: 'cover',
                        borderRadius: 6
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;background:#f5f5f5;border-radius:6px;font-size:10px;color:#999;">📷</div>';
                      }}
                    />
                  </td>
                  <td>{categories.find(c=>c.categoryID===p.categoryID)?.categoryName}</td>
                  <td>{formatPrice(p.basePrice)}</td>
                  <td><span className={`badge ${p.stockQuantity < 10 ? 'badge-warning' : 'badge-success'}`}>{p.stockQuantity}</span></td>
                  <td><span className={`badge ${p.isActive ? 'badge-success' : 'badge-muted'}`}>{p.isActive ? 'Active' : 'Inactive'}</span></td>
                  <td>{p.rating}★</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export function SellerProducts() {
  const { currentUser } = useAuth();
  const sellerID = currentUser?.profile?.sellerID || 1;
  const [productList, setProductList] = useState(products.filter(p => p.sellerID === sellerID));
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ productName:'', description:'', basePrice:'', stockQuantity:'', sku:'', categoryID:7, isActive:true });

  const openAdd = () => { setEditProduct(null); setForm({ productName:'', description:'', basePrice:'', stockQuantity:'', sku:'', categoryID:7, isActive:true }); setShowModal(true); };
  const openEdit = (p) => { setEditProduct(p); setForm({ productName:p.productName, description:p.description, basePrice:p.basePrice, stockQuantity:p.stockQuantity, sku:p.sku, categoryID:p.categoryID, isActive:p.isActive }); setShowModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editProduct) {
      setProductList(prev => prev.map(p => p.productID===editProduct.productID ? {...p,...form, basePrice:Number(form.basePrice), stockQuantity:Number(form.stockQuantity), image: form.image || editProduct.image} : p));
    } else {
      setProductList(prev => [...prev, { ...form, productID: Date.now(), sellerID, basePrice:Number(form.basePrice), stockQuantity:Number(form.stockQuantity), rating:0, reviewCount:0, discount:0, createdAt:new Date().toISOString().split('T')[0], image: form.image || null }]);
    }
    setShowModal(false);
  };

  const toggleActive = (id) => setProductList(prev => prev.map(p => p.productID===id ? {...p, isActive:!p.isActive} : p));
  const deleteProduct = (id) => { if (window.confirm('Delete this product?')) setProductList(prev=>prev.filter(p=>p.productID!==id)); };

  return (
    <div className="dashboard-layout">
      <SellerSidebar active="/seller/products" />
      <main className="dashboard-main">
        <div className="dashboard-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div><h1>My Products</h1><p>Manage your product listings</p></div>
          <button className="btn btn-primary" onClick={openAdd}><Plus size={16}/> Add Product</button>
        </div>

        <div className="data-table">
          <table>
            <thead><tr><th>Image</th><th>Product Name</th><th>SKU</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {productList.map(p => (
                <tr key={p.productID}>
                  <td>
                    <img 
                      src={p.image} 
                      alt={p.productName}
                      style={{ 
                        width: 50, 
                        height: 50, 
                        objectFit: 'cover',
                        borderRadius: 6
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;width:50px;height:50px;background:#f5f5f5;border-radius:6px;font-size:10px;color:#999;">📷</div>';
                      }}
                    />
                  </td>
                  <td><div style={{ fontWeight:600 }}>{p.productName}</div><div style={{ fontSize:12, color:'var(--text-muted)' }}>{p.discount>0?`-${p.discount}% off`:''}</div></td>
                  <td><code style={{ fontSize:12, background:'var(--bg-light)', padding:'2px 6px', borderRadius:4 }}>{p.sku}</code></td>
                  <td>{categories.find(c=>c.categoryID===p.categoryID)?.categoryName}</td>
                  <td style={{ fontWeight:600 }}>{formatPrice(p.basePrice)}</td>
                  <td><span className={`badge ${p.stockQuantity===0?'badge-danger':p.stockQuantity<10?'badge-warning':'badge-success'}`}>{p.stockQuantity}</span></td>
                  <td>
                    <button onClick={()=>toggleActive(p.productID)} style={{ background:'none', border:'none', cursor:'pointer', color: p.isActive?'#1a8a4a':'var(--text-muted)' }}>
                      {p.isActive ? <ToggleRight size={22}/> : <ToggleLeft size={22}/>}
                    </button>
                  </td>
                  <td>
                    <button className="table-action-btn" onClick={()=>openEdit(p)}><Edit2 size={12}/> Edit</button>
                    <button className="table-action-btn danger" onClick={()=>deleteProduct(p.productID)}><Trash2 size={12}/> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
            <div className="modal">
              <div className="modal-header">
                <h3>{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <button className="modal-close" onClick={()=>setShowModal(false)}>✕</button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Product Image</label>
                    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
                      {editProduct && editProduct.image && (
                        <img 
                          src={editProduct.image} 
                          alt={editProduct.productName}
                          style={{ 
                            width: 80, 
                            height: 80, 
                            objectFit: 'cover',
                            borderRadius: 8,
                            border: '2px solid var(--bg-light)'
                          }}
                        />
                      )}
                      <div style={{ flex:1 }}>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setForm(f => ({...f, image: event.target.result}));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          style={{ fontSize: 12 }}
                        />
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                          {editProduct ? 'Change current image' : 'Upload product image'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group"><label className="form-label">Product Name</label><input className="form-control" value={form.productName} onChange={e=>setForm(f=>({...f,productName:e.target.value}))} required /></div>
                  <div className="form-group"><label className="form-label">Description</label><textarea className="form-control" rows={3} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} /></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Base Price (Rs.)</label><input className="form-control" type="number" value={form.basePrice} onChange={e=>setForm(f=>({...f,basePrice:e.target.value}))} required /></div>
                    <div className="form-group"><label className="form-label">Stock Quantity</label><input className="form-control" type="number" value={form.stockQuantity} onChange={e=>setForm(f=>({...f,stockQuantity:e.target.value}))} required /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">SKU</label><input className="form-control" placeholder="e.g. DRS-001" value={form.sku} onChange={e=>setForm(f=>({...f,sku:e.target.value}))} required /></div>
                    <div className="form-group"><label className="form-label">Category</label>
                      <select className="form-control form-select" value={form.categoryID} onChange={e=>setForm(f=>({...f,categoryID:Number(e.target.value)}))}>
                        {categories.map(c=><option key={c.categoryID} value={c.categoryID}>{c.categoryName}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <input type="checkbox" id="isActive" checked={form.isActive} onChange={e=>setForm(f=>({...f,isActive:e.target.checked}))} style={{ accentColor:'var(--pink)' }} />
                    <label htmlFor="isActive" style={{ fontSize:14 }}>Mark as Active</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-ghost btn-sm" onClick={()=>setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">{editProduct ? 'Save Changes' : 'Add Product'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export function SellerOrders() {
  const { currentUser } = useAuth();
  const sellerID = currentUser?.profile?.sellerID || 1;
  const myProducts = products.filter(p => p.sellerID === sellerID);
  const myOrderItems = orderItems.filter(oi => myProducts.some(p => p.productID === oi.productID));
  const statusColors = { pending:'badge-warning', confirmed:'badge-info', processing:'badge-info', shipped:'badge-primary', delivered:'badge-success', cancelled:'badge-danger' };

  return (
    <div className="dashboard-layout">
      <SellerSidebar active="/seller/orders" />
      <main className="dashboard-main">
        <div className="dashboard-header"><h1>Orders</h1><p>Orders containing your products</p></div>
        <div className="data-table">
          <table>
            <thead><tr><th>Order ID</th><th>Product</th><th>Qty</th><th>Unit Price</th><th>Subtotal</th><th>Status</th></tr></thead>
            <tbody>
              {myOrderItems.map(oi => {
                const p = getProductById(oi.productID);
                const order = orders.find(o=>o.orderID===oi.orderID);
                return (
                  <tr key={oi.orderItemID}>
                    <td><span style={{ fontWeight:600, color:'var(--pink)' }}>#{oi.orderID}</span><div style={{ fontSize:11, color:'var(--text-muted)' }}>{order ? new Date(order.orderDate).toLocaleDateString('en-PK',{dateStyle:'short'}) : ''}</div></td>
                    <td>{p?.productName}</td>
                    <td>{oi.quantity}</td>
                    <td>{formatPrice(oi.unitPrice)}</td>
                    <td style={{ fontWeight:700 }}>{formatPrice(oi.subtotal)}</td>
                    <td><span className={`badge ${statusColors[order?.orderStatus||'pending']}`}>{order?.orderStatus}</span></td>
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
