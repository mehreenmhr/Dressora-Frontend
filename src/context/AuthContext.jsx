import { createContext, useContext, useState } from 'react';
import { loginUser, registerUser as apiRegisterUser } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('dressora_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      // Construct user object similar to original mock
      const user = {
        ...data,
        profile: {
          firstName: data.firstName,
          lastName: data.lastName,
          // Add other fields as needed
        }
      };
      setCurrentUser(user);
      localStorage.setItem('dressora_user', JSON.stringify(user));
      return { success: true };
      
      // Save to state and storage
      setCurrentUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return { success: true };
    } catch (err) {
      console.error('🔐 AUTH ERROR:', err.message);
      return { success: false, message: err.message };
    }
  };

  const register = async (userData) => {
    try {
      const data = await apiRegisterUser(userData);
      const user = {
        ...data,
        profile: {
          firstName: data.firstName,
          lastName: data.lastName,
        }
      };
      setCurrentUser(user);
      localStorage.setItem('dressora_user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  /**
   * LOGOUT ACTION
   * Clears everything so the user is securely signed out.
   */
  const logout = () => {
    console.log('🔐 AUTH: Logging out, clearing session.');
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('dressora_user');
  };

  const isCustomer = currentUser?.userType === 'customer';
  const isSeller   = currentUser?.userType === 'seller';
  const isAdmin    = currentUser?.userType === 'admin';
  const displayName = currentUser
    ? (currentUser.firstName
        ? `${currentUser.firstName} ${currentUser.lastName ?? ''}`
        : currentUser.email)
    : null;

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, isCustomer, isSeller, isAdmin, displayName }}>
      {children}
    </AuthContext.Provider>
  );
}
