import { useSettings } from '../../context/SettingsContext.jsx';
import './Historia.css';

export default function Historia() {
  const { settings } = useSettings();

  const img      = settings.about_image_url || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop';
  const years    = settings.about_years     || '9';
  const title    = settings.about_title     || 'Sabor que trasciende generaciones';
  const text1    = settings.about_text_1    || 'Lo que empezó como un pequeño sueño de los Chanetón se convirtió en el punto de encuentro de cada mediodía.';
  const text2    = settings.about_text_2    || 'Mantenemos las mismas recetas que usaba nuestra abuela, respetando los tiempos de cocción lenta.';

  return (
    <section id="historia" className="historia section-xl" style={{ background: 'var(--color-surface-container-low)' }}>
      <div className="container">
        <div className="historia__grid">
          {/* Image side */}
          <div className="historia__img-side">
            <div className="historia__img-wrap warm-shadow">
              <img src={img} alt="Cocina Viandas Chanetón" className="historia__img" />
            </div>
            <div className="historia__stat warm-shadow">
              <span className="historia__stat-number">{years}</span>
              <span className="historia__stat-label">Años cocinando para el barrio</span>
              <p className="historia__stat-sub">Fundados en 2017 en Neuquén.</p>
            </div>
          </div>

          {/* Text side */}
          <div className="historia__text-side">
            <h2 className="historia__title">{title}</h2>
            <div className="historia__paras">
              <p className="historia__para">{text1}</p>
              <p className="historia__para">{text2}</p>
            </div>

            <div className="historia__features">
              <div className="historia__feature">
                <div className="historia__feature-icon">
                  <span className="material-symbols-outlined">restaurant</span>
                </div>
                <h4 className="historia__feature-title">Calidad</h4>
                <p className="historia__feature-desc">Directo del productor a nuestra cocina.</p>
              </div>
              <div className="historia__feature">
                <div className="historia__feature-icon">
                  <span className="material-symbols-outlined">favorite</span>
                </div>
                <h4 className="historia__feature-title">Pasión</h4>
                <p className="historia__feature-desc">Elaboración 100% artesanal cada día.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
