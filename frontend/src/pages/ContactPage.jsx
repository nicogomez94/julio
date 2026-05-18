import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.jsx';
import Contacto from '../components/Contacto/Contacto.jsx';
import Footer from '../components/Footer/Footer.jsx';
import CartDrawer from '../components/Cart/CartDrawer.jsx';
import WhatsAppFAB from '../components/WhatsAppFAB/WhatsAppFAB.jsx';
import WhatsAppLogo from '../components/WhatsAppLogo/WhatsAppLogo.jsx';
import { useSettings } from '../context/SettingsContext.jsx';
import { buildWhatsAppUrl } from '../utils/helpers.js';
import './ContactPage.css';

export default function ContactPage() {
  const { settings } = useSettings();
  const phone = settings.whatsapp_number || '5491112345678';
  const whatsappUrl = buildWhatsAppUrl(phone, '¡Hola! Quiero hacer una consulta.');

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-hero__bg" />
          <div className="container contact-hero__inner">
            <Link to="/" className="contact-hero__back">
              <span className="material-symbols-outlined">arrow_back</span>
              Volver
            </Link>
            <p className="contact-hero__label">Atención directa</p>
            <h1 className="contact-hero__title">Contacto</h1>
            <p className="contact-hero__sub">
              Escribinos, llamanos o acercate al local para coordinar tu pedido.
            </p>
            <div className="contact-hero__actions">
              <a className="contact-hero__action" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppLogo />
                WhatsApp
              </a>
              <a className="contact-hero__action contact-hero__action--light" href={`tel:${settings.phone || ''}`}>
                <span className="material-symbols-outlined">call</span>
                Llamar
              </a>
            </div>
          </div>
        </section>

        <Contacto />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFAB />
    </>
  );
}
