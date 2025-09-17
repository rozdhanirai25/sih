import { useMemo, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import ResultsView from './components/ResultsView.jsx'
import Landing from './components/Landing.jsx'
import Acquire from './components/Acquire.jsx'
import { languages, t } from './i18n/translations.jsx'

function App() {
  const [page, setPage] = useState('home')
  const [locale, setLocale] = useState('en')
  const [endpointUrl, setEndpointUrl] = useState('')
  const [lastResult, setLastResult] = useState(null)

  const title = useMemo(() => t(locale, 'title'), [locale])

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <img src={viteLogo} className="logo" alt="App" />
          <h1 className="app-title">{title}</h1>
        </div>
        <div className="controls">
          <label className="lang-select">
            <span>{t(locale, 'language')}</span>
            <select value={locale} onChange={(e) => setLocale(e.target.value)}>
              {languages.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </label>
          <input
            className="endpoint-input"
            placeholder="BPA endpoint URL"
            value={endpointUrl}
            onChange={(e) => setEndpointUrl(e.target.value)}
          />
        </div>
      </header>

      <main className="main-content">
        {page === 'home' && (
          <Landing title={title} ctaText={t(locale, 'start')} onStart={() => setPage('acquire')} />
        )}
        {page === 'acquire' && (
          <Acquire
            onPredicted={(res) => { setLastResult(res); setPage('results'); }}
            analyzeLabel={t(locale, 'predict')}
            uploadText={t(locale, 'upload')}
            cameraText={t(locale, 'camera')}
          />
        )}
        {page === 'results' && lastResult && (
          <ResultsView lastResult={lastResult} endpointUrl={endpointUrl} locale={locale} onBackHome={() => setPage('home')} />
        )}
      </main>
    </div>
  )
}

export default App
