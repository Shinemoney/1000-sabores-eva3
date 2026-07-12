import { createContext, useState } from 'react';

// Declaramos y exportamos una sola vez
export const AuthContext = createContext();

const hashText = async (text) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const loginUser = async (email, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const passwordHash = await hashText(password);

    const userFound = registeredUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!userFound) return false;

    if (userFound.password === passwordHash) {
      setIsAdmin(false);
      return true;
    }

    // Compatibilidad con usuarios antiguos en texto plano + migración automática
    if (userFound.password === password) {
      const updatedUsers = registeredUsers.map((u) =>
        u.email.toLowerCase() === email.toLowerCase() ? { ...u, password: passwordHash } : u
      );
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      setIsAdmin(false);
      return true;
    }

    return false;
  };

  const loginAdmin = (email, password) => {
    if (email === "admin.pasteleria@gmail.cl" && password === "123456") {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loginUser, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};