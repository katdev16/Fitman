import React, { useState, useEffect, createContext, useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create a context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

// Mock implementation for demo purposes
export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('fitnessUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('fitnessUser');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be an actual API call in a real implementation
      // const response = await apiRequest('POST', '/api/auth/login', { email, password });
      // const userData = await response.json();
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: 1,
        username: email.split('@')[0],
        email,
        firstName: email.split('@')[0],
        lastName: 'User',
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('fitnessUser', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      // This would be an actual API call in a real implementation
      // const response = await apiRequest('POST', '/api/auth/signup', {
      //   email, password, firstName, lastName
      // });
      // const userData = await response.json();
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: 1,
        username: email.split('@')[0],
        email,
        firstName,
        lastName,
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('fitnessUser', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // This would be an actual API call in a real implementation
      // await apiRequest('POST', '/api/auth/logout');
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('fitnessUser');
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was an error logging out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
  };
}

// Export the provider component
export function AuthProvider(props: { children: React.ReactNode }) {
  const auth = useAuthProvider();
  return React.createElement(
    AuthContext.Provider,
    { value: auth },
    props.children
  );
}

// Hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // If we're not in a provider, provide default implementation for demo
    return useAuthProvider();
  }
  return context;
}
