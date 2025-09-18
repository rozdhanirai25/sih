import { CameraIcon, UploadIcon, SaveIcon, SparkleIcon } from './icons.jsx';
import { t } from '../i18n/translations.jsx';

export default function Features({ locale }) {
  return (
    <section id="features" className="features-section reveal-on-scroll" aria-label="Features">
      <h2 className="section-heading">{t(locale, 'featuresLabel')}</h2>
      <div className="features-grid">
        <article className="feature-card">
          <SparkleIcon size={22} color="var(--indigo)" />
          <h3 className="feature-title">{t(locale, 'featAiTitle')}</h3>
          <p className="feature-desc">{t(locale, 'featAiDesc')}</p>
        </article>
        <article className="feature-card">
          <UploadIcon size={22} color="var(--indigo)" />
          <h3 className="feature-title">{t(locale, 'featUploadTitle')}</h3>
          <p className="feature-desc">{t(locale, 'featUploadDesc')}</p>
        </article>
        <article className="feature-card">
          <CameraIcon size={22} color="var(--indigo)" />
          <h3 className="feature-title">{t(locale, 'featCameraTitle')}</h3>
          <p className="feature-desc">{t(locale, 'featCameraDesc')}</p>
        </article>
        <article className="feature-card">
          <SaveIcon size={22} color="var(--indigo)" />
          <h3 className="feature-title">{t(locale, 'featExportTitle')}</h3>
          <p className="feature-desc">{t(locale, 'featExportDesc')}</p>
        </article>
      </div>
    </section>
  );
}
