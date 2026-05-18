import { useState, useEffect } from 'react';
import { api }                 from '../services/api.js';
import { useCart }             from '../context/CartContext.jsx';
import { formatPrice }         from '../utils/helpers.js';
import Navbar                  from '../components/Navbar/Navbar.jsx';
import Footer                  from '../components/Footer/Footer.jsx';
import CartDrawer              from '../components/Cart/CartDrawer.jsx';
import WhatsAppFAB             from '../components/WhatsAppFAB/WhatsAppFAB.jsx';
import './MenuPage.css';

export default function MenuPage() {
  const [products, setProducts]       = useState([]);
  const [categories, setCategories]   = useState([]);
  const [activeCategory, setActive]   = useState('all');
  const [loading, setLoading]         = useState(true);
  const { addItem }                   = useCart();

  useEffect(() => {
    Promise.all([api.getProducts(), api.getCategories()])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* Group all products under their category */
  const categoriesWithProducts = categories
    .map((cat) => ({
      ...cat,
      items: products.filter((p) => p.category?.id === cat.id),
    }))
    .filter((cat) => cat.items.length > 0);

  /* Filtered flat list when a single category tab is active */
  const filteredProducts =
    activeCategory === 'all'
      ? []
      : products.filter((p) => p.category?.id === activeCategory);

  function scrollToCategory(id) {
    setActive(id);
    if (id === 'all') return;
    const el = document.getElementById(`cat-${id}`);
    if (el) {
      const offset = 130; // navbar + sticky nav height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  return (
    <>
      <Navbar />
      <main className="menu-page">

        {/* ── Hero ── */}
        <section className="menu-hero">
          <div className="menu-hero__bg" />
          <div className="container menu-hero__inner">
            <p className="menu-hero__label">Chaneton Viandas</p>
            <h1 className="menu-hero__title">Nuestro Menú</h1>
            <p className="menu-hero__sub">Cocina casera con ingredientes frescos, lista para disfrutar</p>
            <div className="menu-hero__stats">
              <div className="menu-hero__stat">
                <span className="menu-hero__stat-value">{products.length}</span>
                <span className="menu-hero__stat-label">Platos</span>
              </div>
              <div className="menu-hero__stat">
                <span className="menu-hero__stat-value">{categories.length}</span>
                <span className="menu-hero__stat-label">Categorías</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sticky category tabs ── */}
        <div className="menu-tabs-wrap">
          <div className="container">
            <nav className="menu-tabs" aria-label="Categorías">
              <button
                className={`menu-tab${activeCategory === 'all' ? ' menu-tab--active' : ''}`}
                onClick={() => scrollToCategory('all')}
              >
                Todo
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`menu-tab${activeCategory === cat.id ? ' menu-tab--active' : ''}`}
                  onClick={() => scrollToCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="container menu-body">
          {loading ? (
            <div className="menu-loading">
              <span className="material-symbols-outlined menu-loading__icon">restaurant</span>
              <p>Cargando menú…</p>
            </div>
          ) : activeCategory !== 'all' ? (
            /* ── Filtered single-category view ── */
            (() => {
              const activeCat = categories.find((c) => c.id === activeCategory);
              return (
                <section className="menu-section">
                  <div className="menu-section__head">
                    <div className="menu-section__title-wrap">
                      <h2 className="menu-section__title">{activeCat?.name}</h2>
                      <span className="menu-section__count">
                        {filteredProducts.length} plato{filteredProducts.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    {activeCat?.description && (
                      <p className="menu-section__desc">{activeCat.description}</p>
                    )}
                  </div>
                  <div className="menu-grid">
                    {filteredProducts.map((product) => (
                      <MenuCard key={product.id} product={product} onAdd={addItem} />
                    ))}
                    {filteredProducts.length === 0 && (
                      <p className="menu-empty">No hay productos en esta categoría.</p>
                    )}
                  </div>
                </section>
              );
            })()
          ) : (
            /* ── All-categories grouped view ── */
            categoriesWithProducts.map((cat) => (
              <section key={cat.id} id={`cat-${cat.id}`} className="menu-section">
                <div className="menu-section__head">
                  <div className="menu-section__title-wrap">
                    <h2 className="menu-section__title">{cat.name}</h2>
                    <span className="menu-section__count">{cat.items.length} plato{cat.items.length !== 1 ? 's' : ''}</span>
                  </div>
                  {cat.description && (
                    <p className="menu-section__desc">{cat.description}</p>
                  )}
                </div>
                <div className="menu-grid">
                  {cat.items.map((product) => (
                    <MenuCard key={product.id} product={product} onAdd={addItem} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFAB />
    </>
  );
}

/* ── Menu Card component ── */
function MenuCard({ product, onAdd }) {
  return (
    <article className="mcard">
      <div className="mcard__img-wrap">
        <img
          src={
            product.imageUrl ||
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop'
          }
          alt={product.name}
          className="mcard__img"
          loading="lazy"
        />
        {product.badge && (
          <span className="mcard__badge">{product.badge}</span>
        )}
        {product.category?.name && (
          <span className="mcard__category-chip">{product.category.name}</span>
        )}
      </div>
      <div className="mcard__body">
        <div className="mcard__info">
          <h4 className="mcard__name">{product.name}</h4>
          {product.description && (
            <p className="mcard__desc">{product.description}</p>
          )}
        </div>
        <div className="mcard__footer">
          <span className="mcard__price">{formatPrice(product.price)}</span>
          <button className="mcard__add-btn" onClick={() => onAdd(product)}>
            <span className="material-symbols-outlined">add_shopping_cart</span>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
