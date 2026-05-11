import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Truck, RefreshCw, CreditCard, Headphones, Shield, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { categories, featuredProducts, reviews, newArrivals } from '../data/mockData';
import '../styles/home.css';

// Import Category representative images
import modestImg from '../assets/Modest/black-white-cut-abaya.jpeg';
import easternImg from '../assets/Eastern/cream-green-2-piece.jpeg';
import westernImg from '../assets/Western/brownish-cord-set.webp';
import saleImg from '../assets/Extra/Sale.png';

const categoryImages = {
  1: modestImg,
  2: easternImg,
  3: westernImg
};

const features = [
  { icon: Truck,       title: 'Free Delivery',    sub: 'On orders over Rs. 2,000' },
  { icon: RefreshCw,   title: 'Easy Returns',      sub: '30-day return policy' },
  { icon: CreditCard,  title: 'Secure Payment',    sub: 'Multiple payment options' },
  { icon: Headphones,  title: '24/7 Support',      sub: 'Always here to help' },
  { icon: Shield,      title: '100% Authentic',    sub: 'Verified sellers only' },
];

export default function Home() {
  const navigate = useNavigate();
  const topCategories = categories.filter(c => !c.parentCategoryID);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-tag">✨ New Season Collection 2026</div>
          <h1>Discover Your <span>Perfect Style</span> with Dressora</h1>
          <p>Explore thousands of handpicked fashion pieces from top sellers. From everyday casuals to elegant evening wear — all in one place.</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop')}>
              Shop Now <ArrowRight size={18} />
            </button>
            <button className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }} onClick={() => navigate('/shop')}>
              Browse Categories
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">10K+</div><div className="label">Products</div></div>
            <div className="hero-stat"><div className="num">5K+</div><div className="label">Happy Customers</div></div>
            <div className="hero-stat"><div className="num">200+</div><div className="label">Brands</div></div>
            <div className="hero-stat"><div className="num">4.9★</div><div className="label">Avg Rating</div></div>
          </div>
        </div>
      </section>

      {/* ── Feature Bar ── */}
      <section className="feature-bar">
        <div className="container">
          <div className="feature-bar-grid">
            {features.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="feature-item">
                <div className="feature-icon"><Icon size={20} /></div>
                <div className="feature-text">
                  <div className="title">{title}</div>
                  <div className="sub">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">Browse by Category</div>
            <h2>Shop by Your Style</h2>
            <p>Find exactly what you're looking for in our curated category collection</p>
          </div>
          <div className="category-grid">
            {topCategories.map((cat, index) => (
              <Link to={`/shop?category=${cat.categoryID}`} key={cat.categoryID} className="category-card">
                <div className="category-card-img">
                  {categoryImages[cat.categoryID] ? (
                    <img src={categoryImages[cat.categoryID]} alt={cat.categoryName} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#F1E9E9' }} />
                  ) : (
                    <div className="img-placeholder" style={{ height: '100%' }}>
                      <span>{cat.icon}</span>
                    </div>
                  )}
                </div>
                <div className="name">{cat.categoryName}</div>
                <div className="count">View All</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <div className="eyebrow" style={{ color: 'var(--pink)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>Hand Picked For You</div>
              <h2 style={{ marginBottom: 0 }}>Featured Products</h2>
            </div>
            <Link to="/shop" className="btn btn-outline btn-sm">View All <ChevronRight size={14} /></Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map(p => <ProductCard key={p.productID} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <section className="section">
        <div className="container">
          <div className="promo-banner">
            <div className="promo-banner-text">
              <h2>Up to 30% Off<br/>Summer Collection</h2>
              <p>Use code <strong>SUMMER15</strong> at checkout for an extra 15% off</p>
            </div>
            <div className="promo-banner-actions">
              <img 
                src={saleImg} 
                alt="Sale Banner"
                style={{ 
                  width: 200, 
                  height: 180, 
                  borderRadius: 16, 
                  marginBottom: 20,
                  objectFit: 'cover'
                }}
              />
              <button className="btn btn-white btn-lg" onClick={() => navigate('/shop?category=6')} style={{ display: 'block', width: '100%', justifyContent: 'center' }}>
                Shop Sale <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <div className="eyebrow" style={{ color: 'var(--pink)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>Just Arrived</div>
              <h2 style={{ marginBottom: 0 }}>New Arrivals</h2>
            </div>
            <Link to="/shop" className="btn btn-outline btn-sm">See More <ChevronRight size={14} /></Link>
          </div>
          <div className="products-grid">
            {newArrivals.map(p => <ProductCard key={p.productID} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">What Our Customers Say</div>
            <h2>Loved by Thousands</h2>
            <p>Real reviews from real customers who shop with Dressora</p>
          </div>
          <div className="testimonial-grid">
            {reviews.slice(0, 3).map(r => (
              <div key={r.reviewID} className="review-card">
                <div className="review-header">
                  <div className="review-avatar">{r.customerID === 1 ? 'FK' : 'SA'}</div>
                  <div>
                    <div className="reviewer-name">{r.customerID === 1 ? 'Fatima Khan' : 'Sara Ali'}</div>
                    <div className="review-date">{new Date(r.reviewDate).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                </div>
                <div className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                <p className="review-text">"{r.reviewText}"</p>
                {r.isVerifiedPurchase && (
                  <div style={{ marginTop: 10, fontSize: 12, color: '#1a8a4a', display: 'flex', alignItems: 'center', gap: 4 }}>
                    ✓ Verified Purchase
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
