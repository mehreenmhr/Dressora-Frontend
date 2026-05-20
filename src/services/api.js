/**
 * DRESSORA API SERVICE
 * These functions handle all communication with our Node.js/Express backend.
 */

const API_URL = 'http://localhost:5000';

/**
 * FETCH ALL PRODUCTS
 * Returns an array of products formatted for our UI components.
 */
export const fetchProducts = async () => {
  console.log('📡 API: Fetching all products...');
  const response = await fetch(`${API_URL}/api/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

/**
 * FETCH PRODUCT BY ID
 * Gets detailed information for a single product.
 */
export const fetchProductById = async (id) => {
  console.log(`📡 API: Fetching product details for ${id}...`);
  const response = await fetch(`${API_URL}/api/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

/**
 * FETCH ALL CATEGORIES
 * Gets the categories (Modest, Eastern, Western) with their icons.
 */
export const fetchCategories = async () => {
  console.log('📡 API: Fetching category list...');
  const response = await fetch(`${API_URL}/api/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

/**
 * AUTHENTICATE USER (LOGIN)
 * Sends credentials and receives a JWT token and user profile.
 */
export const loginUser = async (email, password) => {
  console.log(`📡 API: Attempting login for ${email}...`);
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login failed');
  return data;
};

/**
 * REGISTER NEW USER
 * Creates a new account in the database.
 */
export const registerUser = async (userData) => {
  console.log(`📡 API: Registering new user ${userData.email}...`);
  const response = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

/**
 * ADMIN: FETCH ALL USERS
 * Gets a list of every registered user in the system.
 */
export const fetchUsers = async () => {
  console.log('📡 API: Admin requesting user list...');
  const response = await fetch(`${API_URL}/api/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

/**
 * FETCH ALL COUPONS
 */
export const fetchCoupons = async () => {
  console.log('📡 API: Fetching coupons list...');
  const response = await fetch(`${API_URL}/api/coupons`);
  if (!response.ok) throw new Error('Failed to fetch coupons');
  return response.json();
};

/**
 * CREATE A COUPON
 */
export const createCoupon = async (couponData) => {
  console.log('📡 API: Creating coupon...', couponData.couponCode);
  const response = await fetch(`${API_URL}/api/coupons`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(couponData),
  });
  if (!response.ok) throw new Error('Failed to create coupon');
  return response.json();
};

/**
 * DELETE A COUPON
 */
export const deleteCoupon = async (id) => {
  console.log(`📡 API: Deleting coupon ${id}...`);
  const response = await fetch(`${API_URL}/api/coupons/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete coupon');
  return response.json();
};

/**
 * PLACE AN ORDER
 */
export const placeOrder = async (orderData) => {
  console.log('📡 API: Placing order...');
  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to place order');
  return data;
};

/**
 * FETCH CUSTOMER ORDERS
 */
export const fetchCustomerOrders = async (customerId) => {
  console.log(`📡 API: Fetching orders for customer ${customerId}...`);
  const response = await fetch(`${API_URL}/api/orders/customer/${customerId}`);
  if (!response.ok) throw new Error('Failed to fetch customer orders');
  return response.json();
};

/**
 * FETCH SELLER ORDERS
 */
export const fetchSellerOrders = async (sellerId) => {
  console.log(`📡 API: Fetching orders for seller ${sellerId}...`);
  const response = await fetch(`${API_URL}/api/orders/seller/${sellerId}`);
  if (!response.ok) throw new Error('Failed to fetch seller orders');
  return response.json();
};

/**
 * UPDATE ORDER STATUS
 */
export const updateOrderStatus = async (orderId, status) => {
  console.log(`📡 API: Updating status for order ${orderId} to ${status}...`);
  const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update order status');
  return data;
};

export const fetchAllOrders = async () => {
  console.log('📡 API: Admin requesting all orders...');
  const response = await fetch(`${API_URL}/api/orders`);
  if (!response.ok) throw new Error('Failed to fetch all orders');
  return response.json();
};

/**
 * ADMIN: UPDATE USER ACTIVE STATUS
 */
export const updateUserStatus = async (userId, isActive) => {
  console.log(`📡 API: Updating status for user ${userId} to ${isActive}...`);
  const response = await fetch(`${API_URL}/api/users/${userId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update user status');
  return data;
};

/**
 * ADMIN/SELLER: UPDATE PRODUCT ACTIVE STATUS
 */
export const updateProductStatus = async (productId, isActive) => {
  console.log(`📡 API: Updating status for product ${productId} to ${isActive}...`);
  const response = await fetch(`${API_URL}/api/products/${productId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update product status');
  return data;
};

/**
 * CUSTOMER ADDRESSES
 */
export const fetchCustomerAddresses = async (customerId) => {
  console.log(`📡 API: Fetching addresses for customer ${customerId}...`);
  const response = await fetch(`${API_URL}/api/addresses/customer/${customerId}`);
  if (!response.ok) throw new Error('Failed to fetch customer addresses');
  return response.json();
};

export const addCustomerAddress = async (addressData) => {
  console.log('📡 API: Adding new address...');
  const response = await fetch(`${API_URL}/api/addresses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(addressData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to add address');
  return data;
};
