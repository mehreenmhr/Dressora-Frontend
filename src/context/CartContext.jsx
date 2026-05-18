import { createContext, useContext, useState } from 'react';
import { getProductById, getDiscount } from '../data/mockData';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const addToCart = (productOrId, quantity = 1) => {
    const product = typeof productOrId === 'object'
      ? productOrId
      : getProductById(productOrId);
    if (!product || product.stockQuantity === 0) return;
    const productID = product.productID || product._id || product.mockId || productOrId;
    setItems(prev => {
      const exists = prev.find(i => i.productID === productID);
      if (exists) {
        return prev.map(i => i.productID === productID
          ? { ...i, quantity: Math.min(i.quantity + quantity, product.stockQuantity) }
          : i
        );
      }
      return [...prev, { productID, quantity, priceAtTime: getDiscount(product), product }];
    });
  };

  const removeFromCart = (productID) =>
    setItems(prev => prev.filter(i => i.productID !== productID));

  const updateQty = (productID, quantity) => {
    if (quantity < 1) { removeFromCart(productID); return; }
    setItems(prev => prev.map(i => i.productID === productID ? { ...i, quantity } : i));
  };

  const clearCart = () => { setItems([]); setAppliedCoupon(null); };

  const subtotal = items.reduce((sum, i) => sum + i.priceAtTime * i.quantity, 0);
  const discount = appliedCoupon
    ? (appliedCoupon.discountType === 'percentage'
        ? Math.round(subtotal * appliedCoupon.discountValue / 100)
        : appliedCoupon.discountValue)
    : 0;
  const tax = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + tax;
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  const applyCoupon = (coupon) => setAppliedCoupon(coupon);
  const removeCoupon = () => setAppliedCoupon(null);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQty, clearCart,
      subtotal, discount, tax, total, itemCount,
      appliedCoupon, applyCoupon, removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
}
