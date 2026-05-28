const BASE_URL = '/api';
const AUTH_EXPIRED_MESSAGE = 'Tu sesión expiró. Ingresá de nuevo para continuar.';

function handleAuthExpired() {
  localStorage.removeItem('admin_token');
  localStorage.setItem('admin_auth_message', AUTH_EXPIRED_MESSAGE);
  window.dispatchEvent(new Event('admin-auth-expired'));
}

function getToken() {
  return localStorage.getItem('admin_token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(method, path, body) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
  };
  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Error de red' }));
    if (res.status === 401) {
      handleAuthExpired();
    }
    throw new Error(errorData.error || 'Error desconocido');
  }
  return res.json();
}

async function uploadImages(files) {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append('images', file));

  const res = await fetch(`${BASE_URL}/uploads`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Error de red' }));
    if (res.status === 401) {
      handleAuthExpired();
    }
    throw new Error(errorData.error || 'Error al subir imagen');
  }

  return res.json();
}

export const api = {
  // Auth
  login: (password) => request('POST', '/auth/login', { password }),

  // Products
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request('GET', `/products${qs ? `?${qs}` : ''}`);
  },
  getProduct:    (id)       => request('GET',    `/products/${id}`),
  createProduct: (data)     => request('POST',   '/products', data),
  updateProduct: (id, data) => request('PUT',    `/products/${id}`, data),
  deleteProduct: (id)       => request('DELETE', `/products/${id}`),

  // Categories
  getCategories:    ()           => request('GET',    '/categories'),
  createCategory:   (data)       => request('POST',   '/categories', data),
  updateCategory:   (id, data)   => request('PUT',    `/categories/${id}`, data),
  deleteCategory:   (id)         => request('DELETE', `/categories/${id}`),

  // Settings
  getSettings:    ()     => request('GET', '/settings'),
  updateSettings: (data) => request('PUT', '/settings', data),

  // Uploads
  uploadImages,
};
