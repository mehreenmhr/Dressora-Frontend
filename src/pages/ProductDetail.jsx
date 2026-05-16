import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, CheckCircle, Truck, RefreshCw, Shield } from 'lucide-react';
import { getReviewsByProduct, formatPrice, getDiscount } from '../data/mockData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ui/ProductCard';
import { fetchProductById, fetchProducts, fetchCategories } from '../services/api';
import '../styles/pages.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const p = await fetchProductById(id);
        setProduct(p);

        const [prodsData, catsData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        setCategory(catsData.find(c => c.categoryID === p.categoryID));
        setRelated(prodsData.filter(rp => rp.categoryID === p.categoryID && rp.productID !== p.productID && rp.isActive).slice(0, 4));
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <div style={{textAlign: 'center', padding: '100px', fontSize: '1.2rem'}}>Loading Product...</div>;

  if (!product) return (
    <div className="empty-state container" style={{ paddingTop: 80 }}>
      <div style={{ fontSize: 48 }}>😕</div>
      <h3>Product not found</h3>
      <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/shop')}>Back to Shop</button>
    </div>
  );

  const reviews = getReviewsByProduct(product.mockId || product.productID);
  const discountedPrice = getDiscount(product);

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
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.productName} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 16 }} 
                />
              ) : (
                <div className="img-placeholder" style={{ height: '100%', minHeight: 480 }}>
                  <span>📷 {product.productName}</span>
                </div>
              )}
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
              {related.map(p => <ProductCard key={p.productID || p._id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
