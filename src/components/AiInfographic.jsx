import { t } from '../i18n/translations.jsx';
import { SparkleIcon, CameraIcon } from './icons.jsx';

const sampleImage = 'https://cdn.builder.io/api/v1/image/assets%2F183da794664c493ab7a6ab5b4291d074%2Fe89712051266422dad3bfd2b0bd1b6b3?format=webp&width=800';

export default function AiInfographic({ locale }) {
  return (
    <section id="infographic" className="ai-diagram reveal-on-scroll" aria-label={t(locale, 'infographicTitle')}>
      <h2 className="section-heading">{t(locale, 'infographicTitle')}</h2>
      <div className="diagram-grid">
        <article className="diagram-card input-card" aria-label={t(locale, 'inputLabel')}>
          <div className="card-head">
            <CameraIcon size={18} color="var(--emerald)" />
            <span>{t(locale, 'inputLabel')}</span>
          </div>
          <div className="photo-frame">
            <img src={sampleImage} alt="Cow or buffalo input" />
          </div>
          <p className="card-note">{t(locale, 'inputNote')}</p>
        </article>

        <div className="arrow-right" aria-hidden>
          <svg viewBox="0 0 80 8" className="arrow-svg"><path d="M0 4H70"/><path d="M70 4l-4 -4M70 4l-4 4"/></svg>
        </div>

        <article className="diagram-card model-card" aria-label={t(locale, 'modelLabel')}>
          <div className="card-head">
            <SparkleIcon size={18} color="var(--indigo)" />
            <span>{t(locale, 'modelLabel')}</span>
          </div>
          <div className="layers">
            <div className="layer"><i/><i/><i/><i/></div>
            <div className="layer"><i/><i/><i/><i/><i/></div>
            <div className="layer"><i/><i/><i/></div>
          </div>
          <p className="card-note">{t(locale, 'modelNote')}</p>
        </article>

        <div className="arrow-right" aria-hidden>
          <svg viewBox="0 0 80 8" className="arrow-svg"><path d="M0 4H70"/><path d="M70 4l-4 -4M70 4l-4 4"/></svg>
        </div>

        <article className="diagram-card output-card" aria-label={t(locale, 'outputLabel')}>
          <div className="card-head">
            <SparkleIcon size={18} color="var(--emerald)" />
            <span>{t(locale, 'outputLabel')}</span>
          </div>
          <ul className="traits">
            <li><span>{t(locale, 'traitWithers')}</span><b>87%</b><div className="trait-bar bar-87"/></li>
            <li><span>{t(locale, 'traitBodyLength')}</span><b>92%</b><div className="trait-bar bar-92"/></li>
            <li><span>{t(locale, 'traitChestGirth')}</span><b>79%</b><div className="trait-bar bar-79"/></li>
            <li><span>{t(locale, 'traitRumpWidth')}</span><b>85%</b><div className="trait-bar bar-85"/></li>
          </ul>
          <p className="card-note">{t(locale, 'confidenceHelp')}</p>
        </article>
      </div>
    </section>
  );
}
