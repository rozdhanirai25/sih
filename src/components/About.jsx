import { t } from '../i18n/translations.jsx';

export default function About({ locale }) {
  return (
    <section id="about" className="about-section reveal-on-scroll" aria-label="About">
      <h2 className="section-heading">{t(locale, 'aboutLabel')}</h2>
      <div className="about-content">
        <p>
          {t(locale, 'aboutBody1')}
        </p>
        <p>
          {t(locale, 'aboutBody2')}
        </p>
      </div>
    </section>
  );
}
