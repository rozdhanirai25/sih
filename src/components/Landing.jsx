import { SparkleIcon } from './icons.jsx';
import { t } from '../i18n/translations.jsx';
import heroArt from '../assets/hero-future.svg';

export default function Landing({ title, onStart, ctaText, locale }) {
  return (
    <section className="landing-section fade-slide" aria-label="Landing">
      <div className="hero-card">
        <div className="hero-text">
          <h1 className="hero-title">{title}</h1>
          <p className="hero-sub">{t(locale, 'heroSub')}</p>
          <button className="cta-primary glow" onClick={onStart}>
            <SparkleIcon size={20} />
            <span>{ctaText}</span>
          </button>
        </div>
        <div className="hero-illustration" aria-hidden>
          <img className="hero-art" src={heroArt} alt="Futuristic livestock analysis" />
          <div className="silhouette cattle" />
          <div className="silhouette buffalo" />
        </div>
      </div>
    </section>
  );
}
