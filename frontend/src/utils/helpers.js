/**
 * isDebugMode()
 * Returns true if ?debug=true is in the URL or VITE_DEBUG_MODE=true in env.
 */
export function isDebugMode() {
  if (import.meta.env.VITE_DEBUG_MODE === 'true') return true;
  const params = new URLSearchParams(window.location.search);
  return params.get('debug') === 'true';
}

/**
 * formatPrice(number) → "$4.500"
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * buildWhatsAppUrl(phone, message) → whatsapp URL
 */
export function buildWhatsAppUrl(phone, message) {
  const clean = phone.replace(/\D/g, '');
  return `https://wa.me/${clean}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

/**
 * slugify(str) → "mi-categoria"
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
