import { useSettings } from '../../context/SettingsContext.jsx';
import './Contacto.css';

export default function Contacto() {
  const { settings } = useSettings();
  const mapsUrl = settings.maps_embed_url || '';

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
                <p>{settings.address || 'Calle Falsa 123, Buenos Aires'}</p>
              </div>
            </div>
            <div className="contacto__info-item">
              <div className="contacto__info-icon">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <strong>Horarios</strong>
                <p>{settings.schedule_weekdays || 'Lun a Sáb: 11:00 - 21:00'}</p>
                <p>{settings.schedule_weekend  || 'Dom: 11:00 - 15:00'}</p>
                <p className="contacto__feriados">Feriados consultar</p>
              </div>
            </div>
            <div className="contacto__info-item">
              <div className="contacto__info-icon">
                <span className="material-symbols-outlined">call</span>
              </div>
              <div>
                <strong>Teléfono</strong>
                <p>{settings.phone || '0800-CHANETON'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
