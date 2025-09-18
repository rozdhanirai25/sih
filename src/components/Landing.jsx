import { SparkleIcon } from './icons.jsx';
import { t } from '../i18n/translations.jsx';
import heroArt from '../assets/hero-future.svg';

const externalHeroUrl = 'https://cdn.builder.io/api/v1/image/assets%2F183da794664c493ab7a6ab5b4291d074%2Fe89712051266422dad3bfd2b0bd1b6b3?format=webp&width=800';

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
          <img className="hero-art" src={heroArt} alt="Futuristic backdrop" />
          <div className="silhouette cattle" />
          <div className="silhouette buffalo" />
          <img className="hero-photo" src={externalHeroUrl} alt="Livestock AI illustration" />
        </div>
      </div>
    </section>
  );
}
