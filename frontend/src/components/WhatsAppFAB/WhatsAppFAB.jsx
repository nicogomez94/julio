import { useSettings }    from '../../context/SettingsContext.jsx';
import { buildWhatsAppUrl } from '../../utils/helpers.js';
import './WhatsAppFAB.css';

export default function WhatsAppFAB() {
  const { settings } = useSettings();
  const phone = settings.whatsapp_number || '5491112345678';

  function handleClick() {
    window.open(
      buildWhatsAppUrl(phone, '¡Hola! Quiero hacer un pedido 🍽️'),
      '_blank'
    );
  }

  return (
    <button className="wa-fab" onClick={handleClick} aria-label="Contactar por WhatsApp">
      <span className="material-symbols-outlined">chat</span>
    </button>
  );
}
