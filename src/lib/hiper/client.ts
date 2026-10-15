const HIPER_API_URL = process.env.HIPER_API_URL || 'https://ms-ecommerce.hiper.com.br';
const HIPER_API_TOKEN = process.env.HIPER_API_TOKEN;
const HIPER_API_KEY = process.env.HIPER_API_KEY;

export async function fetchHiperAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!HIPER_API_TOKEN && !HIPER_API_KEY) {
    throw new Error('HIPER_API_TOKEN or HIPER_API_KEY is not defined in environment variables');
  }

  const url = `${HIPER_API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = new Headers(options.headers);
  if (HIPER_API_TOKEN) {
    headers.set('Authorization', `Bearer ${HIPER_API_TOKEN}`);
  }
  if (HIPER_API_KEY) {
    headers.set('x-api-key', HIPER_API_KEY);
    headers.set('token', HIPER_API_KEY);
  }
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      let errorData: unknown = {};
      try { errorData = JSON.parse(errorText); } catch { errorData = { raw: errorText }; }
      
      if (response.status === 401) {
        console.warn(`[HIPER API 401 Unauthorized] Token ou API Key inválido/expirado no Hiper ERP. Obtenha um novo token no Hiper Gestão.`);
      }

      throw new Error(
        `Hiper API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    // For 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    console.error(`[HIPER API] Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}
