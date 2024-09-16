import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Check localStorage for existing admin data on page load
  const storedAdmin = JSON.parse(localStorage.getItem('admin'));
  const [admin, setAdmin] = useState(storedAdmin || null);

  useEffect(() => {
    // Save admin data to localStorage whenever it changes
    localStorage.setItem('admin', JSON.stringify(admin));
  }, [admin]);

  const login = (adminData) => {
    setAdmin(adminData);
  };

  const logout = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};