import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));

  useEffect(() => {
    function handleAuthExpired() {
      setToken(null);
    }

    window.addEventListener('admin-auth-expired', handleAuthExpired);
    return () => window.removeEventListener('admin-auth-expired', handleAuthExpired);
  }, []);

  function login(newToken) {
    localStorage.setItem('admin_token', newToken);
    localStorage.removeItem('admin_auth_message');
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_auth_message');
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
