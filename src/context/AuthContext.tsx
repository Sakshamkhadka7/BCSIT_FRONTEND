import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import { authApi } from "../services/api";

export interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  phoneNumber?: string;
  college?: string;
  profilePhoto?: string;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getMe = async () => {
    try {
      setLoading(true);
      const response = await authApi.getMe();
      const data = await response.json();
      if (response.ok) {
        setUser(data.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log("Error occurred at UserProvider", err);
      setError(true);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.log("Logout error", err);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        error,
        loading,
        setError,
        setLoading,
        isAuthenticated: !!user,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const AuthProvider = UserProvider;

export function useAuth() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuth must be used within UserProvider");
  return context;
}
