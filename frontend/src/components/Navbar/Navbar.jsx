import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart }    from '../../context/CartContext.jsx';
import { useSettings } from '../../context/SettingsContext.jsx';
import './Navbar.css';

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const { settings }              = useSettings();
  const navigate                  = useNavigate();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(id) {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function handlePedirAhora() {
    const phone = settings.whatsapp_number || '5491112345678';
    const msg   = '¡Hola! Quiero hacer un pedido 🍽️';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <div className="navbar__brand" onClick={() => scrollTo('inicio')} style={{ cursor: 'pointer' }}>
          <div className="navbar__logo-circle">🍽</div>
          <span className="navbar__brand-name">Viandas Chanetón</span>
        </div>

        <nav className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          <button onClick={() => scrollTo('inicio')}>Inicio</button>
          <button onClick={() => scrollTo('menu')}>Menú</button>
          <button onClick={() => scrollTo('viandas')}>Viandas</button>
          <button onClick={() => scrollTo('contacto')}>Contacto</button>
        </nav>

        <div className="navbar__actions">
          <button
            className="navbar__cart-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Ver pedido"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {totalItems > 0 && (
              <span className="navbar__cart-badge">{totalItems}</span>
            )}
          </button>

          <button className="navbar__cta" onClick={handlePedirAhora}>
            Pedir Ahora
          </button>

          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span className="material-symbols-outlined">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
