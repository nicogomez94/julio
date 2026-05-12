import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth }       from './context/AuthContext.jsx';
import { SettingsProvider }            from './context/SettingsContext.jsx';
import { CartProvider }                from './context/CartContext.jsx';
import { isDebugMode }                 from './utils/helpers.js';

import Home         from './pages/Home.jsx';
import AdminLogin   from './pages/AdminLogin.jsx';
import AdminLayout  from './pages/AdminLayout.jsx';
import ProductList  from './components/Admin/ProductList.jsx';
import ProductForm  from './components/Admin/ProductForm.jsx';
import CategoryManager from './components/Admin/CategoryManager.jsx';
import SettingsManager from './components/Admin/SettingsManager.jsx';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

function DebugBanner() {
  if (!isDebugMode()) return null;
  return <div className="debug-banner">⚠ MODO DEBUG ACTIVO – Formularios prerellenos</div>;
}

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <CartProvider>
          <BrowserRouter>
            <DebugBanner />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminLayout />
                  </PrivateRoute>
                }
              >
                <Route index element={<Navigate to="productos" replace />} />
                <Route path="productos"               element={<ProductList />} />
                <Route path="productos/nuevo"         element={<ProductForm />} />
                <Route path="productos/:id/editar"    element={<ProductForm />} />
                <Route path="categorias"              element={<CategoryManager />} />
                <Route path="configuracion"           element={<SettingsManager />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
