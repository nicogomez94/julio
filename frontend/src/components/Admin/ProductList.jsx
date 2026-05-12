import { useState, useEffect } from 'react';
import { Link }       from 'react-router-dom';
import { api }        from '../../services/api.js';
import { formatPrice } from '../../utils/helpers.js';
import '../../pages/AdminLayout.css';

export default function ProductList() {
  const [products, setProducts]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCat, setFilterCat] = useState('');
  const [search,    setSearch]    = useState('');
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');

  useEffect(() => {
    Promise.all([
      api.getProducts({ active: undefined }),
      api.getCategories(),
    ])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function fetchProducts() {
    const params = {};
    if (filterCat) params.categoryId = filterCat;
    const prods = await api.getProducts(params);
    setProducts(prods);
  }

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCat]);

  async function handleDelete(id, name) {
    if (!confirm(`¿Eliminar "${name}"?`)) return;
    try {
      await api.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="admin-page__header">
        <h1 className="admin-page__title">Productos</h1>
        <Link to="nuevo" className="admin-btn">
          <span className="material-symbols-outlined">add</span>
          Nuevo Producto
        </Link>
      </div>

      {/* Filters */}
      <div className="product-list__filters admin-card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '8px 14px', border: '1.5px solid var(--color-outline-variant)', borderRadius: 8, fontSize: 14, outline: 'none', minWidth: 220 }}
          />
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            style={{ padding: '8px 14px', border: '1.5px solid var(--color-outline-variant)', borderRadius: 8, fontSize: 14, outline: 'none' }}
          >
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="admin-alert admin-alert--error" style={{ marginBottom: 16 }}>
          <span className="material-symbols-outlined">error</span>
          {error}
        </div>
      )}

      <div className="admin-card">
        {loading ? (
          <p style={{ color: 'var(--color-outline)', padding: 20 }}>Cargando...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--color-outline)', padding: 20 }}>No hay productos.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Destacado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          style={{ width: 56, height: 44, objectFit: 'cover', borderRadius: 8 }}
                        />
                      ) : (
                        <div style={{ width: 56, height: 44, background: 'var(--color-surface-container)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-outline)' }}>image</span>
                        </div>
                      )}
                    </td>
                    <td>
                      <strong style={{ fontSize: 14, display: 'block' }}>{p.name}</strong>
                      {p.badge && (
                        <span className="admin-badge admin-badge--featured" style={{ marginTop: 4 }}>{p.badge}</span>
                      )}
                    </td>
                    <td style={{ color: 'var(--color-on-surface-variant)' }}>{p.category?.name}</td>
                    <td>
                      <strong style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-primary)' }}>
                        {formatPrice(p.price)}
                      </strong>
                    </td>
                    <td>
                      <span className={`admin-badge ${p.active ? 'admin-badge--active' : 'admin-badge--inactive'}`}>
                        {p.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td>
                      {p.featured && (
                        <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 20 }}>star</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <Link
                          to={`${p.id}/editar`}
                          className="admin-btn admin-btn--secondary admin-btn--sm"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>
                          Editar
                        </Link>
                        <button
                          className="admin-btn admin-btn--danger admin-btn--sm"
                          onClick={() => handleDelete(p.id, p.name)}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
