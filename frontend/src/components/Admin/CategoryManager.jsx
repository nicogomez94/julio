import { useState, useEffect } from 'react';
import { api }        from '../../services/api.js';
import { isDebugMode, slugify } from '../../utils/helpers.js';
import '../../pages/AdminLayout.css';

const DEBUG_CAT = { name: 'Categoría de prueba', identificador: 'categoria-de-prueba' };

export default function CategoryManager() {
  const debug = isDebugMode();

  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');
  const [success,    setSuccess]    = useState('');
  const [editingId,  setEditingId]  = useState(null);

  const [form, setForm] = useState(
    debug ? DEBUG_CAT : { name: '', identificador: '' }
  );

  useEffect(() => {
    api.getCategories()
      .then(setCategories)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'name') updated.identificador = slugify(value);
      return updated;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const payload = { name: form.name, slug: form.identificador };
      if (editingId) {
        const updated = await api.updateCategory(editingId, payload);
        setCategories((prev) => prev.map((c) => (c.id === editingId ? updated : c)));
        setSuccess('Categoría actualizada.');
      } else {
        const created = await api.createCategory(payload);
        setCategories((prev) => [...prev, created]);
        setSuccess('Categoría creada.');
      }
      setForm(debug ? DEBUG_CAT : { name: '', identificador: '' });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(cat) {
    setEditingId(cat.id);
    setForm({ name: cat.name, identificador: cat.slug });
    setError('');
    setSuccess('');
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(debug ? DEBUG_CAT : { name: '', identificador: '' });
    setError('');
  }

  async function handleDelete(id, name) {
    if (!confirm(`¿Eliminar categoría "${name}"? Solo es posible si no tiene productos asociados.`)) return;
    try {
      await api.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="admin-page__header">
        <h1 className="admin-page__title">Categorías</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
        {/* Form */}
        <div className="admin-card">
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            {editingId ? 'Editar categoría' : 'Nueva categoría'}
          </h2>

          {debug && !editingId && (
            <div className="admin-alert admin-alert--success" style={{ marginBottom: 16 }}>
              <span className="material-symbols-outlined">bug_report</span>
              Modo de prueba — formulario prerrelleno.
            </div>
          )}

          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form__row admin-form__row--2">
              <div className="admin-form__field">
                <label htmlFor="cat-name">Nombre *</label>
                <input
                  id="cat-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ej: Especiales"
                  required
                />
              </div>
              <div className="admin-form__field">
                <label htmlFor="cat-slug">Identificador</label>
                <input
                  id="cat-slug"
                  name="identificador"
                  value={form.identificador}
                  onChange={handleChange}
                  placeholder="especiales"
                  required
                />
              </div>
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
              <button type="submit" className="admin-btn">
                <span className="material-symbols-outlined">save</span>
                {editingId ? 'Guardar cambios' : 'Crear categoría'}
              </button>
              {editingId && (
                <button type="button" className="admin-btn admin-btn--secondary" onClick={cancelEdit}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="admin-card">
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            Categorías existentes
          </h2>
          {loading ? (
            <p style={{ color: 'var(--color-outline)' }}>Cargando...</p>
          ) : categories.length === 0 ? (
            <p style={{ color: 'var(--color-outline)' }}>No hay categorías.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Identificador</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.id}>
                    <td><strong>{c.name}</strong></td>
                    <td style={{ color: 'var(--color-outline)', fontFamily: 'monospace', fontSize: 13 }}>{c.slug}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => startEdit(c)}>
                          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>edit</span>
                          Editar
                        </button>
                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleDelete(c.id, c.name)}>
                          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
