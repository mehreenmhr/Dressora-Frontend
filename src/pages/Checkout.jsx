import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { addresses, formatPrice } from '../data/mockData';
import '../styles/pages.css';

export default function Checkout() {
  const { items, subtotal, discount, tax, total, clearCart, appliedCoupon } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const customerID = currentUser?.profile?.customerID || 1;
  const customerAddresses = addresses.filter(a => a.customerID === customerID);

  const [shippingAddr, setShippingAddr] = useState(customerAddresses.find(a=>a.isDefault)?.addressID || customerAddresses[0]?.addressID);
  const [billingAddr, setBillingAddr]   = useState(customerAddresses.find(a=>a.isDefault)?.addressID || customerAddresses[0]?.addressID);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!shippingAddr || !billingAddr) { alert('Please select shipping and billing addresses.'); return; }
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1200));
    clearCart();
    navigate('/order-confirmation', { state: { orderID: Math.floor(Math.random()*9000)+1000, total, paymentMethod } });
  };

  if (!items.length) { navigate('/cart'); return null; }

  const AddrCard = ({ selected, onSelect, addr }) => (
    <div className={`address-option ${selected===addr.addressID?'selected':''}`} onClick={() => onSelect(addr.addressID)}>
      <input type="radio" readOnly checked={selected===addr.addressID} style={{ accentColor:'var(--pink)' }} />
      <div className="addr-text">
        <div className="title"><MapPin size={12} style={{ marginRight:4 }} />{addr.addressType === 'home' ? '🏠 Home' : '🏢 Work'}{addr.isDefault && <span className="badge badge-info" style={{ marginLeft:8, fontSize:10 }}>Default</span>}</div>
        <div className="detail">{addr.street}, {addr.city}, {addr.state} {addr.postalCode}</div>
        <div className="detail">{addr.country}</div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div className="container"><h1>Checkout</h1><div className="breadcrumb"><Link to="/">Home</Link> / <Link to="/cart">Cart</Link> / <span>Checkout</span></div></div>
      </div>
      <div className="container section">
        <div className="checkout-layout">
          <div>
            {/* Shipping Address */}
            <div className="checkout-card">
              <h3><span className="step-num">1</span> Shipping Address</h3>
              {customerAddresses.length ? customerAddresses.map(a => <AddrCard key={a.addressID} selected={shippingAddr} onSelect={setShippingAddr} addr={a} />) : <p style={{ color:'var(--text-muted)', fontSize:14 }}>No addresses saved. <Link to="/account/addresses" style={{ color:'var(--pink)' }}>Add one →</Link></p>}
              <Link to="/account/addresses" className="btn btn-ghost btn-sm" style={{ marginTop:12, display:'inline-flex' }}>+ Add New Address</Link>
            </div>

            {/* Billing Address */}
            <div className="checkout-card">
              <h3><span className="step-num">2</span> Billing Address</h3>
              <div className="address-option selected" style={{ marginBottom:8, cursor:'pointer' }} onClick={() => setBillingAddr(shippingAddr)}>
                <input type="radio" readOnly checked={billingAddr===shippingAddr} style={{ accentColor:'var(--pink)' }} />
                <div className="addr-text"><div className="title">Same as shipping address</div></div>
              </div>
              {customerAddresses.filter(a=>a.addressID!==shippingAddr).map(a => <AddrCard key={a.addressID} selected={billingAddr} onSelect={setBillingAddr} addr={a} />)}
            </div>

            {/* Payment */}
            <div className="checkout-card">
              <h3><span className="step-num">3</span> Payment Method</h3>
              {[
                { val:'online', icon:'💳', label:'Online Payment', desc:'Credit/Debit Card, EasyPaisa, JazzCash' },
                { val:'cod',    icon:'💵', label:'Cash on Delivery', desc:'Pay when your order arrives' },
              ].map(pm => (
                <div key={pm.val} className={`payment-option ${paymentMethod===pm.val?'selected':''}`} onClick={() => setPaymentMethod(pm.val)}>
                  <input type="radio" readOnly checked={paymentMethod===pm.val} style={{ accentColor:'var(--pink)' }} />
                  <div className="payment-icon">{pm.icon}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>{pm.label}</div>
                    <div style={{ fontSize:12, color:'var(--text-muted)' }}>{pm.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary-card">
            <h3 style={{ marginBottom:16, paddingBottom:12, borderBottom:'1px solid var(--border)' }}>Order Summary</h3>
            {items.map(item => (
              <div key={item.productID} className="order-item-row">
                <div className="order-item-img"><div className="img-placeholder" style={{ height:'100%' }}><span style={{ fontSize:10 }}>📷</span></div></div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600 }}>{item.product.productName}</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)' }}>Qty: {item.quantity}</div>
                </div>
                <div style={{ fontSize:14, fontWeight:600 }}>{formatPrice(item.priceAtTime * item.quantity)}</div>
              </div>
            ))}
            <div className="divider" />
            {appliedCoupon && <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:8, color:'#1a8a4a' }}><span>Coupon ({appliedCoupon.couponCode})</span><span>-{formatPrice(discount)}</span></div>}
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:8 }}><span style={{ color:'var(--text-muted)' }}>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:8 }}><span style={{ color:'var(--text-muted)' }}>Tax (5%)</span><span>{formatPrice(tax)}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:12 }}><span style={{ color:'var(--text-muted)' }}>Delivery</span><span style={{ color:'#1a8a4a' }}>{subtotal >= 2000 ? 'Free' : formatPrice(150)}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:16, fontWeight:700, padding:'12px 0', borderTop:'2px solid var(--border)' }}>
              <span>Total</span><span style={{ color:'var(--pink)' }}>{formatPrice(total)}</span>
            </div>
            <button className="btn btn-primary btn-full" style={{ marginTop:16 }} onClick={handlePlaceOrder} disabled={placing}>
              {placing ? 'Placing Order...' : <><CheckCircle size={16}/> Place Order</>}
            </button>
            <p style={{ fontSize:11, textAlign:'center', color:'var(--text-muted)', marginTop:10 }}>🔒 Your payment is 100% secure and encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
