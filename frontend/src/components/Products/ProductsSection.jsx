import { useState, useEffect } from 'react';
import { api }         from '../../services/api.js';
import { useCart }     from '../../context/CartContext.jsx';
import { formatPrice } from '../../utils/helpers.js';
import './ProductsSection.css';

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    Promise.all([
      api.getProducts({ featured: 'true' }),
      api.getCategories(),
    ])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // When a category filter is applied
  useEffect(() => {
    if (activeCategory === null) {
      api.getProducts({ featured: 'true' })
        .then(setProducts)
        .catch(console.error);
    } else {
      api.getProducts({ categoryId: activeCategory })
        .then(setProducts)
        .catch(console.error);
    }
  }, [activeCategory]);

  const featured  = products.slice(0, 4);
  const mainCard  = featured[0];
  const card2     = featured[1];
  const card3     = featured[2];
  const card4     = featured[3];

  function scrollToViandas() {
    document.getElementById('viandas')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      {/* ── Especiales del Día (featured bento grid) ── */}
      <section id="menu" className="products section-xl">
        <div className="container">
          <div className="products__header">
            <div>
              <h2 className="products__title">Especiales del Día</h2>
              <p className="products__subtitle">Platos frescos preparados hoy mismo por nuestros maestros cocineros.</p>
            </div>
            <button className="products__see-all" onClick={scrollToViandas}>
              Ver menú completo
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          {loading ? (
            <div className="products__loading">
              <span className="material-symbols-outlined products__loading-icon">restaurant</span>
              <p>Cargando especiales...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="products__empty">
              <span className="material-symbols-outlined">info</span>
              <p>No hay especiales disponibles hoy. ¡Volvé pronto!</p>
            </div>
          ) : (
            <div className="products__bento">
              {/* Main featured card */}
              {mainCard && (
                <div className="product-card product-card--main warm-shadow">
                  <img
                    src={mainCard.imageUrl || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop'}
                    alt={mainCard.name}
                    className="product-card__img"
                  />
                  <div className="product-card__overlay" />
                  <div className="product-card__body product-card__body--main">
                    {mainCard.badge && (
                      <span className="product-card__badge">{mainCard.badge}</span>
                    )}
                    <h3 className="product-card__name product-card__name--main">{mainCard.name}</h3>
                    <p className="product-card__desc">{mainCard.description}</p>
                    <div className="product-card__footer">
                      <span className="product-card__price product-card__price--main">{formatPrice(mainCard.price)}</span>
                      <button
                        className="product-card__add-btn"
                        onClick={() => addItem(mainCard)}
                      >
                        <span className="material-symbols-outlined">shopping_cart</span>
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Secondary card 1 */}
              {card2 && (
                <div className="product-card product-card--secondary warm-shadow">
                  <div className="product-card__img-wrap">
                    <img
                      src={card2.imageUrl || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop'}
                      alt={card2.name}
                      className="product-card__img"
                    />
                  </div>
                  <div className="product-card__body">
                    <div>
                      <h4 className="product-card__name">{card2.name}</h4>
                      <p className="product-card__desc product-card__desc--sm">{card2.description}</p>
                    </div>
                    <div className="product-card__footer">
                      <span className="product-card__price">{formatPrice(card2.price)}</span>
                      <button className="product-card__icon-btn" onClick={() => addItem(card2)}>
                        <span className="material-symbols-outlined">add_circle</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Secondary card 2 */}
              {card3 && (
                <div className="product-card product-card--secondary warm-shadow">
                  <div className="product-card__img-wrap">
                    <img
                      src={card3.imageUrl || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop'}
                      alt={card3.name}
                      className="product-card__img"
                    />
                  </div>
                  <div className="product-card__body">
                    <div>
                      <h4 className="product-card__name">{card3.name}</h4>
                      <p className="product-card__desc product-card__desc--sm">{card3.description}</p>
                    </div>
                    <div className="product-card__footer">
                      <span className="product-card__price">{formatPrice(card3.price)}</span>
                      <button className="product-card__icon-btn" onClick={() => addItem(card3)}>
                        <span className="material-symbols-outlined">add_circle</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Horizontal card */}
              {card4 && (
                <div className="product-card product-card--horizontal warm-shadow">
                  <div className="product-card__horiz-img">
                    <img
                      src={card4.imageUrl || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop'}
                      alt={card4.name}
                      className="product-card__img"
                    />
                  </div>
                  <div className="product-card__body product-card__body--horiz">
                    {card4.badge && (
                      <span className="product-card__badge product-card__badge--dark">{card4.badge}</span>
                    )}
                    <h4 className="product-card__name product-card__name--horiz">{card4.name}</h4>
                    <p className="product-card__desc">{card4.description}</p>
                    <div className="product-card__footer product-card__footer--horiz">
                      <span className="product-card__price product-card__price--horiz">{formatPrice(card4.price)}</span>
                      <button className="product-card__add-btn product-card__add-btn--dark" onClick={() => addItem(card4)}>
                        Pedir Ahora
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Menú completo por categoría ── */}
      <section id="viandas" className="all-products section-xl">
        <div className="container">
          <h2 className="products__title">Menú Completo</h2>
          <p className="products__subtitle" style={{ marginBottom: '32px' }}>
            Todos nuestros platos disponibles hoy.
          </p>

          {/* Category filter */}
          <div className="all-products__filters">
            <button
              className={`all-products__filter-btn${activeCategory === null ? ' all-products__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(null)}
            >
              Destacados
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`all-products__filter-btn${activeCategory === cat.id ? ' all-products__filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="all-products__grid">
            {products.map((product) => (
              <div key={product.id} className="all-products__card warm-shadow">
                <div className="all-products__card-img-wrap">
                  <img
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop'}
                    alt={product.name}
                    className="all-products__card-img"
                  />
                  {product.badge && (
                    <span className="all-products__badge">{product.badge}</span>
                  )}
                </div>
                <div className="all-products__card-body">
                  <span className="all-products__category">{product.category?.name}</span>
                  <h4 className="all-products__name">{product.name}</h4>
                  <p className="all-products__desc">{product.description}</p>
                  <div className="all-products__footer">
                    <span className="all-products__price">{formatPrice(product.price)}</span>
                    <button className="all-products__add" onClick={() => addItem(product)}>
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
