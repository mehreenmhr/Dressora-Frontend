import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { formatPrice } from '../data/mockData';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const orderID = state?.orderID || 'ORD-' + Date.now();
  const total = state?.total || 0;
  const paymentMethod = state?.paymentMethod || 'online';

  return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'48px 24px', background:'var(--bg-light)' }}>
      <div style={{ maxWidth:560, width:'100%', textAlign:'center' }}>
        <div style={{ width:96, height:96, background:'linear-gradient(135deg,#e6f9f0,#c0f0d8)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', animation:'pulse 2s infinite' }}>
          <CheckCircle size={48} style={{ color:'#1a8a4a' }} />
        </div>
        <style>{`@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }`}</style>

        <h1 style={{ fontSize:'2rem', marginBottom:8, fontFamily:"'Playfair Display',serif" }}>Order Placed! 🎉</h1>
        <p style={{ color:'var(--text-secondary)', marginBottom:32 }}>
          Thank you for shopping with Dressora! Your order has been received and is being processed.
        </p>

        <div style={{ background:'white', borderRadius:16, border:'1px solid var(--border)', padding:28, marginBottom:28, textAlign:'left' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
            {[
              { label:'Order ID', value:`#${orderID}` },
              { label:'Total Amount', value: formatPrice(total) },
              { label:'Payment', value: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment' },
              { label:'Status', value:'Confirmed ✓' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize:12, color:'var(--text-muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:0.5, marginBottom:4 }}>{label}</div>
                <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ padding:'16px 0', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', display:'flex', gap:24 }}>
            {[
              { icon: Package, label:'Order Confirmed', done: true },
              { icon: Package, label:'Processing',       done: false },
              { icon: Truck,   label:'Shipped',          done: false },
              { icon: Home,    label:'Delivered',        done: false },
            ].map(({ icon:Icon, label, done }) => (
              <div key={label} style={{ flex:1, textAlign:'center' }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background: done ? 'linear-gradient(90deg,#f92c8b,#b02cd6)' : 'var(--bg-light)', border: `2px solid ${done ? 'transparent' : 'var(--border)'}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 6px', color: done ? 'white' : 'var(--text-muted)' }}>
                  <Icon size={16} />
                </div>
                <div style={{ fontSize:11, color: done ? 'var(--pink)' : 'var(--text-muted)', fontWeight: done ? 600 : 400 }}>{label}</div>
              </div>
            ))}
          </div>
          {paymentMethod === 'cod' && (
            <div className="alert alert-info" style={{ marginTop:16 }}>
              💵 You've chosen Cash on Delivery. Please have the exact amount ready when your order arrives.
            </div>
          )}
        </div>

        <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
          <Link to="/account/orders" className="btn btn-primary">Track My Order</Link>
          <Link to="/shop" className="btn btn-outline">Continue Shopping</Link>
        </div>

        <p style={{ marginTop:20, fontSize:13, color:'var(--text-muted)' }}>
          A confirmation has been sent to your email. Questions? <a href="mailto:hello@dressora.com" style={{ color:'var(--pink)' }}>Contact us</a>
        </p>
      </div>
    </div>
  );
}
