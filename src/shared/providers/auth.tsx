import React, { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "admin" | "employee" | null;

interface AuthContextType {
  userRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(() => {
    return (localStorage.getItem("userRole") as UserRole) || null;
  });
  const login = (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem("userRole", role || "");
  };

  const logout = () => {
    setUserRole(null);
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
