import { Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice, getDiscount, categories } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const discountedPrice = getDiscount(product);
  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
  const category = categories.find(c => c.categoryID === product.categoryID);

  return (
    <div className="product-card">
      <Link to={`/product/${product.productID}`}>
        <div className="product-card-img">
          {product.image ? (
            <img src={product.image} alt={product.productName} />
          ) : (
            <div className="img-placeholder" style={{ height: '100%' }}>
              <span>📷 {product.productName}</span>
            </div>
          )}
          <div className="product-card-badges">
            {product.discount > 0 && <span className="badge badge-primary">-{product.discount}%</span>}
            {product.stockQuantity < 10 && product.stockQuantity > 0 && <span className="badge badge-warning">Low Stock</span>}
            {product.stockQuantity === 0 && <span className="badge badge-danger">Sold Out</span>}
          </div>
          <div className="product-card-actions">
            <button className="product-card-action-btn" title="Quick View"><Eye size={14} /></button>
          </div>
        </div>
      </Link>
      <div className="product-card-body">
        <div className="category">{product.categoryName || 'Fashion'}</div>
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
          onClick={() => addToCart(product)}
          disabled={product.stockQuantity === 0}
        >
          <ShoppingCart size={14} />
          {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
