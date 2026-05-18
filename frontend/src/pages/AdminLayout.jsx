import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './AdminLayout.css';

const navItems = [
  { to: 'productos',     icon: 'restaurant_menu', label: 'Productos' },
  { to: 'categorias',    icon: 'category',        label: 'Categorías' },
  { to: 'configuracion', icon: 'settings',        label: 'Configuración' },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate   = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <img className="admin-sidebar__logo" src="/logo.png" alt="Viandas Chanetón" />
          <div>
            <p className="admin-sidebar__brand-sub">Panel Admin</p>
          </div>
        </div>

        <nav className="admin-sidebar__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__bottom">
          <a href="/" target="_blank" className="admin-sidebar__site-link">
            <span className="material-symbols-outlined">open_in_new</span>
            Ver sitio
          </a>
          <button className="admin-sidebar__logout" onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span>
            Salir
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
