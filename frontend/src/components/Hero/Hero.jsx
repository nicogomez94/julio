import { useSettings }    from '../../context/SettingsContext.jsx';
import { buildWhatsAppUrl } from '../../utils/helpers.js';
import './Hero.css';

export default function Hero() {
  const { settings } = useSettings();

  const heroImage   = settings.hero_image_url || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&auto=format&fit=crop';
  const heroBadge   = settings.hero_badge     || 'Tradición Familiar desde 1992';
  const heroTitle   = settings.hero_title      || 'El placer de la comida real hecha en casa.';
  const heroSubtitle= settings.hero_subtitle   || 'Recetas de la abuela, ingredientes del mercado y el cariño de siempre.';
  const whatsapp    = settings.whatsapp_number  || '5491112345678';

  function scrollToMenu() {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollToHistoria() {
    document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleWhatsApp() {
    window.open(buildWhatsAppUrl(whatsapp, '¡Hola! Quiero ver el menú semanal 🍽️'), '_blank');
  }

  return (
    <section id="inicio" className="hero">
      {/* Background */}
      <div className="hero__bg">
        <img src={heroImage} alt="Comida casera Viandas Chanetón" className="hero__bg-img" />
        <div className="hero__overlay" />
        <div className="hero__overlay-warm" />
      </div>

      {/* Content */}
      <div className="hero__content container">
        <div className="hero__body">
          <div className="hero__badge-row">
            <span className="hero__badge-line" />
            <span className="hero__badge-text">{heroBadge}</span>
          </div>

          <h1 className="hero__title text-shadow-hero">
            {heroTitle.split('comida real').length > 1 ? (
              <>
                {heroTitle.split('comida real')[0]}
                <span className="hero__title-highlight">comida real</span>
                {heroTitle.split('comida real')[1]}
              </>
            ) : heroTitle}
          </h1>

          <p className="hero__subtitle">{heroSubtitle}</p>

          <div className="hero__cta-row">
            <button className="hero__btn-primary gradient-primary warm-shadow" onClick={scrollToMenu}>
              <span className="material-symbols-outlined">restaurant_menu</span>
              Ver Menú Semanal
              <span className="material-symbols-outlined hero__btn-arrow">arrow_forward</span>
            </button>
            {/* <button className="hero__btn-secondary" onClick={scrollToHistoria}>
              Nuestra Historia
            </button> */}
          </div>

          <div className="hero__features">
            <div className="hero__feature">
              <span className="material-symbols-outlined">verified</span>
              <span>Ingredientes Naturales</span>
            </div>
            <div className="hero__feature">
              <span className="material-symbols-outlined">local_shipping</span>
              <span>Envío a Domicilio</span>
            </div>
            <div className="hero__feature">
              <span className="material-symbols-outlined">timer</span>
              <span>Cocción Lenta</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
