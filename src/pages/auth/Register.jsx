import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages.css';
const loginBg2 = '/assets/Extra/login-bg-2.png';
const logo = '/assets/logo.png';

const authLeftStyle = {
  backgroundImage: `url(${loginBg2})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
};

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
    const result = await register({ ...form, userType: role });
    setLoading(false);
    if (result.success) navigate('/');
    else setError(result.message);
  };

  return (
    <div className="auth-page">
      {/* Left panel - Form */}
      <div className="auth-right">
        <div className="auth-form-wrap" style={{ maxWidth:480 }}>
          <button onClick={() => navigate(-1)} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:20, background:'none', border:'none', color:'#f92c8b', cursor:'pointer', fontSize:14, fontWeight:600 }}>
            <ArrowLeft size={18} /> Back
          </button>
          <img src={logo} alt="Dressora Logo" style={{ height: 52, marginBottom: 24 }} />
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

      {/* Right panel - Background */}
      <div className="auth-left" style={authLeftStyle}></div>
    </div>
  );
}
