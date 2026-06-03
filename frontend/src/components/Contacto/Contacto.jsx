import { useSettings } from '../../context/SettingsContext.jsx';
import { buildWhatsAppUrl } from '../../utils/helpers.js';
import './Contacto.css';

const DEFAULT_ADDRESS = 'Chanetón 999 esq. La Plata, Neuquén';

function buildMapsEmbedUrl(address) {
  const normalizedAddress = address?.trim();
  if (!normalizedAddress) return '';

  return `https://www.google.com/maps?q=${encodeURIComponent(normalizedAddress)}&output=embed`;
}

export default function Contacto() {
  const { settings } = useSettings();
  const address = settings.address?.trim() || DEFAULT_ADDRESS;
  const mapsUrl = buildMapsEmbedUrl(address) || settings.maps_embed_url || '';
  const phone = settings.whatsapp_number || '5491112345678';

  return (
    <section id="contacto" className="contacto section-xl">
      <div className="container">
        <div className="contacto__heading">
          <h2 className="contacto__title">¿Dónde encontrarnos?</h2>
          <p className="contacto__subtitle">Vení a visitarnos o pedí a domicilio.</p>
        </div>

        <div className="contacto__grid">
          {/* Map embed */}
          <div className="contacto__map-wrap warm-shadow">
            {mapsUrl ? (
              <iframe
                src={mapsUrl}
                title="Ubicación Viandas Chanetón"
                className="contacto__map"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="contacto__map-placeholder">
                <span className="material-symbols-outlined">location_on</span>
                <p>Mapa no configurado</p>
                <small>Configurar URL en el panel de administración</small>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="contacto__info">
            <div className="contacto__info-item">
              <div className="contacto__info-icon">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <strong>Dirección</strong>
                <p>{address}</p>
              </div>
            </div>
            <div className="contacto__info-item">
              <div className="contacto__info-icon">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <strong>Horarios</strong>
                <p>{settings.schedule_weekdays || 'Lun a Vie: 10:45 - 15:00'}</p>
                <p>{settings.schedule_weekend  || 'Sáb y Dom: Cerrado'}</p>
                <p className="contacto__feriados">Feriados consultar</p>
              </div>
            </div>
            <div className="contacto__info-item">
              <div className="contacto__info-icon">
                <span className="material-symbols-outlined">call</span>
              </div>
              <div>
                <strong>Teléfono</strong>
                <p>{settings.phone || '299-5189095'}</p>
              </div>
            </div>
            <div className="contacto__info-item">
              <div className="contacto__info-icon">
                <span className="material-symbols-outlined">share</span>
              </div>
              <div>
                <strong>Redes sociales</strong>
                <div className="contacto__social">
                  <a
                    href={settings.facebook_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contacto__social-btn"
                    aria-label="Facebook"
                  >
                    <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                  </a>
                  <a
                    href={settings.instagram_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contacto__social-btn"
                    aria-label="Instagram"
                  >
                    <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                  </a>
                  <a
                    href={buildWhatsAppUrl(phone, '¡Hola! Quiero hacer una consulta.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contacto__social-btn contacto__social-btn--wa"
                    aria-label="WhatsApp"
                  >
                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
