import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, coupons } from '../data/mockData';
import '../styles/pages.css';

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal, discount, tax, total, appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleCoupon = () => {
    setCouponError(''); setCouponSuccess('');
    const found = coupons.find(c => c.couponCode.toLowerCase() === couponCode.trim().toLowerCase());
    if (!found) { setCouponError('Invalid coupon code.'); return; }
    if (new Date(found.expiryDate) < new Date()) { setCouponError('This coupon has expired.'); return; }
    if (found.timesUsed >= found.usageLimit) { setCouponError('Coupon usage limit reached.'); return; }
    if (subtotal < found.minOrderAmount) { setCouponError(`Minimum order amount is ${formatPrice(found.minOrderAmount)}.`); return; }
    applyCoupon(found);
    setCouponSuccess(`Coupon "${found.couponCode}" applied! You save ${found.discountType === 'percentage' ? found.discountValue + '%' : formatPrice(found.discountValue)}`);
  };

  const handleCheckout = () => {
    if (!currentUser) { navigate('/login'); return; }
    navigate('/checkout');
  };

  if (items.length === 0) return (
    <div>
      <div className="page-header">
        <div className="container"><h1>Shopping Cart</h1><div className="breadcrumb"><Link to="/">Home</Link> / <span>Cart</span></div></div>
      </div>
      <div className="empty-state container" style={{ paddingTop:80 }}>
        <ShoppingBag size={64} style={{ margin:'0 auto 16px', opacity:0.3 }} />
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet. Start exploring!</p>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop:20, display:'inline-flex' }}>Continue Shopping <ArrowRight size={16} /></Link>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div className="container"><h1>Shopping Cart</h1><div className="breadcrumb"><Link to="/">Home</Link> / <span>Cart</span></div></div>
      </div>
      <div className="container section">
        <div className="cart-layout">
          {/* Items */}
          <div>
            <div className="cart-table">
              <div className="cart-table-head">
                <span>Product</span>
                <span className="head-price">Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span></span>
              </div>
              {items.map(item => (
                <div key={item.productID} className="cart-row">
                  <div className="cart-product">
                    <div className="cart-product-img">
                      <img 
                        src={item.product.image} 
                        alt={item.product.productName}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;border-radius:8px;font-size:10px;color:#999;">📷</div>';
                        }}
                      />
                    </div>
                    <div>
                      <Link to={`/product/${item.productID}`} className="name">{item.product.productName}</Link>
                      <div className="variant">{formatPrice(item.priceAtTime)} each</div>
                    </div>
                  </div>
                  <div className="cart-price">{formatPrice(item.priceAtTime)}</div>
                  <div>
                    <div className="qty-control" style={{ width:'fit-content' }}>
                      <button className="qty-btn" onClick={() => updateQty(item.productID, item.quantity - 1)}><Minus size={12}/></button>
                      <input className="qty-input" value={item.quantity} readOnly style={{ width:48 }} />
                      <button className="qty-btn" onClick={() => updateQty(item.productID, item.quantity + 1)}><Plus size={12}/></button>
                    </div>
                  </div>
                  <div className="cart-subtotal" style={{ color:'var(--pink)', fontWeight:700 }}>{formatPrice(item.priceAtTime * item.quantity)}</div>
                  <button className="cart-remove" onClick={() => removeFromCart(item.productID)}><Trash2 size={14}/></button>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:16 }}>
              <Link to="/shop" className="btn btn-ghost"><ArrowRight size={14} style={{ transform:'rotate(180deg)' }} /> Continue Shopping</Link>
            </div>
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span className="label">Subtotal ({items.reduce((s,i)=>s+i.quantity,0)} items)</span><span className="value">{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div className="summary-row"><span className="label">Discount</span><span className="value" style={{ color:'#1a8a4a' }}>- {formatPrice(discount)}</span></div>}
            <div className="summary-row"><span className="label">Tax (5%)</span><span className="value">{formatPrice(tax)}</span></div>
            <div className="summary-row"><span className="label">Delivery</span><span className="value" style={{ color:'#1a8a4a' }}>{subtotal >= 2000 ? 'Free' : formatPrice(150)}</span></div>
            <div className="summary-row total"><span className="label" style={{ fontWeight:700 }}>Total</span><span className="value">{formatPrice(total)}</span></div>

            {/* Coupon */}
            {!appliedCoupon ? (
              <div>
                <div className="coupon-input">
                  <input placeholder="Enter coupon code" value={couponCode} onChange={e => setCouponCode(e.target.value)} onKeyDown={e => e.key==='Enter' && handleCoupon()} />
                  <button className="btn btn-outline btn-sm" onClick={handleCoupon}><Tag size={14}/> Apply</button>
                </div>
                {couponError && <div className="alert alert-error" style={{ padding:'8px 12px', fontSize:13 }}>{couponError}</div>}
                {couponSuccess && <div className="alert alert-success" style={{ padding:'8px 12px', fontSize:13 }}>{couponSuccess}</div>}
                <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:4 }}>Try: WELCOME20, FLAT500, SUMMER15</p>
              </div>
            ) : (
              <div className="alert alert-success" style={{ justifyContent:'space-between' }}>
                <span><Tag size={14}/> {appliedCoupon.couponCode} applied!</span>
                <button onClick={removeCoupon} style={{ background:'none', border:'none', cursor:'pointer' }}><X size={14}/></button>
              </div>
            )}

            <button className="btn btn-primary btn-full" style={{ marginTop:16 }} onClick={handleCheckout}>
              Proceed to Checkout <ArrowRight size={16}/>
            </button>
            <div style={{ marginTop:16, textAlign:'center', fontSize:12, color:'var(--text-muted)' }}>
              🔒 Secure checkout — Your data is protected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
