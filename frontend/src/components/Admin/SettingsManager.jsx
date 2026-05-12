import { useState, useEffect } from 'react';
import { api }       from '../../services/api.js';
import { isDebugMode } from '../../utils/helpers.js';
import '../../pages/AdminLayout.css';

const SETTING_FIELDS = [
  { section: 'WhatsApp y Contacto', fields: [
    { key: 'whatsapp_number', label: 'Número WhatsApp (con código de país, sin +)', placeholder: '5491112345678' },
    { key: 'phone',           label: 'Teléfono para mostrar',                       placeholder: '0800-CHANETON' },
    { key: 'address',         label: 'Dirección',                                   placeholder: 'Calle Falsa 123...' },
    { key: 'schedule_weekdays', label: 'Horario semana',                            placeholder: 'Lun a Sáb: 11:00 - 21:00' },
    { key: 'schedule_weekend',  label: 'Horario fin de semana',                     placeholder: 'Dom: 11:00 - 15:00' },
    { key: 'maps_embed_url',    label: 'URL embed Google Maps (iframe src)',        placeholder: 'https://www.google.com/maps/embed?...', type: 'textarea' },
  ]},
  { section: 'Hero (portada)', fields: [
    { key: 'hero_badge',    label: 'Badge / subtítulo del hero',  placeholder: 'Tradición Familiar desde 1992' },
    { key: 'hero_title',    label: 'Título principal',            placeholder: 'El placer de la comida real...' },
    { key: 'hero_subtitle', label: 'Subtítulo / descripción',     placeholder: '...', type: 'textarea' },
    { key: 'hero_image_url', label: 'URL imagen de fondo del hero', placeholder: 'https://...' },
  ]},
  { section: 'Nuestra Historia', fields: [
    { key: 'about_years',     label: 'Años de historia',     placeholder: '32' },
    { key: 'about_title',     label: 'Título sección',       placeholder: 'Sabor que trasciende generaciones' },
    { key: 'about_text_1',    label: 'Párrafo 1',            placeholder: '...', type: 'textarea' },
    { key: 'about_text_2',    label: 'Párrafo 2',            placeholder: '...', type: 'textarea' },
    { key: 'about_image_url', label: 'URL imagen historia',  placeholder: 'https://...' },
  ]},
  { section: 'Redes Sociales', fields: [
    { key: 'instagram_url', label: 'URL Instagram', placeholder: 'https://instagram.com/...' },
    { key: 'facebook_url',  label: 'URL Facebook',  placeholder: 'https://facebook.com/...' },
  ]},
];

export default function SettingsManager() {
  const debug = isDebugMode();
  const [settings, setSettings] = useState({});
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState('');

  useEffect(() => {
    api.getSettings()
      .then(setSettings)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  function handleChange(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      await api.updateSettings(settings);
      setSuccess('Configuración guardada correctamente.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="admin-page__title">Configuración</h1>
        <p style={{ color: 'var(--color-outline)', marginTop: 20 }}>Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page__header">
        <h1 className="admin-page__title">Configuración del Sitio</h1>
      </div>

      {debug && (
        <div className="admin-alert admin-alert--success" style={{ marginBottom: 16 }}>
          <span className="material-symbols-outlined">bug_report</span>
          Modo debug activo — editando configuración en tiempo real.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {SETTING_FIELDS.map((section) => (
            <div key={section.section} className="admin-card">
              <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'var(--color-on-background)' }}>
                {section.section}
              </h2>
              <div className="admin-form">
                {section.fields.map((field) => (
                  <div key={field.key} className="admin-form__field">
                    <label htmlFor={field.key}>{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.key}
                        value={settings[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        rows={3}
                      />
                    ) : (
                      <input
                        id={field.key}
                        type="text"
                        value={settings[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {error && (
            <div className="admin-alert admin-alert--error">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          {success && (
            <div className="admin-alert admin-alert--success">
              <span className="material-symbols-outlined">check_circle</span>
              {success}
            </div>
          )}

          <div>
            <button type="submit" className="admin-btn" disabled={saving}>
              <span className="material-symbols-outlined">save</span>
              {saving ? 'Guardando...' : 'Guardar configuración'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
