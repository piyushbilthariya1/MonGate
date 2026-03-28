import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  walletAddress: string | null;
  sessionToken: string | null;
  setAuth: (address: string, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      walletAddress: null,
      sessionToken: null,
      setAuth: (address, token) => set({ 
        isAuthenticated: true, 
        walletAddress: address, 
        sessionToken: token 
      }),
      logout: () => set({ 
        isAuthenticated: false, 
        walletAddress: null, 
        sessionToken: null 
      }),
    }),
    {
      name: 'monkey-vault-auth',
    }
  )
);
