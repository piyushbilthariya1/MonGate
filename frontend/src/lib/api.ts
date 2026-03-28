/**
 * AntiGravity API Library: Standardized fetcher for MonKey Vault backend.
 */
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export async function fetcher<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BACKEND_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(`❌ [API] Fetch failed for ${endpoint}:`, error.message);
    throw error;
  }
}

/**
 * Authentication: Request a unique nonce for wallet signature.
 */
export async function getAuthNonce(walletAddress: string): Promise<string> {
  // Mock nonce for Phase 1 (In Phase 2, this will hit a backend endpoint)
  return `nonce_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}
