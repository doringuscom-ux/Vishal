export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://vishal-khaki-gamma.vercel.app/api'
  : 'http://localhost:5000/api';

export const API_URL = API_BASE_URL;

export const ADMIN_LOGIN = `${API_URL}/admin/login`;
export const ADMIN_REFRESH = `${API_URL}/admin/refresh`;
export const ADMIN_API = `${API_URL}/admin`;
export const ADMIN_STATS_API = `${API_URL}/admin/dashboard-stats`;
export const PRODUCTS_API = `${API_URL}/products`;
export const INDUSTRIES_API = `${API_URL}/industries`;
export const PAGES_API = `${API_URL}/pages`;
export const STATIC_SEO_API = `${API_URL}/static-seo`;
export const BLOGS_API = `${API_URL}/blogs`;
export const GALLERY_API = `${API_URL}/gallery`;
export const CONTACT_API = `${API_URL}/contact`;

// Trigger Vite HMR
