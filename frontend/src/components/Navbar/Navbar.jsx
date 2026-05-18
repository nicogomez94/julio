import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useSettings } from '../../context/SettingsContext.jsx';
import WhatsAppLogo from '../WhatsAppLogo/WhatsAppLogo.jsx';
import './Navbar.css';

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const { settings }              = useSettings();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const navigate                  = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function goHome() {
    setMenuOpen(false);
    navigate('/');
  }

  function handlePedirAhora() {
    const phone = settings.whatsapp_number || '5491112345678';
    const msg   = '¡Hola! Quiero hacer un pedido 🍽️';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <div className="navbar__brand" onClick={goHome} style={{ cursor: 'pointer' }}>
          <img className="navbar__brand-logo" src="/logo.png" alt="Viandas Chanetón" />
        </div>

        <nav className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          <button onClick={goHome}>Inicio</button>
          <Link to="/menu" onClick={() => setMenuOpen(false)}>Menú</Link>
          <Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link>
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
            <WhatsAppLogo />
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
