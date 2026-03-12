import { useState, useEffect, useCallback } from "react";

interface AuthUser {
  username: string;
  role: "admin" | "user";
}

const USERS = [
  { username: "faruk", password: "stroma19", role: "admin" as const },
  { username: "fisnik", password: "mikro19", role: "user" as const },
];

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((username: string, password: string): boolean => {
    const found = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      const authUser = { username: found.username, role: found.role };
      localStorage.setItem("auth_user", JSON.stringify(authUser));
      setUser(authUser);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_user");
    setUser(null);
  }, []);

  return { user, login, logout, isAuthenticated: !!user };
}
