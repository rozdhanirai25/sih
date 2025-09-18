import { t } from '../i18n/translations.jsx';

export default function Contact({ locale }) {
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data.entries());
    alert(t(locale, 'contactThanks'));
    e.currentTarget.reset();
    console.log('contactForm', payload);
  }

  return (
    <section id="contact" className="contact-section reveal-on-scroll" aria-label="Contact">
      <h2 className="section-heading">{t(locale, 'contactLabel')}</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>{t(locale, 'name')}</span>
          <input name="name" required placeholder={t(locale, 'yourName')} />
        </label>
        <label className="form-field">
          <span>{t(locale, 'email')}</span>
          <input type="email" name="email" required placeholder={t(locale, 'yourEmail')} />
        </label>
        <label className="form-field">
          <span>{t(locale, 'message')}</span>
          <textarea name="message" rows="4" required placeholder={t(locale, 'yourMessage')} />
        </label>
        <div className="contact-actions">
          <button className="primary-action" type="submit">{t(locale, 'send')}</button>
        </div>
      </form>
      <div className="social-links" aria-label="Social links">
        <a href="#" aria-label="Twitter" className="social-link">Twitter</a>
        <a href="#" aria-label="LinkedIn" className="social-link">LinkedIn</a>
        <a href="#" aria-label="GitHub" className="social-link">GitHub</a>
      </div>
    </section>
  );
}
