// ============================================================
// DRESSORA — Mock Data (matches full DB schema)
// ============================================================

// Import Modest category example images
// Import Modest category example images
import img1 from '../assets/Modest/black-white-cut-abaya.jpeg';
import img2 from '../assets/Modest/black-umbrella-abaya.jpeg';
import img3 from '../assets/Modest/blue-open-cut-abaya.jpeg';
import img4 from '../assets/Modest/modest-navy-frock-abaya.jpeg';
import img5 from '../assets/Modest/modest-open-cut-abaya.jpeg';
import img6 from '../assets/Modest/pink-floral-abaya.jpeg';

// Import Eastern category images
import eastern1 from '../assets/Eastern/cream-green-2-piece.jpeg';
import eastern2 from '../assets/Eastern/cream-green-garden.jpeg';
import eastern3 from '../assets/Eastern/grey-embroidery-3-piece.jpeg';
import eastern4 from '../assets/Eastern/lilac-skin-shirt.jpeg';
import eastern5 from '../assets/Eastern/orange-pretty-3-piece.jpeg';
import eastern6 from '../assets/Eastern/pastel-green.jpeg';
import eastern7 from '../assets/Eastern/purplish-pink-embroider.jpeg';
import eastern8 from '../assets/Eastern/sky-embroidery-dream.jpeg';
import eastern9 from '../assets/Eastern/white-cotton-fairy.jpeg';

// Import Western category images
import western1 from '../assets/Western/Blackish Green Pant Shirt.webp';
import western2 from '../assets/Western/brownish-cord-set.webp';
import western3 from '../assets/Western/mehroon-tshirt-pants.webp';
import western4 from '../assets/Western/mini-black-frock-shirt.jpeg';
import western5 from '../assets/Western/Garden Tree Set.avif';
import western6 from '../assets/Western/Lilac Spring Combo.webp';

export const categories = [
  { categoryID: 1, parentCategoryID: null, categoryName: "Modest", description: "Modest fashion styles", icon: "👗" },
  { categoryID: 2, parentCategoryID: null, categoryName: "Eastern", description: "Eastern wear collection", icon: "🥻" },
  { categoryID: 3, parentCategoryID: null, categoryName: "Western", description: "Western fashion styles", icon: "👔" },
];

export const users = [
  { userID: 1, email: "customer@dressora.com", passwordHash: "hashed", phoneNumber: "0300-1234567", dateRegistered: "2024-01-15", isActive: true, userType: "customer" },
  { userID: 2, email: "seller@dressora.com", passwordHash: "hashed", phoneNumber: "0311-9876543", dateRegistered: "2023-11-20", isActive: true, userType: "seller" },
  { userID: 3, email: "admin@dressora.com", passwordHash: "hashed", phoneNumber: "0321-5555555", dateRegistered: "2023-06-01", isActive: true, userType: "admin" },
  { userID: 4, email: "sara@example.com", passwordHash: "hashed", phoneNumber: "0333-4444444", dateRegistered: "2024-03-10", isActive: true, userType: "customer" },
  { userID: 5, email: "ahmed@example.com", passwordHash: "hashed", phoneNumber: "0345-7777777", dateRegistered: "2024-04-01", isActive: false, userType: "customer" },
];

export const customers = [
  { customerID: 1, userID: 1, firstName: "Fatima", lastName: "Khan", dateOfBirth: "1995-06-15", loyaltyPoints: 450 },
  { customerID: 2, userID: 4, firstName: "Sara", lastName: "Ali", dateOfBirth: "1998-02-20", loyaltyPoints: 120 },
  { customerID: 3, userID: 5, firstName: "Ahmed", lastName: "Raza", dateOfBirth: "1990-11-05", loyaltyPoints: 0 },
];

export const sellers = [
  { sellerID: 1, userID: 2, storeName: "TrendVault", storeDescription: "Premium fashion for every occasion", rating: 4.8, joinedAt: "2023-11-20" },
];

export const admins = [
  { adminID: 1, userID: 3, adminLevel: 1, lastLogin: "2026-05-10" },
];

export const addresses = [
  { addressID: 1, customerID: 1, street: "House 12, Block B, Gulberg III", city: "Lahore", state: "Punjab", postalCode: "54000", country: "Pakistan", addressType: "home", isDefault: true },
  { addressID: 2, customerID: 1, street: "Office 5, DHA Phase 5", city: "Lahore", state: "Punjab", postalCode: "54792", country: "Pakistan", addressType: "work", isDefault: false },
  { addressID: 3, customerID: 2, street: "Flat 3, F-10 Markaz", city: "Islamabad", state: "ICT", postalCode: "44000", country: "Pakistan", addressType: "home", isDefault: true },
];

export const products = [
  { productID: 1, sellerID: 1, categoryID: 2, productName: "Cream Green 2 Piece", description: "Elegant cream and green 2-piece eastern suit.", basePrice: 3500, stockQuantity: 45, sku: "DRS-FLR-001", isActive: true, createdAt: "2024-01-10", rating: 4.7, reviewCount: 23, discount: 15, image: eastern1 },
  { productID: 2, sellerID: 1, categoryID: 2, productName: "Cream Green Garden", description: "Beautiful floral themed eastern wear.", basePrice: 4200, stockQuantity: 12, sku: "DRS-VLT-002", isActive: true, createdAt: "2024-01-15", rating: 4.9, reviewCount: 41, discount: 0, image: eastern2 },

  { productID: 4, sellerID: 1, categoryID: 3, productName: "Mini Black Frock Shirt", description: "Elegant mini black frock shirt for a modern look.", basePrice: 2200, stockQuantity: 60, sku: "WST-FRK-004", isActive: true, createdAt: "2024-02-10", rating: 4.5, reviewCount: 32, discount: 0, image: western4 },
  { productID: 5, sellerID: 1, categoryID: 3, productName: "Brownish Cord Set", description: "Comfortable and stylish brownish cord set.", basePrice: 2800, stockQuantity: 55, sku: "WST-CRD-005", isActive: true, createdAt: "2024-02-20", rating: 4.6, reviewCount: 28, discount: 20, image: western2 },

  { productID: 7, sellerID: 1, categoryID: 2, productName: "Grey Embroidery 3 Piece", description: "Sophisticated grey 3-piece suit with intricate embroidery.", basePrice: 5200, stockQuantity: 40, sku: "ACC-BAG-007", isActive: true, createdAt: "2024-03-10", rating: 4.4, reviewCount: 11, discount: 25, image: eastern3 },
  { productID: 8, sellerID: 1, categoryID: 2, productName: "Lilac Skin Shirt", description: "Stylish lilac shirt with premium fabric.", basePrice: 2800, stockQuantity: 25, sku: "DRS-BOH-008", isActive: true, createdAt: "2024-03-20", rating: 4.6, reviewCount: 36, discount: 0, image: eastern4 },

  { productID: 10, sellerID: 1, categoryID: 3, productName: "Mehroon T-Shirt with Pants", description: "Casual mehroon t-shirt paired with comfortable pants.", basePrice: 1200, stockQuantity: 100, sku: "WST-SET-010", isActive: true, createdAt: "2024-04-10", rating: 4.9, reviewCount: 67, discount: 0, image: western3 },
  { productID: 11, sellerID: 1, categoryID: 3, productName: "Garden Tree Set", description: "Trendy garden tree set with stylish design.", basePrice: 1900, stockQuantity: 50, sku: "WST-SHT-011", isActive: true, createdAt: "2024-04-15", rating: 4.2, reviewCount: 9, discount: 0, image: western5 },
  { productID: 12, sellerID: 1, categoryID: 2, productName: "Orange Pretty 3 Piece", description: "Vibrant orange 3-piece eastern outfit.", basePrice: 4900, stockQuantity: 35, sku: "DRS-PST-012", isActive: true, createdAt: "2024-04-20", rating: 4.5, reviewCount: 18, discount: 10, image: eastern5 },
  { productID: 101, sellerID: 1, categoryID: 1, productName: 'Black and White Cut Abaya', description: 'Elegant black and white cut abaya', basePrice: 4500, stockQuantity: 50, sku: 'MOD-001', isActive: true, createdAt: '2026-05-01', rating: 4.8, reviewCount: 28, discount: 15, image: img1 },
  { productID: 102, sellerID: 1, categoryID: 1, productName: 'Black Umbrella Abaya', description: 'Classic black umbrella style abaya', basePrice: 5200, stockQuantity: 50, sku: 'MOD-002', isActive: true, createdAt: '2026-05-01', rating: 4.7, reviewCount: 19, discount: 0, image: img2 },
  { productID: 103, sellerID: 1, categoryID: 1, productName: 'Blue Open Cut Abaya', description: 'Beautiful blue open cut abaya', basePrice: 4800, stockQuantity: 50, sku: 'MOD-003', isActive: true, createdAt: '2026-05-01', rating: 4.9, reviewCount: 35, discount: 10, image: img3 },
  { productID: 104, sellerID: 1, categoryID: 1, productName: 'Modest Navy Frok Abaya', description: 'Navy frock style modest abaya', basePrice: 5000, stockQuantity: 50, sku: 'MOD-004', isActive: true, createdAt: '2026-05-01', rating: 4.6, reviewCount: 22, discount: 20, image: img4 },
  { productID: 105, sellerID: 1, categoryID: 1, productName: 'Modest Open Cut Abaya', description: 'Stylish open cut modest abaya', basePrice: 4700, stockQuantity: 50, sku: 'MOD-005', isActive: true, createdAt: '2026-05-01', rating: 4.8, reviewCount: 31, discount: 0, image: img5 },
  { productID: 106, sellerID: 1, categoryID: 1, productName: 'Pink Floral Abaya', description: 'Pink floral printed modest abaya', basePrice: 4900, stockQuantity: 50, sku: 'MOD-006', isActive: true, createdAt: '2026-05-01', rating: 4.9, reviewCount: 42, discount: 15, image: img6 },
  { productID: 107, sellerID: 1, categoryID: 2, productName: 'Pastel Green', description: 'Refreshing pastel green eastern wear.', basePrice: 3800, stockQuantity: 10, sku: 'EST-001', isActive: true, createdAt: '2026-05-05', rating: 5.0, reviewCount: 12, discount: 5, image: eastern6 },
  { productID: 108, sellerID: 1, categoryID: 2, productName: 'Purplish With Pink Embroider', description: 'Elegant purplish suit with pink embroidery.', basePrice: 5500, stockQuantity: 15, sku: 'EST-002', isActive: true, createdAt: '2026-05-05', rating: 4.8, reviewCount: 8, discount: 0, image: eastern7 },
  { productID: 109, sellerID: 1, categoryID: 2, productName: 'Sky Embroidery Dream', description: 'Dreamy sky blue embroidered suit.', basePrice: 6200, stockQuantity: 5, sku: 'EST-003', isActive: true, createdAt: '2026-05-05', rating: 4.9, reviewCount: 14, discount: 10, image: eastern8 },
  { productID: 110, sellerID: 1, categoryID: 2, productName: 'White Cotton Fairy', description: 'Pure white cotton fairy-style eastern wear.', basePrice: 4500, stockQuantity: 3, sku: 'EST-004', isActive: true, createdAt: '2026-05-05', rating: 5.0, reviewCount: 5, discount: 0, image: eastern9 },
  { productID: 112, sellerID: 1, categoryID: 3, productName: "Blackish Green Pant Shirt", description: "Stylish blackish green pant shirt for a modern look.", basePrice: 2100, stockQuantity: 30, sku: "WST-SHT-112", isActive: true, createdAt: "2024-05-01", rating: 4.4, reviewCount: 15, discount: 0, image: western1 },
  { productID: 113, sellerID: 1, categoryID: 3, productName: "Lilac Spring Combo", description: "Beautiful lilac spring combo outfit perfect for the season.", basePrice: 3200, stockQuantity: 20, sku: "WST-SET-113", isActive: true, createdAt: "2024-05-05", rating: 4.7, reviewCount: 8, discount: 5, image: western6 },
];

export const carts = [
  { cartID: 1, customerID: 1, createdAt: "2026-05-01", updatedAt: "2026-05-10", status: "active" },
  { cartID: 2, customerID: 2, createdAt: "2026-04-28", updatedAt: "2026-05-08", status: "active" },
];

export const cartItems = [
  { cartItemID: 1, cartID: 1, productID: 1, quantity: 2, priceAtTime: 3500, addedAt: "2026-05-09" },
  { cartItemID: 2, cartID: 1, productID: 9, quantity: 1, priceAtTime: 2600, addedAt: "2026-05-10" },
  { cartItemID: 3, cartID: 2, productID: 6, quantity: 1, priceAtTime: 5500, addedAt: "2026-05-08" },
];

export const orders = [
  { orderID: 1, customerID: 1, shippingAddressID: 1, billingAddressID: 1, orderDate: "2026-04-15", totalAmount: 8500, discountAmount: 500, taxAmount: 400, finalAmount: 8400, orderStatus: "delivered" },
  { orderID: 2, customerID: 1, shippingAddressID: 1, billingAddressID: 1, orderDate: "2026-05-02", totalAmount: 5500, discountAmount: 0, taxAmount: 275, finalAmount: 5775, orderStatus: "shipped" },
  { orderID: 3, customerID: 2, shippingAddressID: 3, billingAddressID: 3, orderDate: "2026-05-08", totalAmount: 3200, discountAmount: 800, taxAmount: 120, finalAmount: 2520, orderStatus: "processing" },
];

export const orderItems = [
  { orderItemID: 1, orderID: 1, productID: 2, quantity: 1, unitPrice: 8500, subtotal: 8500 },
  { orderItemID: 2, orderID: 2, productID: 6, quantity: 1, unitPrice: 5500, subtotal: 5500 },
  { orderItemID: 3, orderID: 3, productID: 7, quantity: 1, unitPrice: 3200, subtotal: 3200 },
];

export const payments = [
  { paymentID: 1, orderID: 1, paymentMethod: "credit_card", paymentStatus: "completed", amountPaid: 8400, transactionID: "TXN-001-2026", paymentDate: "2026-04-15" },
  { paymentID: 2, orderID: 2, paymentMethod: "online", paymentStatus: "completed", amountPaid: 5775, transactionID: "TXN-002-2026", paymentDate: "2026-05-02" },
  { paymentID: 3, orderID: 3, paymentMethod: "cod", paymentStatus: "pending", amountPaid: 0, transactionID: null, paymentDate: null },
];

export const shippings = [
  { shippingID: 1, orderID: 1, trackingNumber: "TCS-00123456", carrier: "TCS", shippingStatus: "delivered", shippedDate: "2026-04-16", estimatedDelivery: "2026-04-19", actualDelivery: "2026-04-18" },
  { shippingID: 2, orderID: 2, trackingNumber: "LPK-00987654", carrier: "Leopards", shippingStatus: "in_transit", shippedDate: "2026-05-03", estimatedDelivery: "2026-05-06", actualDelivery: null },
  { shippingID: 3, orderID: 3, trackingNumber: null, carrier: null, shippingStatus: "processing", shippedDate: null, estimatedDelivery: "2026-05-12", actualDelivery: null },
];

export const reviews = [
  { reviewID: 1, productID: 2, customerID: 1, rating: 5, reviewText: "Absolutely stunning! The quality is exceptional and it fits perfectly. I wore it to a wedding and got so many compliments.", reviewDate: "2026-04-20", isVerifiedPurchase: true },
  { reviewID: 2, productID: 9, customerID: 2, rating: 5, reviewText: "The embroidery is so detailed and beautiful. Fabric is super soft. Will definitely buy more!", reviewDate: "2026-05-01", isVerifiedPurchase: true },
  { reviewID: 3, productID: 6, customerID: 1, rating: 4, reviewText: "Great bag, very spacious and the leather quality is good. Shipping was fast too.", reviewDate: "2026-05-05", isVerifiedPurchase: true },
  { reviewID: 4, productID: 1, customerID: 2, rating: 5, reviewText: "Love the floral pattern! Perfect for summer. The wrap style is very flattering.", reviewDate: "2026-04-28", isVerifiedPurchase: false },
  { reviewID: 5, productID: 7, customerID: 1, rating: 4, reviewText: "Very comfortable and stylish. The block heel gives a good height without hurting.", reviewDate: "2026-05-03", isVerifiedPurchase: true },
  { reviewID: 6, productID: 10, customerID: 2, rating: 5, reviewText: "Such delicate and elegant earrings. Perfect gift quality. Beautiful packaging!", reviewDate: "2026-05-07", isVerifiedPurchase: false },
];

export const coupons = [
  { couponID: 1, couponCode: "WELCOME20", discountType: "percentage", discountValue: 20, minOrderAmount: 2000, expiryDate: "2026-12-31", usageLimit: 100, timesUsed: 34 },
  { couponID: 2, couponCode: "FLAT500", discountType: "fixed", discountValue: 500, minOrderAmount: 3000, expiryDate: "2026-07-31", usageLimit: 50, timesUsed: 12 },
  { couponID: 3, couponCode: "SUMMER15", discountType: "percentage", discountValue: 15, minOrderAmount: 1500, expiryDate: "2026-06-30", usageLimit: 200, timesUsed: 87 },
  { couponID: 4, couponCode: "FLASH30", discountType: "percentage", discountValue: 30, minOrderAmount: 5000, expiryDate: "2026-05-31", usageLimit: 25, timesUsed: 25 },
];

export const orderCoupons = [
  { orderID: 1, couponID: 1, appliedAt: "2026-04-15" },
  { orderID: 3, couponID: 2, appliedAt: "2026-05-08" },
];

// Helpers
export const getProductById = (id) => products.find(p => p.productID === id);
export const getCategoryById = (id) => categories.find(c => c.categoryID === id);
export const getProductsByCategory = (id) => products.filter(p => p.categoryID === id && p.isActive);
export const getCustomerById = (id) => customers.find(c => c.customerID === id);
export const getOrdersByCustomer = (id) => orders.filter(o => o.customerID === id);
export const getOrderItems = (orderID) => orderItems.filter(i => i.orderID === orderID);
export const getShipping = (orderID) => shippings.find(s => s.orderID === orderID);
export const getPayment = (orderID) => payments.find(p => p.orderID === orderID);
export const getReviewsByProduct = (id) => reviews.filter(r => r.productID === id);
export const getAddressesByCustomer = (id) => addresses.filter(a => a.customerID === id);
export const featuredProducts = products.filter(p => p.isActive).slice(0, 8);
export const newArrivals = products.filter(p => p.isActive).slice(-4);

export const orderStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

export const formatPrice = (price) => `Rs. ${price.toLocaleString()}`;
export const getDiscount = (product) =>
  product.discount > 0 ? Math.round(product.basePrice * (1 - product.discount / 100)) : product.basePrice;
