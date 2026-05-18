import { useSettings }    from '../../context/SettingsContext.jsx';
import { buildWhatsAppUrl } from '../../utils/helpers.js';
import WhatsAppLogo from '../WhatsAppLogo/WhatsAppLogo.jsx';
import './ComoPedir.css';

const steps = [
  {
    icon: 'restaurant_menu',
    title: '1. Elegí tu Menú',
    desc: 'Explorá nuestros especiales del día y armá tu pedido a gusto.',
  },
  {
    icon: 'whatsapp',
    title: '2. Pedí Online',
    desc: 'Confirmamos tu pedido al instante vía WhatsApp.',
  },
  {
    icon: 'delivery_dining',
    title: '3. Recibí y Disfrutá',
    desc: 'Te lo llevamos a la puerta de tu casa caliente y listo para comer.',
  },
];

export default function ComoPedir() {
  const { settings } = useSettings();
  const phone = settings.whatsapp_number || '5491112345678';

  function handleWhatsApp() {
    window.open(
      buildWhatsAppUrl(phone, '¡Hola! Me interesa hacer un pedido especial o consultar por evento 🎉'),
      '_blank'
    );
  }

  return (
    <section id="como-pedir" className="como-pedir section-xl">
      <div className="container">
        <div className="como-pedir__heading">
          <h2 className="como-pedir__title">Tu vianda en 3 simples pasos</h2>
          <p className="como-pedir__subtitle">Disfrutá de la mejor comida sin moverte de casa.</p>
        </div>

        <div className="como-pedir__steps">
          <div className="como-pedir__steps-line" />
          {steps.map((step) => (
            <div key={step.title} className="como-pedir__step">
              <div className="como-pedir__step-icon">
                {step.icon === 'whatsapp' ? (
                  <WhatsAppLogo />
                ) : (
                  <span className="material-symbols-outlined">{step.icon}</span>
                )}
              </div>
              <h3 className="como-pedir__step-title">{step.title}</h3>
              <p className="como-pedir__step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="como-pedir__cta warm-shadow">
          <div className="como-pedir__cta-text">
            <h4 className="como-pedir__cta-title">¿Tenés un evento o pedido grande?</h4>
            <p className="como-pedir__cta-desc">Consultanos por promociones especiales para empresas y reuniones familiares.</p>
          </div>
          <button className="como-pedir__cta-btn" onClick={handleWhatsApp}>
            <WhatsAppLogo />
            Hablar por WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
