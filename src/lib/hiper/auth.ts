/**
 * Hiper API Token Manager
 *
 * Handles automatic token generation and renewal for the Hiper ERP API.
 * Tokens expire after 6 hours — this module renews proactively before
 * expiration so no request ever hits a 401 due to a stale token.
 *
 * Strategy:
 *  - Decode the JWT `exp` claim (without verification — server-side only).
 *  - Renew 5 minutes before actual expiration to avoid race conditions.
 *  - Cache the token in-memory (Node.js module scope) so all requests
 *    within the same process share it.
 *  - If a request still gets a 401, force-renew once and retry.
 */

const HIPER_API_URL = process.env.HIPER_API_URL || 'https://ms-ecommerce.hiper.com.br';
const HIPER_API_KEY = process.env.HIPER_API_KEY;

/** How many seconds before `exp` we consider the token "about to expire". */
const RENEWAL_BUFFER_SECONDS = 5 * 60; // 5 minutes

interface TokenCache {
  token: string;
  expiresAt: number; // Unix timestamp in seconds
}

/** In-memory singleton — survives across requests within the same process. */
let cachedToken: TokenCache | null = null;

/** Prevents concurrent renewal calls (request stampede). */
let renewalPromise: Promise<string> | null = null;

// ── Helpers ──────────────────────────────────────────────────────────

interface HiperAuthResponse {
  chaveDeSeguranca: string;
  token: string;
  errors: string[];
  message: string | null;
}

/**
 * Decode the `exp` claim from a JWT without verifying the signature.
 * Safe server-side — we only need the timestamp, not cryptographic proof.
 */
function decodeJwtExp(jwt: string): number | null {
  try {
    const payload = jwt.split('.')[1];
    if (!payload) return null;

    const decoded = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf-8')
    );
    return typeof decoded.exp === 'number' ? decoded.exp : null;
  } catch {
    return null;
  }
}

function isTokenValid(cache: TokenCache | null): boolean {
  if (!cache) return false;
  const now = Math.floor(Date.now() / 1000);
  return now < cache.expiresAt - RENEWAL_BUFFER_SECONDS;
}

// ── Core ─────────────────────────────────────────────────────────────

/**
 * Fetches a fresh token from the Hiper authentication endpoint.
 *
 * Endpoint: GET /api/v1/auth/gerar-token/{chaveDeSeguranca}
 */
async function fetchNewToken(): Promise<TokenCache> {
  if (!HIPER_API_KEY) {
    throw new Error(
      '[HIPER Auth] HIPER_API_KEY is not defined. Cannot generate token.'
    );
  }

  const url = `${HIPER_API_URL}/api/v1/auth/gerar-token/${HIPER_API_KEY}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    // Prevent Next.js from caching this auth request
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(
      `[HIPER Auth] Failed to generate token: ${response.status} ${response.statusText} – ${body}`
    );
  }

  const data: HiperAuthResponse = await response.json();

  if (data.errors?.length) {
    throw new Error(
      `[HIPER Auth] Token generation returned errors: ${JSON.stringify(data.errors)}`
    );
  }

  if (!data.token) {
    throw new Error('[HIPER Auth] Token generation returned empty token.');
  }

  // Derive expiration from the JWT itself
  const exp = decodeJwtExp(data.token);
  const expiresAt = exp ?? Math.floor(Date.now() / 1000) + 6 * 60 * 60; // fallback: 6h from now

  console.log(
    `[HIPER Auth] New token acquired. Expires at ${new Date(expiresAt * 1000).toISOString()}`
  );

  return { token: data.token, expiresAt };
}

/**
 * Returns a valid Hiper API token.
 *
 * - If the cached token is still valid, returns it immediately.
 * - If expired (or about to), fetches a new one and caches it.
 * - Concurrent callers share the same renewal promise (no stampede).
 */
export async function getValidToken(): Promise<string> {
  // Fast path — cached token is still good
  if (isTokenValid(cachedToken)) {
    return cachedToken!.token;
  }

  // Deduplicate concurrent renewal requests
  if (renewalPromise) {
    return renewalPromise;
  }

  renewalPromise = (async () => {
    try {
      cachedToken = await fetchNewToken();
      return cachedToken.token;
    } finally {
      renewalPromise = null;
    }
  })();

  return renewalPromise;
}

/**
 * Forces a token renewal regardless of current cache state.
 * Used after receiving a 401 to handle unexpected server-side invalidation.
 */
export async function forceRenewToken(): Promise<string> {
  cachedToken = null;
  return getValidToken();
}
