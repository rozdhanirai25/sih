import { SparkleIcon, HomeIcon } from './icons.jsx';
import { t } from '../i18n/translations.jsx';
import viteLogo from '/vite.svg';

export default function Navbar({ title, locale, onChangeLocale, endpointUrl, onChangeEndpoint, onStart, onNavigate }) {
  function go(id) {
    onNavigate('home');
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  return (
    <header className="navbar" role="navigation" aria-label="Main">
      <div className="nav-left">
        <button className="brand" onClick={() => onNavigate('home')} aria-label={t(locale, 'home')}>
          <img src={viteLogo} className="logo" alt="Logo" />
          <span className="brand-title">{title}</span>
        </button>
      </div>
      <nav className="nav-links" aria-label="Primary">
        <button className="nav-link" onClick={() => onNavigate('home')}><HomeIcon size={18} color="var(--indigo)" /> {t(locale, 'home')}</button>
        <button className="nav-link" onClick={() => go('features')}>{t(locale, 'featuresLabel')}</button>
        <button className="nav-link" onClick={() => go('about')}>{t(locale, 'aboutLabel')}</button>
        <button className="nav-link" onClick={() => go('contact')}>{t(locale, 'contactLabel')}</button>
        <button className="nav-link" onClick={onStart}><SparkleIcon size={18} color="var(--emerald)" /> {t(locale, 'start')}</button>
      </nav>
      <div className="nav-controls">
        <label className="lang-select">
          <span>{t(locale, 'language')}</span>
          <select value={locale} onChange={(e) => onChangeLocale(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="ta">தமிழ்</option>
            <option value="ml">മലയാളം</option>
          </select>
        </label>
        <input
          className="endpoint-input"
          placeholder={t(locale, 'endpointPlaceholder')}
          value={endpointUrl}
          onChange={(e) => onChangeEndpoint(e.target.value)}
        />
      </div>
    </header>
  );
}
