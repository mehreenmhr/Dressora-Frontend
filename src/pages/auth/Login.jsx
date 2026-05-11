import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages.css';

// Import login background image and logo
import loginBg2 from '../../assets/Extra/login-bg-2.png';
import logo from '../../assets/logo.png';

const authLeftStyle = {
  backgroundImage: `url(${loginBg2})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
};

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
      {/* Left panel - Form */}
      <div className="auth-right">
        <div className="auth-form-wrap">
          <button onClick={() => navigate(-1)} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:20, background:'none', border:'none', color:'#f92c8b', cursor:'pointer', fontSize:14, fontWeight:600 }}>
            <ArrowLeft size={18} /> Back
          </button>
          <img src={logo} alt="Dressora Logo" style={{ height: 52, marginBottom: 28 }} />
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to your account to continue shopping</p>

          {error && <div className="alert alert-error">{error}</div>}

          {/* Demo logins */}
          <div style={{ marginBottom:20 }}>
            <p style={{ fontSize:12, color:'#666666', marginBottom:8, fontWeight:600, textTransform:'uppercase', letterSpacing:1 }}>Quick Demo Login:</p>
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
                Password <button type="button" onClick={() => {}} style={{ fontSize:12, color:'#f92c8b', fontWeight:500, background:'none', border:'none', cursor:'pointer' }}>Forgot password?</button>
              </label>
              <div style={{ position:'relative' }}>
                <input id="login-password" className="form-control" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required style={{ paddingRight:44 }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'#666666', cursor:'pointer' }}>
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

      {/* Right panel - Background */}
      <div className="auth-left" style={authLeftStyle}></div>
    </div>
  );
}
