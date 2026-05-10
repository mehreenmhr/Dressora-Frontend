import { createContext, useContext, useState } from 'react';
import { users, customers, sellers, admins } from '../data/mockData';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const MOCK_CREDENTIALS = {
  'customer@dressora.com': { password: 'customer123', userID: 1 },
  'seller@dressora.com':   { password: 'seller123',   userID: 2 },
  'admin@dressora.com':    { password: 'admin123',     userID: 3 },
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    const cred = MOCK_CREDENTIALS[email];
    if (!cred || cred.password !== password) return { success: false, message: 'Invalid email or password.' };
    const user = users.find(u => u.userID === cred.userID);
    if (!user) return { success: false, message: 'User not found.' };
    if (!user.isActive) return { success: false, message: 'Account is deactivated.' };

    let profile = null;
    if (user.userType === 'customer') profile = customers.find(c => c.userID === user.userID);
    if (user.userType === 'seller')   profile = sellers.find(s => s.userID === user.userID);
    if (user.userType === 'admin')    profile = admins.find(a => a.userID === user.userID);

    setCurrentUser({ ...user, profile });
    return { success: true };
  };

  const register = (data) => {
    // Mock — just log in as new customer
    const mockNew = { userID: 99, email: data.email, userType: 'customer', isActive: true,
      profile: { customerID: 99, firstName: data.firstName, lastName: data.lastName, loyaltyPoints: 0 }
    };
    setCurrentUser(mockNew);
    return { success: true };
  };

  const logout = () => setCurrentUser(null);

  const isCustomer = currentUser?.userType === 'customer';
  const isSeller   = currentUser?.userType === 'seller';
  const isAdmin    = currentUser?.userType === 'admin';
  const displayName = currentUser
    ? (currentUser.profile?.firstName
        ? `${currentUser.profile.firstName} ${currentUser.profile.lastName ?? ''}`
        : currentUser.profile?.storeName ?? currentUser.email)
    : null;

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, isCustomer, isSeller, isAdmin, displayName }}>
      {children}
    </AuthContext.Provider>
  );
}
