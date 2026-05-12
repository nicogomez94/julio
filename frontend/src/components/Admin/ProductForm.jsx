import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api }        from '../../services/api.js';
import { isDebugMode, slugify } from '../../utils/helpers.js';
import '../../pages/AdminLayout.css';

const DEBUG_DEFAULTS = {
  name:        'Producto de Prueba Debug',
  description: 'Descripción de prueba para verificar que el formulario funciona correctamente en modo debug.',
  price:       '1500',
  imageUrl:    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop',
  badge:       'PRUEBA',
  featured:    true,
  active:      true,
  categoryId:  '',
};

export default function ProductForm() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const isEdit     = !!id;
  const debug      = isDebugMode();

  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const [success,    setSuccess]    = useState('');

  const [form, setForm] = useState({
    name:        '',
    description: '',
    price:       '',
    imageUrl:    '',
    badge:       '',
    featured:    false,
    active:      true,
    categoryId:  '',
  });

  // Load categories
  useEffect(() => {
    api.getCategories().then((cats) => {
      setCategories(cats);
      // If debug and no category selected yet, pick first
      if (debug && !isEdit && cats.length > 0) {
        setForm((prev) => ({
          ...DEBUG_DEFAULTS,
          categoryId: String(cats[0].id),
        }));
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load product data if editing
  useEffect(() => {
    if (!isEdit) {
      if (debug) {
        setForm((prev) => ({ ...DEBUG_DEFAULTS, categoryId: prev.categoryId }));
      }
      return;
    }
    setLoading(true);
    api.getProduct(id)
      .then((product) => {
        setForm({
          name:        product.name        || '',
          description: product.description || '',
          price:       String(product.price),
          imageUrl:    product.imageUrl    || '',
          badge:       product.badge       || '',
          featured:    product.featured,
          active:      product.active,
          categoryId:  String(product.categoryId),
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (isEdit) {
        await api.updateProduct(id, form);
        setSuccess('Producto actualizado correctamente.');
      } else {
        await api.createProduct(form);
        setSuccess('Producto creado correctamente.');
        setTimeout(() => navigate('/admin/productos'), 800);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="admin-page__header">
        <h1 className="admin-page__title">
          {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
        </h1>
        <Link to="/admin/productos" className="admin-btn admin-btn--secondary">
          <span className="material-symbols-outlined">arrow_back</span>
          Volver
        </Link>
      </div>

      {debug && (
        <div className="admin-alert admin-alert--success" style={{ marginBottom: 16 }}>
          <span className="material-symbols-outlined">bug_report</span>
          Modo debug activo — formulario prerelleno con datos de prueba.
        </div>
      )}

      <div className="admin-card">
        {loading && !form.name ? (
          <p style={{ color: 'var(--color-outline)', padding: 20 }}>Cargando...</p>
        ) : (
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form__row admin-form__row--2">
              <div className="admin-form__field">
                <label htmlFor="name">Nombre del producto *</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ej: Pollo al Horno con Finas Hierbas"
                  required
                />
              </div>
              <div className="admin-form__field">
                <label htmlFor="categoryId">Categoría *</label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((c) => (
                    <option key={c.id} value={String(c.id)}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="admin-form__field">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Descripción breve del plato..."
                rows={3}
              />
            </div>

            <div className="admin-form__row admin-form__row--2">
              <div className="admin-form__field">
                <label htmlFor="price">Precio (ARS) *</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="4500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="admin-form__field">
                <label htmlFor="badge">Badge / Etiqueta</label>
                <input
                  id="badge"
                  name="badge"
                  value={form.badge}
                  onChange={handleChange}
                  placeholder="Ej: RECOMENDADO, PROMO, Éxito de Ventas"
                />
              </div>
            </div>

            <div className="admin-form__field">
              <label htmlFor="imageUrl">URL de la imagen</label>
              <input
                id="imageUrl"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt="Vista previa"
                  style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8, marginTop: 8 }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
            </div>

            <div className="admin-form__checkbox-group">
              <label className="admin-form__checkbox">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                />
                Destacado (aparece en Especiales del Día)
              </label>
              <label className="admin-form__checkbox">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                />
                Activo (visible en el sitio)
              </label>
            </div>

            {error && (
              <div className="admin-alert admin-alert--error">
                <span className="material-symbols-outlined">error</span>
                {error}
              </div>
            )}

            {success && (
              <div className="admin-alert admin-alert--success">
                <span className="material-symbols-outlined">check_circle</span>
                {success}
              </div>
            )}

            <div className="admin-form__actions">
              <button type="submit" className="admin-btn" disabled={loading}>
                <span className="material-symbols-outlined">save</span>
                {loading ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear producto'}
              </button>
              <Link to="/admin/productos" className="admin-btn admin-btn--secondary">
                Cancelar
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
