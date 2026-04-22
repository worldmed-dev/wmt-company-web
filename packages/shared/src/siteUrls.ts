const normalizeBaseUrl = (url: string) => url.replace(/\/+$/, '');

export function getMainSiteUrl() {
  return normalizeBaseUrl(process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'http://localhost:3000');
}

export function getCareerSiteUrl() {
  return normalizeBaseUrl(process.env.NEXT_PUBLIC_CAREER_SITE_URL || 'http://localhost:3001');
}

export function joinSiteUrl(baseUrl: string, path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizeBaseUrl(baseUrl)}${normalizedPath}`;
}
