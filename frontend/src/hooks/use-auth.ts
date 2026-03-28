'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useAuthStore } from '@/store/use-auth-store';
import { getAuthNonce } from '@/lib/api';
import { useMemo } from 'react';

export function useAuth() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { isAuthenticated, setAuth, logout } = useAuthStore();

  const authenticate = async () => {
    if (!address) return;

    try {
      // 1. Get a unique nonce from backend (or mock for now)
      const nonce = await getAuthNonce(address);
      const timestamp = new Date().toISOString();
      const message = `Welcome to MonKey Vault! Sign this message to verify your wallet ownership.\n\nNonce: ${nonce}\nTimestamp: ${timestamp}`;

      // 2. Request signature
      const signature = await signMessageAsync({ message });

      // 3. Verify and set session (In Phase 3, this will hit a /v1/auth/verify endpoint)
      if (signature) {
        setAuth(address, signature);
        return true;
      }
    } catch (error) {
      console.error('[Auth] Authentication failed:', error);
      return false;
    }
  };

  return {
    address,
    isConnected,
    isAuthenticated,
    authenticate,
    logout,
  };
}
