import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const demoCredentials = [
    { label: 'Customer', email: 'customer@dressora.com', password: 'customer123' },
    { label: 'Seller',   email: 'seller@dressora.com',   password: 'seller123' },
    { label: 'Admin',    email: 'admin@dressora.com',     password: 'admin123' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      // Redirect based on role
      if (form.email.includes('seller')) navigate('/seller');
      else if (form.email.includes('admin')) navigate('/admin');
      else navigate('/');
    } else {
      setError(result.message);
    }
  };

  const fillDemo = (cred) => setForm({ email: cred.email, password: cred.password });

  return (
    <div className="auth-page">
      {/* Left panel */}
      <div className="auth-left">
        <div className="auth-brand">
          <div className="logo">Dressora</div>
          <p>Welcome back! Sign in to continue your fashion journey with thousands of curated products.</p>
          <div className="img-placeholder" style={{ width: 280, height: 300, borderRadius: 20, margin: '32px auto' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.05)' }}>📷 Fashion Image</span>
          </div>
          <div style={{ marginTop: 16 }}>
            {[{ icon: '🛍️', text: 'Shop 10,000+ products' }, { icon: '⚡', text: 'Fast delivery across Pakistan' }, { icon: '🔒', text: '100% secure payments' }].map(item => (
              <div key={item.text} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10, fontSize:14, color:'rgba(255,255,255,0.7)' }}>
                <span>{item.icon}</span> {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-right">
        <div className="auth-form-wrap">
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28 }}>
            <span style={{ width:36, height:36, background:'linear-gradient(90deg,#f92c8b,#b02cd6)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'white' }}>
              <ShoppingBag size={18} />
            </span>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.3rem', fontWeight:700, background:'linear-gradient(90deg,#f92c8b,#b02cd6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Dressora</span>
          </div>
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to your account to continue shopping</p>

          {error && <div className="alert alert-error">{error}</div>}

          {/* Demo logins */}
          <div style={{ marginBottom:20 }}>
            <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:8, fontWeight:600, textTransform:'uppercase', letterSpacing:1 }}>Quick Demo Login:</p>
            <div style={{ display:'flex', gap:6 }}>
              {demoCredentials.map(c => (
                <button key={c.label} className="btn btn-ghost btn-sm" onClick={() => fillDemo(c)} style={{ flex:1, fontSize:12 }}>{c.label}</button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input id="login-email" className="form-control" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ display:'flex', justifyContent:'space-between' }}>
                Password <a href="#" style={{ fontSize:12, color:'var(--pink)', fontWeight:500 }}>Forgot password?</a>
              </label>
              <div style={{ position:'relative' }}>
                <input id="login-password" className="form-control" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required style={{ paddingRight:44 }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button id="login-submit" className="btn btn-primary btn-full" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
      </div>
    </div>
  );
}
