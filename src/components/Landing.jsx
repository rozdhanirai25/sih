import { SparkleIcon } from './icons.jsx';

export default function Landing({ title, onStart, ctaText }) {
  return (
    <section className="landing-section fade-slide" aria-label="Landing">
      <div className="hero-card">
        <div className="hero-text">
          <h1 className="hero-title">{title}</h1>
          <p className="hero-sub">Fast, objective scoring for cattle and buffaloes</p>
          <button className="cta-primary glow" onClick={onStart}>
            <SparkleIcon size={20} />
            <span>{ctaText}</span>
          </button>
        </div>
        <div className="hero-illustration" aria-hidden>
          <div className="silhouette cattle" />
          <div className="silhouette buffalo" />
        </div>
      </div>
    </section>
  );
}
