import { useCart }      from '../../context/CartContext.jsx';
import { useSettings }  from '../../context/SettingsContext.jsx';
import { formatPrice, buildWhatsAppUrl } from '../../utils/helpers.js';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, isOpen, setIsOpen } = useCart();
  const { settings } = useSettings();

  if (!isOpen) return null;

  function handleWhatsApp() {
    const phone = settings.whatsapp_number || '5491112345678';
    if (items.length === 0) return;
    const lines = items.map(
      (i) => `• ${i.quantity}x ${i.product.name} — ${formatPrice(i.product.price * i.quantity)}`
    );
    const message =
      `¡Hola Viandas Chanetón! Quiero hacer el siguiente pedido:\n\n` +
      `${lines.join('\n')}\n\n` +
      `*Total estimado: ${formatPrice(totalPrice)}*\n\n` +
      `¿Me pueden confirmar disponibilidad y condiciones de entrega?`;
    window.open(buildWhatsAppUrl(phone, message), '_blank');
  }

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsOpen(false)} />
      <aside className="cart-drawer">
        <div className="cart-drawer__header">
          <h3 className="cart-drawer__title">
            <span className="material-symbols-outlined">shopping_cart</span>
            Tu Pedido
          </h3>
          <button className="cart-drawer__close" onClick={() => setIsOpen(false)} aria-label="Cerrar">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <span className="material-symbols-outlined">shopping_cart</span>
              <p>Tu pedido está vacío</p>
              <small>Agregá productos desde el menú</small>
            </div>
          ) : (
            <ul className="cart-drawer__list">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="cart-item">
                  {product.imageUrl && (
                    <img src={product.imageUrl} alt={product.name} className="cart-item__img" />
                  )}
                  <div className="cart-item__info">
                    <p className="cart-item__name">{product.name}</p>
                    <p className="cart-item__unit-price">{formatPrice(product.price)} c/u</p>
                  </div>
                  <div className="cart-item__controls">
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <span className="cart-item__qty">{quantity}</span>
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                  <div className="cart-item__subtotal">{formatPrice(product.price * quantity)}</div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeItem(product.id)}
                    aria-label="Eliminar"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total-row">
              <span className="cart-drawer__total-label">Total estimado</span>
              <span className="cart-drawer__total-price">{formatPrice(totalPrice)}</span>
            </div>
            <button className="cart-drawer__whatsapp-btn" onClick={handleWhatsApp}>
              <span className="material-symbols-outlined">chat</span>
              Enviar pedido por WhatsApp
            </button>
            <button className="cart-drawer__clear-btn" onClick={clearCart}>
              Vaciar pedido
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
