import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar          from '../components/Navbar/Navbar.jsx';
import Hero            from '../components/Hero/Hero.jsx';
import ProductsSection from '../components/Products/ProductsSection.jsx';
import ComoPedir       from '../components/ComoPedir/ComoPedir.jsx';
import Contacto        from '../components/Contacto/Contacto.jsx';
import Footer          from '../components/Footer/Footer.jsx';
import CartDrawer      from '../components/Cart/CartDrawer.jsx';
import WhatsAppFAB     from '../components/WhatsAppFAB/WhatsAppFAB.jsx';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.slice(1);
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [location.hash]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductsSection />
        <ComoPedir />
        <Contacto />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFAB />
    </>
  );
}
