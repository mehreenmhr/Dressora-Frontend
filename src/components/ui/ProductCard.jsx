import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice, getDiscount } from '../../data/mockData';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const discountedPrice = getDiscount(product);
  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));

  return (
    <div className="product-card">
      <Link to={`/product/${product.productID}`}>
        <div className="product-card-img">
          {product.image ? (
            <div style={{ background: '#F1E9E9', borderRadius: '8px 8px 0 0', overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={product.image} alt={product.productName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          ) : (
            <div className="img-placeholder" style={{ aspectRatio: '3/4' }}>
              <span>📷 Product Image</span>
            </div>
          )}
          <div className="product-card-badges">
            {product.discount > 0 && <span className="badge badge-primary">-{product.discount}%</span>}
            {product.stockQuantity < 10 && product.stockQuantity > 0 && <span className="badge badge-warning">Low Stock</span>}
            {product.stockQuantity === 0 && <span className="badge badge-danger">Sold Out</span>}
          </div>
          <div className="product-card-actions">
            <button className="product-card-action-btn" title="Wishlist"><Heart size={14} /></button>
            <button className="product-card-action-btn" title="Quick View"><Eye size={14} /></button>
          </div>
        </div>
      </Link>
      <div className="product-card-body">
        <div className="category">{product.categoryID === 7 ? 'Dress' : product.categoryID === 8 ? 'Top' : product.categoryID === 9 ? 'Shirt' : product.categoryID === 10 ? 'Trousers' : product.categoryID === 4 ? 'Accessory' : 'Footwear'}</div>
        <Link to={`/product/${product.productID}`}><div className="name">{product.productName}</div></Link>
        <div className="rating">
          <span className="stars" style={{ fontSize: 12 }}>{stars}</span>
          <span className="count">({product.reviewCount})</span>
        </div>
        <div className="product-card-price">
          <span className="price">{formatPrice(discountedPrice)}</span>
          {product.discount > 0 && <span className="old-price">{formatPrice(product.basePrice)}</span>}
        </div>
      </div>
      <div className="product-card-footer">
        <button
          className="product-add-btn"
          onClick={() => addToCart(product.productID)}
          disabled={product.stockQuantity === 0}
        >
          <ShoppingCart size={14} />
          {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
