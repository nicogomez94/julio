import Navbar          from '../components/Navbar/Navbar.jsx';
import Hero            from '../components/Hero/Hero.jsx';
import ProductsSection from '../components/Products/ProductsSection.jsx';
import ComoPedir       from '../components/ComoPedir/ComoPedir.jsx';
import Contacto        from '../components/Contacto/Contacto.jsx';
import Footer          from '../components/Footer/Footer.jsx';
import CartDrawer      from '../components/Cart/CartDrawer.jsx';
import WhatsAppFAB     from '../components/WhatsAppFAB/WhatsAppFAB.jsx';

export default function Home() {
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
