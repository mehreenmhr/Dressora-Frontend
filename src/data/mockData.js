// ============================================================
// DRESSORA — Mock Data (matches full DB schema)
// ============================================================

export const categories = [
  { categoryID: 1, parentCategoryID: null, categoryName: "Modest", description: "Modest fashion styles", icon: "👗" },
  { categoryID: 2, parentCategoryID: null, categoryName: "Eastern", description: "Eastern wear collection", icon: "🥻" },
  { categoryID: 3, parentCategoryID: null, categoryName: "Western", description: "Western fashion styles", icon: "👔" },
  { categoryID: 4, parentCategoryID: 1, categoryName: "Abayas", description: "Traditional abayas", icon: "👗" },
  { categoryID: 5, parentCategoryID: 1, categoryName: "Hijabs", description: "Hijab collection", icon: "🧣" },
  { categoryID: 6, parentCategoryID: 2, categoryName: "Saris", description: "Traditional saris", icon: "👗" },
  { categoryID: 7, parentCategoryID: 2, categoryName: "Lehengas", description: "Lehengas & cholis", icon: "👗" },
  { categoryID: 8, parentCategoryID: 3, categoryName: "Dresses", description: "Casual & formal dresses", icon: "👗" },
  { categoryID: 9, parentCategoryID: 3, categoryName: "Tops", description: "Blouses and shirts", icon: "👚" },
];

export const users = [
  { userID: 1, email: "customer@dressora.com", passwordHash: "hashed", phoneNumber: "0300-1234567", dateRegistered: "2024-01-15", isActive: true, userType: "customer" },
  { userID: 2, email: "seller@dressora.com",   passwordHash: "hashed", phoneNumber: "0311-9876543", dateRegistered: "2023-11-20", isActive: true, userType: "seller" },
  { userID: 3, email: "admin@dressora.com",    passwordHash: "hashed", phoneNumber: "0321-5555555", dateRegistered: "2023-06-01", isActive: true, userType: "admin" },
  { userID: 4, email: "sara@example.com",      passwordHash: "hashed", phoneNumber: "0333-4444444", dateRegistered: "2024-03-10", isActive: true, userType: "customer" },
  { userID: 5, email: "ahmed@example.com",     passwordHash: "hashed", phoneNumber: "0345-7777777", dateRegistered: "2024-04-01", isActive: false, userType: "customer" },
];

export const customers = [
  { customerID: 1, userID: 1, firstName: "Fatima", lastName: "Khan", dateOfBirth: "1995-06-15", loyaltyPoints: 450 },
  { customerID: 2, userID: 4, firstName: "Sara",   lastName: "Ali",  dateOfBirth: "1998-02-20", loyaltyPoints: 120 },
  { customerID: 3, userID: 5, firstName: "Ahmed",  lastName: "Raza", dateOfBirth: "1990-11-05", loyaltyPoints: 0 },
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
  { productID: 1,  sellerID: 1, categoryID: 6,  productName: "Floral Wrap Sari",           description: "A beautiful floral wrap sari perfect for celebrations. Made from breathable fabric.", basePrice: 3500, stockQuantity: 45, sku: "DRS-FLR-001", isActive: true, createdAt: "2024-01-10", rating: 4.7, reviewCount: 23, discount: 15 },
  { productID: 2,  sellerID: 1, categoryID: 6,  productName: "Midnight Velvet Saree",      description: "Luxurious velvet saree with elegant drape.", basePrice: 8500, stockQuantity: 12, sku: "DRS-VLT-002", isActive: true, createdAt: "2024-01-15", rating: 4.9, reviewCount: 41, discount: 0 },
  { productID: 3,  sellerID: 1, categoryID: 5,  productName: "Linen Embroidered Hijab",    description: "Lightweight linen hijab with elegant embroidery.", basePrice: 1800, stockQuantity: 80, sku: "TOP-LNR-003", isActive: true, createdAt: "2024-02-01", rating: 4.3, reviewCount: 15, discount: 10 },
  { productID: 4,  sellerID: 1, categoryID: 8,  productName: "Classic Denim Dress",        description: "Crisp denim dress for a polished everyday look.", basePrice: 2200, stockQuantity: 60, sku: "SHT-OXF-004", isActive: true, createdAt: "2024-02-10", rating: 4.5, reviewCount: 32, discount: 0 },
  { productID: 5,  sellerID: 1, categoryID: 9,  productName: "Silk Blend Blouse",          description: "Versatile silk-blend blouse in neutral palette.", basePrice: 2800, stockQuantity: 55, sku: "TRS-CHN-005", isActive: true, createdAt: "2024-02-20", rating: 4.6, reviewCount: 28, discount: 20 },
  { productID: 6,  sellerID: 1, categoryID: 4,  productName: "Black Premium Abaya",        description: "Genuine embroidered black abaya with elegant details.", basePrice: 5500, stockQuantity: 30, sku: "ACC-BAG-006", isActive: true, createdAt: "2024-03-01", rating: 4.8, reviewCount: 19, discount: 0 },
  { productID: 7,  sellerID: 1, categoryID: 7,  productName: "Embroidered Lehenga",        description: "Handcrafted embroidery on stunning lehenga set.", basePrice: 3200, stockQuantity: 40, sku: "ACC-BAG-007", isActive: true, createdAt: "2024-03-10", rating: 4.4, reviewCount: 11, discount: 25 },
  { productID: 8,  sellerID: 1, categoryID: 6,  productName: "Printed Cotton Saree",       description: "Free-flowing printed cotton saree with intricate design.", basePrice: 4200, stockQuantity: 25, sku: "DRS-BOH-008", isActive: true, createdAt: "2024-03-20", rating: 4.6, reviewCount: 36, discount: 0 },
  { productID: 9,  sellerID: 1, categoryID: 5,  productName: "Premium Silk Hijab",         description: "Handcrafted premium silk hijab in multiple colors.", basePrice: 2600, stockQuantity: 70, sku: "TOP-EMB-009", isActive: true, createdAt: "2024-04-01", rating: 4.8, reviewCount: 52, discount: 10 },
  { productID: 10, sellerID: 1, categoryID: 8,  productName: "Pastel Casual Dress",        description: "Light and airy pastel dress for everyday wear.", basePrice: 1200, stockQuantity: 100, sku: "ACC-EAR-010", isActive: true, createdAt: "2024-04-10", rating: 4.9, reviewCount: 67, discount: 0 },
  { productID: 11, sellerID: 1, categoryID: 9,  productName: "Striped Casual Top",         description: "Breathable striped top for warm seasons.", basePrice: 1900, stockQuantity: 50, sku: "SHT-LNB-011", isActive: true, createdAt: "2024-04-15", rating: 4.2, reviewCount: 9, discount: 0 },
  { productID: 12, sellerID: 1, categoryID: 7,  productName: "Gold Lehenga Set",           description: "Stunning gold embellished lehenga set for celebrations.", basePrice: 2900, stockQuantity: 35, sku: "DRS-PST-012", isActive: false, createdAt: "2024-04-20", rating: 4.5, reviewCount: 18, discount: 30 },
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
  { paymentID: 2, orderID: 2, paymentMethod: "online",      paymentStatus: "completed", amountPaid: 5775, transactionID: "TXN-002-2026", paymentDate: "2026-05-02" },
  { paymentID: 3, orderID: 3, paymentMethod: "cod",         paymentStatus: "pending",   amountPaid: 0,    transactionID: null,           paymentDate: null },
];

export const shippings = [
  { shippingID: 1, orderID: 1, trackingNumber: "TCS-00123456", carrier: "TCS",      shippingStatus: "delivered",  shippedDate: "2026-04-16", estimatedDelivery: "2026-04-19", actualDelivery: "2026-04-18" },
  { shippingID: 2, orderID: 2, trackingNumber: "LPK-00987654", carrier: "Leopards", shippingStatus: "in_transit", shippedDate: "2026-05-03", estimatedDelivery: "2026-05-06", actualDelivery: null },
  { shippingID: 3, orderID: 3, trackingNumber: null,           carrier: null,       shippingStatus: "processing", shippedDate: null,         estimatedDelivery: "2026-05-12", actualDelivery: null },
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
  { couponID: 2, couponCode: "FLAT500",   discountType: "fixed",      discountValue: 500, minOrderAmount: 3000, expiryDate: "2026-07-31", usageLimit: 50,  timesUsed: 12 },
  { couponID: 3, couponCode: "SUMMER15",  discountType: "percentage", discountValue: 15, minOrderAmount: 1500, expiryDate: "2026-06-30", usageLimit: 200, timesUsed: 87 },
  { couponID: 4, couponCode: "FLASH30",   discountType: "percentage", discountValue: 30, minOrderAmount: 5000, expiryDate: "2026-05-31", usageLimit: 25,  timesUsed: 25 },
];

export const orderCoupons = [
  { orderID: 1, couponID: 1, appliedAt: "2026-04-15" },
  { orderID: 3, couponID: 2, appliedAt: "2026-05-08" },
];

// Helpers
export const getProductById     = (id) => products.find(p => p.productID === id);
export const getCategoryById    = (id) => categories.find(c => c.categoryID === id);
export const getProductsByCategory = (id) => products.filter(p => p.categoryID === id && p.isActive);
export const getCustomerById    = (id) => customers.find(c => c.customerID === id);
export const getOrdersByCustomer= (id) => orders.filter(o => o.customerID === id);
export const getOrderItems      = (orderID) => orderItems.filter(i => i.orderID === orderID);
export const getShipping        = (orderID) => shippings.find(s => s.orderID === orderID);
export const getPayment         = (orderID) => payments.find(p => p.orderID === orderID);
export const getReviewsByProduct= (id) => reviews.filter(r => r.productID === id);
export const getAddressesByCustomer = (id) => addresses.filter(a => a.customerID === id);
export const featuredProducts   = products.filter(p => p.isActive && (p.categoryID === 4 || p.categoryID === 5)).slice(0, 8);
export const newArrivals        = products.filter(p => p.isActive && (p.categoryID === 4 || p.categoryID === 5)).slice(-4);

export const orderStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

export const formatPrice = (price) => `Rs. ${price.toLocaleString()}`;
export const getDiscount = (product) =>
  product.discount > 0 ? Math.round(product.basePrice * (1 - product.discount / 100)) : product.basePrice;
