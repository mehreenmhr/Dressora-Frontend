import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder, fetchCustomerAddresses } from '../services/api';
import { formatPrice } from '../data/mockData';
import '../styles/pages.css';

export default function Checkout() {
  const { items, subtotal, discount, tax, total, clearCart, appliedCoupon } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const customerID = currentUser?.profile?.customerID || 1;

  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [shippingAddr, setShippingAddr] = useState(null);
  const [billingAddr, setBillingAddr]   = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [placing, setPlacing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [loadingAddrs, setLoadingAddrs] = useState(true);

  useEffect(() => {
    const loadAddrs = async () => {
      try {
        const data = await fetchCustomerAddresses(customerID);
        setCustomerAddresses(data);
        const def = data.find(a => a.isDefault)?.addressID || data[0]?.addressID;
        setShippingAddr(def);
        setBillingAddr(def);
      } catch (err) {
        console.error('Error loading customer addresses:', err);
        // Still allow checkout even if addresses fail to load
        // Use null addresses - backend will handle creating default ones
      } finally {
        setLoadingAddrs(false);
      }
    };
    loadAddrs();
  }, [customerID]);

  const handlePlaceOrder = async () => {
    if (!shippingAddr) {
      alert('Please select or add a shipping address before placing your order.');
      return;
    }
    setPlacing(true);
    try {
      const orderPayload = {
        customerId: customerID,
        items: items.map(item => ({
          productID: item.productID,
          quantity: item.quantity,
          priceAtTime: item.priceAtTime,
        })),
        totalAmount: subtotal,
        discountAmount: discount,
        taxAmount: tax,
        finalAmount: total,
        shippingAddressId: shippingAddr,
        billingAddressId: billingAddr || shippingAddr,
        paymentMethod: paymentMethod,
      };

      console.log('🛒 Placing order with payload:', orderPayload);
      const result = await placeOrder(orderPayload);
      console.log('✅ Order placed successfully:', result);
      
      // Clear cart and apply changes
      clearCart();
      
      // Store order info and navigate
      const confirmUrl = `/order-confirmation?orderID=${result.orderID}&total=${total}&paymentMethod=${paymentMethod}`;
      console.log('📍 Navigating to:', confirmUrl);
      navigate(confirmUrl);
      
      // Hard reload to ensure everything updates
      setTimeout(() => {
        window.location.href = confirmUrl;
      }, 500);
    } catch (err) {
      console.error('❌ Order error:', err);
      alert('Error placing order: ' + err.message);
      setPlacing(false);
    }
  };

  if (!items.length && !orderCompleted) { navigate('/cart'); return null; }

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
              {loadingAddrs ? (
                <p style={{ color:'var(--text-muted)', fontSize:14 }}>Loading addresses...</p>
              ) : customerAddresses.length ? (
                customerAddresses.map(a => <AddrCard key={a.addressID} selected={shippingAddr} onSelect={setShippingAddr} addr={a} />)
              ) : (
                <p style={{ color:'var(--text-muted)', fontSize:14 }}>No addresses saved. <Link to="/account/addresses" style={{ color:'var(--pink)' }}>Add one →</Link></p>
              )}
              <Link to="/account/addresses" className="btn btn-ghost btn-sm" style={{ marginTop:12, display:'inline-flex' }}>+ Add New Address</Link>
            </div>

            {/* Billing Address */}
            <div className="checkout-card">
              <h3><span className="step-num">2</span> Billing Address</h3>
              <div className="address-option selected" style={{ marginBottom:8, cursor:'pointer' }} onClick={() => setBillingAddr(shippingAddr)}>
                <input type="radio" readOnly checked={billingAddr===shippingAddr} style={{ accentColor:'var(--pink)' }} />
                <div className="addr-text"><div className="title">Same as shipping address</div></div>
              </div>
              {!loadingAddrs && customerAddresses.filter(a=>a.addressID!==shippingAddr).map(a => <AddrCard key={a.addressID} selected={billingAddr} onSelect={setBillingAddr} addr={a} />)}
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
                <div className="order-item-img">
                  <img 
                    src={item.product.image} 
                    alt={item.product.productName}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: 4
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;border-radius:4px;font-size:10px;color:#999;">📷</div>';
                    }}
                  />
                </div>
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
