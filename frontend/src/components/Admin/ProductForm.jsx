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
  etiqueta:    'PRUEBA',
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
  const [uploading,  setUploading]  = useState(false);
  const [error,      setError]      = useState('');
  const [success,    setSuccess]    = useState('');

  const [form, setForm] = useState({
    name:        '',
    description: '',
    price:       '',
    imageUrl:    '',
    etiqueta:    '',
    featured:    false,
    active:      true,
    categoryId:  '',
  });

      // Cargar categorías
  useEffect(() => {
    api.getCategories().then((cats) => {
      setCategories(cats);
      // Si está en modo de prueba y no hay categoría elegida, usar la primera
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
          etiqueta:    product.badge       || '',
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

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setSuccess('');
    setUploading(true);

    try {
      const { url } = await api.uploadImages([file]);
      setForm((prev) => ({ ...prev, imageUrl: url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  function handleRemoveImage() {
    setForm((prev) => ({ ...prev, imageUrl: '' }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const payload = {
        ...form,
        badge: form.etiqueta,
      };
      if (isEdit) {
        await api.updateProduct(id, payload);
        setSuccess('Producto actualizado correctamente.');
      } else {
        await api.createProduct(payload);
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
          Modo de prueba activo — formulario prerrelleno con datos de prueba.
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
                <label htmlFor="etiqueta">Etiqueta</label>
                <input
                  id="etiqueta"
                  name="etiqueta"
                  value={form.etiqueta}
                  onChange={handleChange}
                  placeholder="Ej: RECOMENDADO, PROMO, Éxito de ventas"
                />
              </div>
            </div>

            <div className="admin-form__field">
              <label htmlFor="imageFile">Imagen del producto</label>
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={uploading}
              />
              <small className="admin-form__hint">
                {uploading ? 'Subiendo imagen...' : 'Seleccioná una imagen desde tu equipo.'}
              </small>
              {form.imageUrl && (
                <div className="admin-image-preview">
                  <img
                    src={form.imageUrl}
                    alt="Vista previa"
                    className="admin-image-preview__img"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn--secondary admin-btn--sm"
                    onClick={handleRemoveImage}
                  >
                    <span className="material-symbols-outlined">delete</span>
                    Quitar
                  </button>
                </div>
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
              <button type="submit" className="admin-btn" disabled={loading || uploading}>
                <span className="material-symbols-outlined">save</span>
                {loading ? 'Guardando...' : uploading ? 'Subiendo imagen...' : isEdit ? 'Guardar cambios' : 'Crear producto'}
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
