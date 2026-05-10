import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phoneNumber:'', password:'', confirmPassword:'', storeName:'' });

  const set = (k) => (e) => setForm(f => ({...f, [k]: e.target.value}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const result = register({ ...form, userType: role });
    setLoading(false);
    if (result.success) navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="logo">Dressora</div>
          <p>Join thousands of fashion lovers. Create your account and start exploring the latest trends.</p>
          <div className="img-placeholder" style={{ width:280, height:260, borderRadius:20, margin:'32px auto' }}>
            <span style={{ color:'rgba(255,255,255,0.5)', background:'rgba(255,255,255,0.05)' }}>📷 Register Image</span>
          </div>
          <div style={{ marginTop:16 }}>
            {[{ icon:'🎁', text:'Earn loyalty points on every order' },{ icon:'💳', text:'Exclusive member-only discounts' },{ icon:'📦', text:'Track orders in real time' }].map(item => (
              <div key={item.text} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10, fontSize:14, color:'rgba(255,255,255,0.7)' }}>
                <span>{item.icon}</span> {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap" style={{ maxWidth:480 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24 }}>
            <span style={{ width:36, height:36, background:'linear-gradient(90deg,#f92c8b,#b02cd6)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'white' }}><ShoppingBag size={18} /></span>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.3rem', fontWeight:700, background:'linear-gradient(90deg,#f92c8b,#b02cd6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Dressora</span>
          </div>
          <h2>Create Account</h2>
          <p className="subtitle">Join Dressora and start your fashion journey today</p>

          {/* Role Selector */}
          <div style={{ marginBottom:20 }}>
            <label className="form-label">I want to</label>
            <div className="role-selector">
              {[{ val:'customer', label:'🛍️ Shop as Customer' },{ val:'seller', label:'🏪 Sell on Dressora' }].map(r => (
                <button key={r.val} type="button" className={`role-btn ${role===r.val?'active':''}`} onClick={() => setRole(r.val)}>{r.label}</button>
              ))}
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input className="form-control" placeholder="Fatima" value={form.firstName} onChange={set('firstName')} required />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input className="form-control" placeholder="Khan" value={form.lastName} onChange={set('lastName')} required />
              </div>
            </div>
            {role === 'seller' && (
              <div className="form-group">
                <label className="form-label">Store Name</label>
                <input className="form-control" placeholder="My Fashion Store" value={form.storeName} onChange={set('storeName')} required />
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-control" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-control" type="tel" placeholder="0300-1234567" value={form.phoneNumber} onChange={set('phoneNumber')} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position:'relative' }}>
                  <input className="form-control" type={showPw?'text':'password'} placeholder="••••••••" value={form.password} onChange={set('password')} required style={{ paddingRight:40 }} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)' }}>
                    {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input className="form-control" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={set('confirmPassword')} required />
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom:20, fontSize:13, color:'var(--text-secondary)' }}>
              <input type="checkbox" required style={{ marginTop:2, accentColor:'var(--pink)' }} />
              <span>I agree to the <button type="button" onClick={() => {}} style={{ color:'var(--pink)', background:'none', border:'none', cursor:'pointer' }}>Terms of Service</button> and <button type="button" onClick={() => {}} style={{ color:'var(--pink)', background:'none', border:'none', cursor:'pointer' }}>Privacy Policy</button></span>
            </div>
            <button id="register-submit" className="btn btn-primary btn-full" type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : `Create ${role === 'seller' ? 'Seller' : ''} Account`}
            </button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
