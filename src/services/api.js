/**
 * DRESSORA API SERVICE
 * These functions handle all communication with our Node.js/Express backend.
 */

/**
 * FETCH ALL PRODUCTS
 * Returns an array of products formatted for our UI components.
 */
export const fetchProducts = async () => {
  console.log('📡 API: Fetching all products...');
  const response = await fetch('/api/products');
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

/**
 * FETCH PRODUCT BY ID
 * Gets detailed information for a single product.
 */
export const fetchProductById = async (id) => {
  console.log(`📡 API: Fetching product details for ${id}...`);
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

/**
 * FETCH ALL CATEGORIES
 * Gets the categories (Modest, Eastern, Western) with their icons.
 */
export const fetchCategories = async () => {
  console.log('📡 API: Fetching category list...');
  const response = await fetch('/api/categories');
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

/**
 * AUTHENTICATE USER (LOGIN)
 * Sends credentials and receives a JWT token and user profile.
 */
export const loginUser = async (email, password) => {
  console.log(`📡 API: Attempting login for ${email}...`);
  const response = await fetch('/api/users/login', {
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
  const response = await fetch('/api/users', {
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
  const response = await fetch('/api/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};
