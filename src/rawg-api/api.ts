const api = {
    url: 'https://api.rawg.io/api/',
    key: 'eceff5221ab04eeba3e9f2ccb4124059',
  };
  
  const cachedRequests: Record<string, unknown> =
  JSON.parse(localStorage.getItem('cachedRequests') || '{}');

interface ResponseSchema<T> {
  count: number,
  next: string,
  previous: string,
  results: T[],
}

async function get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const searchParams = new URLSearchParams(params).toString();
  if (cachedRequests[searchParams]) return cachedRequests[searchParams] as Promise<T>;
  const response = await fetch(`${api.url}${endpoint}?${searchParams}&key=${api.key}`);
  if (!response.ok) throw new Error(response.statusText);
  const data = await response.json();
  cachedRequests[searchParams] = data;
  localStorage.setItem('cachedRequests', JSON.stringify(cachedRequests));
  return data;
}

export type { ResponseSchema };
export { get };