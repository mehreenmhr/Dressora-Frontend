import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#1a1a2e', color: 'rgba(255,255,255,0.7)', paddingTop: 56, marginTop: 'auto' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 40, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ width: 36, height: 36, background: 'linear-gradient(90deg,#f92c8b,#b02cd6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <ShoppingBag size={18} />
              </span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', fontWeight: 700, background: 'linear-gradient(90deg,#f92c8b,#b02cd6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Dressora
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              Your premier destination for fashion-forward clothing, accessories, and lifestyle products. Curated with love, delivered with care.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.06)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', transition: 'all 0.25s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg,#f92c8b,#b02cd6)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', fontSize: 15, marginBottom: 18, fontFamily: "'Inter',sans-serif" }}>Quick Links</h4>
            {[['Home','/'],['Shop','/shop'],['New Arrivals','/shop'],['Sale Items','/shop?category=6'],['About Us','#'],].map(([label, path]) => (
              <Link key={label} to={path} style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 10, transition: 'color 0.2s' }}
                onMouseEnter={e=>e.target.style.color='#f92c8b'}
                onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.6)'}>
                {label}
              </Link>
            ))}
          </div>

          {/* Customer */}
          <div>
            <h4 style={{ color: 'white', fontSize: 15, marginBottom: 18, fontFamily: "'Inter',sans-serif" }}>Customer</h4>
            {[['My Account','/account/profile'],['My Orders','/account/orders'],['Track Order','/account/orders'],['Addresses','/account/addresses'],['Login','/login'],].map(([label, path]) => (
              <Link key={label} to={path} style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 10, transition: 'color 0.2s' }}
                onMouseEnter={e=>e.target.style.color='#f92c8b'}
                onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.6)'}>
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontSize: 15, marginBottom: 18, fontFamily: "'Inter',sans-serif" }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { Icon: MapPin, text: 'Gulberg III, Lahore, Pakistan' },
                { Icon: Phone, text: '+92 300 1234567' },
                { Icon: Mail, text: 'hello@dressora.com' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14 }}>
                  <Icon size={15} style={{ color: '#f92c8b', marginTop: 2, flexShrink: 0 }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 13, marginBottom: 10 }}>Newsletter</p>
              <div style={{ display: 'flex', gap: 6 }}>
                <input placeholder="Your email" style={{ flex: 1, padding: '9px 12px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: 13, outline: 'none' }} />
                <button style={{ padding: '9px 16px', background: 'linear-gradient(90deg,#f92c8b,#b02cd6)', color: 'white', border: 'none', borderRadius: 4, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Go</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontSize: 13 }}>
          <p>© 2026 Dressora. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>Terms of Service</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
