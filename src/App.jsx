import { useMemo, useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import ResultsView from './components/ResultsView.jsx'
import Landing from './components/Landing.jsx'
import Acquire from './components/Acquire.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Features from './components/Features.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import { languages, t } from './i18n/translations.jsx'

function App() {
  const [page, setPage] = useState('home')
  const [locale, setLocale] = useState('en')
  const [endpointUrl, setEndpointUrl] = useState('')
  const [lastResult, setLastResult] = useState(null)

  const title = useMemo(() => t(locale, 'title'), [locale])

  // Scroll-based section reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-on-scroll');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.12 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app-shell theme-dark">
      <Navbar
        title={title}
        locale={locale}
        onChangeLocale={setLocale}
        endpointUrl={endpointUrl}
        onChangeEndpoint={setEndpointUrl}
        onStart={() => setPage('acquire')}
        onNavigate={(p) => setPage(p)}
      />

      <main className="main-content">
        {page === 'home' && (
          <>
            <Landing title={title} ctaText={t(locale, 'start')} locale={locale} onStart={() => setPage('acquire')} />
            <Features locale={locale} />
            <About locale={locale} />
            <Contact locale={locale} />
          </>
        )}
        {page === 'acquire' && (
          <Acquire
            onPredicted={(res) => { setLastResult(res); setPage('results'); }}
            analyzeLabel={t(locale, 'predict')}
            uploadText={t(locale, 'upload')}
            cameraText={t(locale, 'camera')}
            liveCameraText={t(locale, 'liveCamera')}
          />
        )}
        {page === 'results' && lastResult && (
          <ResultsView lastResult={lastResult} endpointUrl={endpointUrl} locale={locale} onBackHome={() => setPage('home')} />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
