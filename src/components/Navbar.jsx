import { SparkleIcon, HomeIcon } from './icons.jsx';
import viteLogo from '/vite.svg';

export default function Navbar({ title, locale, onChangeLocale, endpointUrl, onChangeEndpoint, onStart, onNavigate }) {
  return (
    <header className="navbar" role="navigation" aria-label="Main">
      <div className="nav-left">
        <button className="brand" onClick={() => onNavigate('home')} aria-label="Home">
          <img src={viteLogo} className="logo" alt="Logo" />
          <span className="brand-title">{title}</span>
        </button>
      </div>
      <nav className="nav-links" aria-label="Primary">
        <button className="nav-link" onClick={() => onNavigate('home')}><HomeIcon size={18} /> Home</button>
        <button className="nav-link" onClick={onStart}><SparkleIcon size={18} /> Start</button>
      </nav>
      <div className="nav-controls">
        <label className="lang-select">
          <span>Language</span>
          <select value={locale} onChange={(e) => onChangeLocale(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </label>
        <input
          className="endpoint-input"
          placeholder="BPA endpoint URL"
          value={endpointUrl}
          onChange={(e) => onChangeEndpoint(e.target.value)}
        />
      </div>
    </header>
  );
}
