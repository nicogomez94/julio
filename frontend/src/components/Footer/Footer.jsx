import { useLocation, useNavigate } from 'react-router-dom';
import { useSettings }    from '../../context/SettingsContext.jsx';
import { buildWhatsAppUrl } from '../../utils/helpers.js';
import './Footer.css';

export default function Footer() {
  const { settings } = useSettings();
  const location      = useLocation();
  const navigate      = useNavigate();
  const phone        = settings.whatsapp_number || '5491112345678';

  function scrollTo(id) {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo-row">
              <div className="footer__logo-circle">🍽</div>
              <h3 className="footer__brand-name">Viandas Chanetón</h3>
            </div>
            <p className="footer__brand-desc">
              Calidad casera desde 2017 en el corazón del barrio. Sabor que une a la familia en cada mesa.
            </p>
            <div className="footer__social">
              <a
                href={settings.facebook_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
              </a>
              <a
                href={settings.instagram_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
              </a>
              <a
                href={buildWhatsAppUrl(phone, '¡Hola!')}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn footer__social-btn--wa"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          {/* Menu links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Menú</h4>
            <ul className="footer__links">
              <li><button onClick={() => scrollTo('menu')}>Especiales del Día</button></li>
              <li><button onClick={() => scrollTo('viandas')}>Viandas Semanales</button></li>
              <li><button onClick={() => scrollTo('viandas')}>Menú Completo</button></li>
              <li><button onClick={() => scrollTo('viandas')}>Promociones</button></li>
            </ul>
          </div>

          {/* Hours */}
          <div className="footer__col">
            <h4 className="footer__col-title">Horarios</h4>
            <ul className="footer__links">
              <li className="footer__hours-item">
                <span className="material-symbols-outlined">schedule</span>
                {settings.schedule_weekdays || 'Lun a Vie: 10:45 - 15:00'}
              </li>
              <li className="footer__hours-item footer__hours-item--indent">
                {settings.schedule_weekend || 'Sáb y Dom: Cerrado'}
              </li>
              <li className="footer__hours-item footer__hours-item--muted">Feriados consultar</li>
            </ul>
          </div>

          {/* Location */}
          <div className="footer__col">
            <h4 className="footer__col-title">Ubicación</h4>
            <ul className="footer__links">
              <li className="footer__hours-item footer__hours-item--align-top">
                <span className="material-symbols-outlined">location_on</span>
                {settings.address || 'Chanetón 999 esq. La Plata, Neuquén'}
              </li>
              <li className="footer__hours-item">
                <span className="material-symbols-outlined">call</span>
                {settings.phone || '299-5189095'}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {new Date().getFullYear()} Viandas Chanetón. Calidad artesanal desde 2017.</span>
          <a
            href="https://zigodev.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__made-by"
          >
            Desarrollado por ZigoDev
          </a>
        </div>
      </div>
    </footer>
  );
}
