import { getValidToken, forceRenewToken } from './auth';

const HIPER_API_URL = process.env.HIPER_API_URL || 'https://ms-ecommerce.hiper.com.br';
const HIPER_API_KEY = process.env.HIPER_API_KEY;

/**
 * Fetches data from the Hiper ERP API with automatic token management.
 *
 * Flow:
 *  1. Acquire a valid token (from cache or by generating a new one).
 *  2. Make the request with Bearer auth.
 *  3. If the API returns 401, force-renew the token and retry ONCE.
 *
 * This eliminates the need to manually paste tokens into .env.local.
 */
export async function fetchHiperAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!HIPER_API_KEY) {
    throw new Error('HIPER_API_KEY is not defined in environment variables');
  }

  const url = `${HIPER_API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  // First attempt with the current valid token
  const token = await getValidToken();
  const result = await makeRequest<T>(url, token, options);

  // If 401, force-renew and retry once
  if (result.status === 401) {
    console.warn('[HIPER API] Got 401 — forcing token renewal and retrying…');
    const freshToken = await forceRenewToken();
    const retry = await makeRequest<T>(url, freshToken, options);

    if (retry.status === 401) {
      throw new Error(
        '[HIPER API] Still 401 after token renewal. Check if HIPER_API_KEY is valid.'
      );
    }
    return retry.data;
  }

  return result.data;
}

// ── Internal request helper ──────────────────────────────────────────

interface RequestResult<T> {
  status: number;
  data: T;
}

async function makeRequest<T>(
  url: string,
  token: string,
  options: RequestInit
): Promise<RequestResult<T>> {
  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Return 401 status so caller can handle retry
    if (response.status === 401) {
      return { status: 401, data: {} as T };
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      let errorData: unknown = {};
      try { errorData = JSON.parse(errorText); } catch { errorData = { raw: errorText }; }

      throw new Error(
        `Hiper API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    // 204 No Content
    if (response.status === 204) {
      return { status: 204, data: {} as T };
    }

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    // Re-throw known errors; wrap unexpected ones
    if (error instanceof Error && error.message.startsWith('Hiper API Error')) {
      throw error;
    }
    console.error(`[HIPER API] Failed to fetch ${url}:`, error);
    throw error;
  }
}
