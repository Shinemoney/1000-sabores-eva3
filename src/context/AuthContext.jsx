import { createContext, useState } from 'react';

// Declaramos y exportamos una sola vez
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  const loginUser = (email, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userFound = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (userFound) {
      setIsAdmin(false);
      localStorage.setItem('isAdmin', 'false');
      return true;
    }

    return false;
  };

  const loginAdmin = (email, password) => {
    if (email === "admin.pasteleria@gmail.cl" && password === "123456") {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loginUser, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};