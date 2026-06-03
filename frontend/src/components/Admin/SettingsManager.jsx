import { useState, useEffect } from 'react';
import { api }       from '../../services/api.js';
import { isDebugMode } from '../../utils/helpers.js';
import '../../pages/AdminLayout.css';

const SETTING_FIELDS = [
  { section: 'WhatsApp y Contacto', fields: [
    { key: 'whatsapp_number', label: 'Número de WhatsApp (con código de país, sin +)', placeholder: '5491112345678' },
    { key: 'phone',           label: 'Teléfono para mostrar',                       placeholder: '0800-CHANETON' },
    { key: 'address',         label: 'Dirección',                                   placeholder: 'Calle Falsa 123...' },
    { key: 'schedule_weekdays', label: 'Horario semana',                            placeholder: 'Lun a Sáb: 11:00 - 21:00' },
    { key: 'schedule_weekend',  label: 'Horario fin de semana',                     placeholder: 'Dom: 11:00 - 15:00' },
    { key: 'maps_embed_url',    label: 'Dirección del mapa de Google',              placeholder: 'https://www.google.com/maps/embed?...', type: 'textarea' },
  ]},
  { section: 'Redes Sociales', fields: [
    { key: 'instagram_url', label: 'Dirección de Instagram', placeholder: 'https://instagram.com/...' },
    { key: 'facebook_url',  label: 'Dirección de Facebook',  placeholder: 'https://facebook.com/...' },
  ]},
  { section: 'Imágenes del Sitio', fields: [
    { key: 'hero_image_url', label: 'Imagen principal', type: 'image' },
    { key: 'contact_hero_image_url', label: 'Portada de contacto', type: 'image' },
    { key: 'about_image_url', label: 'Imagen Nosotros', type: 'image' },
  ]},
];

const EDITABLE_SETTING_KEYS = SETTING_FIELDS.flatMap((section) =>
  section.fields.map((field) => field.key)
);

export default function SettingsManager() {
  const debug = isDebugMode();
  const [settings, setSettings] = useState({});
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [uploadingKey, setUploadingKey] = useState('');
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

  async function handleImageChange(field, files) {
    if (!files?.length) return;

    setError('');
    setSuccess('');
    setUploadingKey(field.key);

    try {
      const result = await api.uploadImages(files);
      handleChange(field.key, field.multiple ? result.urls.join('\n') : result.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingKey('');
    }
  }

  function handleRemoveImage(key) {
    handleChange(key, '');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      const payload = Object.fromEntries(
        EDITABLE_SETTING_KEYS.map((key) => [key, settings[key] || ''])
      );
      await api.updateSettings(payload);
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
          Modo de prueba activo — editando configuración en tiempo real.
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
                    {field.type === 'image' ? (
                      <>
                        <input
                          id={field.key}
                          type="file"
                          accept="image/*"
                          multiple={!!field.multiple}
                          disabled={uploadingKey === field.key}
                          onChange={(e) => {
                            handleImageChange(field, e.target.files);
                            e.target.value = '';
                          }}
                        />
                        <small className="admin-form__hint">
                          {uploadingKey === field.key
                            ? 'Subiendo imagen...'
                            : field.multiple
                              ? 'Seleccioná una o varias imágenes desde tu equipo.'
                              : 'Seleccioná una imagen desde tu equipo.'}
                        </small>
                        {settings[field.key] && !field.multiple && (
                          <div className="admin-image-preview">
                            <img
                              src={settings[field.key]}
                              alt="Vista previa"
                              className="admin-image-preview__img admin-image-preview__img--wide"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <button
                              type="button"
                              className="admin-btn admin-btn--secondary admin-btn--sm"
                              onClick={() => handleRemoveImage(field.key)}
                            >
                              <span className="material-symbols-outlined">delete</span>
                              Quitar
                            </button>
                          </div>
                        )}
                      </>
                    ) : field.type === 'textarea' ? (
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
