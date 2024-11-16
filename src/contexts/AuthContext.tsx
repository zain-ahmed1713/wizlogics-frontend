import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
// import axiosInterceptor from "../axiosInterceptor";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
  username?: string;
  role: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuthStatus();
    // axiosInterceptor(logout);
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("/api/users/auth/status", {
        withCredentials: true,
      });
      setUser(response.data.data);
    } catch (error: any) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "/api/users/auth/login",
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUser(response.data.data.user);
        return response.data.data.user;
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      await axios.post("/api/users/auth/logout", {}, { withCredentials: true });
      setUser(null);
      return true;
    } catch (error: any) {
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
