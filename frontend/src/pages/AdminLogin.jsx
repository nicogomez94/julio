import { useState, useEffect } from 'react';
import { useNavigate }  from 'react-router-dom';
import { useAuth }      from '../context/AuthContext.jsx';
import { api }          from '../services/api.js';
import { isDebugMode }  from '../utils/helpers.js';
import './AdminLogin.css';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate   = useNavigate();
  const debug      = isDebugMode();

  const [password, setPassword] = useState(debug ? 'admin123' : '');
  const [error,    setError]    = useState(() => {
    const message = localStorage.getItem('admin_auth_message') || '';
    localStorage.removeItem('admin_auth_message');
    return message;
  });
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/admin', { replace: true });
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await api.login(password);
      login(token);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Contraseña incorrecta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo">🍽</div>
        <h1 className="admin-login__title">Panel Administrador</h1>
        <p className="admin-login__subtitle">Viandas Chanetón</p>

        {debug && (
          <div className="admin-login__debug-hint">
            Modo debug: contraseña prerellena con <code>admin123</code>
          </div>
        )}

        <form className="admin-login__form" onSubmit={handleSubmit}>
          <div className="admin-login__field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresá la contraseña"
              autoFocus
              required
            />
          </div>

          {error && (
            <div className="admin-login__error">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          <button type="submit" className="admin-login__btn" disabled={loading}>
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>

        <a href="/" className="admin-login__back">
          <span className="material-symbols-outlined">arrow_back</span>
          Volver al sitio
        </a>
      </div>
    </div>
  );
}
