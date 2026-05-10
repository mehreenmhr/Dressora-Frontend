import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, CheckCircle, Truck, RefreshCw, Shield } from 'lucide-react';
import { getProductById, getReviewsByProduct, formatPrice, getDiscount, categories } from '../data/mockData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/mockData';
import '../styles/pages.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = getProductById(Number(id));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return (
    <div className="empty-state container" style={{ paddingTop: 80 }}>
      <div style={{ fontSize: 48 }}>😕</div>
      <h3>Product not found</h3>
      <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/shop')}>Back to Shop</button>
    </div>
  );

  const reviews = getReviewsByProduct(product.productID);
  const discountedPrice = getDiscount(product);
  const category = categories.find(c => c.categoryID === product.categoryID);
  const related = products.filter(p => p.categoryID === product.categoryID && p.productID !== product.productID && p.isActive).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product.productID);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1 style={{ fontSize: '1.8rem' }}>{product.productName}</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <Link to={`/shop?category=${product.categoryID}`}>{category?.categoryName}</Link> / <span>{product.productName}</span>
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="product-detail-layout">
          {/* Images */}
          <div className="product-images">
            <div className="product-main-img">
              <div className="img-placeholder" style={{ height: '100%', minHeight: 480 }}>
                <span>📷 Main Product Image</span>
              </div>
            </div>
            <div className="product-thumbnails">
              {[1,2,3,4].map(i => (
                <div key={i} className={`product-thumb ${i===1?'active':''}`}>
                  <div className="img-placeholder" style={{ height: 80 }}>
                    <span style={{ fontSize: 10 }}>img {i}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="product-info">
            {product.discount > 0 && <span className="badge badge-primary" style={{ marginBottom: 12, display:'inline-block' }}>-{product.discount}% OFF</span>}
            <h1 className="product-title">{product.productName}</h1>

            <div className="product-meta">
              <span style={{ display:'flex', alignItems:'center', gap:4 }}>
                <span className="stars">{'★'.repeat(Math.round(product.rating))}</span>
                <strong>{product.rating}</strong>
              </span>
              <span>({reviews.length} reviews)</span>
              <span>SKU: {product.sku}</span>
            </div>

            <div className="product-price-big">
              {formatPrice(discountedPrice)}
              {product.discount > 0 && <span className="old">{formatPrice(product.basePrice)}</span>}
            </div>

            <p className="product-desc">{product.description}</p>

            <div className={`product-stock ${product.stockQuantity > 0 ? 'in-stock' : 'out-stock'}`}>
              {product.stockQuantity > 0 ? `✓ In Stock (${product.stockQuantity} available)` : '✗ Out of Stock'}
            </div>

            {/* Qty */}
            <div style={{ marginBottom: 20 }}>
              <div className="form-label">Quantity</div>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <input className="qty-input" type="number" value={qty} readOnly />
                <button className="qty-btn" onClick={() => setQty(q => Math.min(product.stockQuantity, q + 1))}>+</button>
              </div>
            </div>

            <div className="product-actions">
              <button className="btn btn-primary" style={{ flex:2, justifyContent:'center' }} onClick={handleAddToCart} disabled={!product.isActive || product.stockQuantity === 0}>
                {added ? <><CheckCircle size={16}/> Added!</> : <><ShoppingCart size={16}/> Add to Cart</>}
              </button>
              <button className="btn btn-outline btn-icon"><Heart size={18} /></button>
              <button className="btn btn-ghost btn-icon"><Share2 size={18} /></button>
            </div>

            {added && <div className="alert alert-success" style={{ marginTop: 12 }}>✓ Added to cart! <Link to="/cart" style={{ fontWeight:700, marginLeft:8 }}>View Cart →</Link></div>}

            {/* Perks */}
            <div style={{ marginTop: 24, display:'flex', flexDirection:'column', gap:10 }}>
              {[
                { icon: Truck, text: 'Free delivery on orders over Rs. 2,000' },
                { icon: RefreshCw, text: '30-day hassle-free returns' },
                { icon: Shield, text: '100% authentic product guaranteed' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'var(--text-secondary)' }}>
                  <Icon size={14} style={{ color:'var(--pink)', flexShrink:0 }} /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div style={{ marginTop: 64 }}>
          <h2 style={{ marginBottom: 24 }}>Customer Reviews ({reviews.length})</h2>
          {reviews.length === 0 ? (
            <p style={{ color:'var(--text-muted)' }}>No reviews yet. Be the first to review this product!</p>
          ) : (
            <div className="testimonial-grid">
              {reviews.map(r => (
                <div key={r.reviewID} className="review-card">
                  <div className="review-header">
                    <div className="review-avatar">{r.customerID === 1 ? 'FK' : 'SA'}</div>
                    <div>
                      <div className="reviewer-name">{r.customerID === 1 ? 'Fatima Khan' : 'Sara Ali'}</div>
                      <div className="review-date">{new Date(r.reviewDate).toLocaleDateString('en-PK', { month:'short', day:'numeric', year:'numeric' })}</div>
                    </div>
                  </div>
                  <div className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                  <p className="review-text">"{r.reviewText}"</p>
                  {r.isVerifiedPurchase && <div style={{ marginTop:8, fontSize:12, color:'#1a8a4a' }}>✓ Verified Purchase</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2 style={{ marginBottom: 28 }}>You May Also Like</h2>
            <div className="products-grid">
              {related.map(p => <ProductCard key={p.productID} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
