import { useMemo, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import ImageAnalyzer from './components/ImageAnalyzer.jsx'
import CameraCapture from './components/CameraCapture.jsx'
import ResultsView from './components/ResultsView.jsx'
import { languages, t } from './i18n/translations.jsx'

function App() {
  const [tab, setTab] = useState('upload')
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

      <nav className="nav-tabs">
        <button className={tab === 'upload' ? 'tab active' : 'tab'} onClick={() => setTab('upload')}>{t(locale, 'uploadTab')}</button>
        <button className={tab === 'camera' ? 'tab active' : 'tab'} onClick={() => setTab('camera')}>{t(locale, 'cameraTab')}</button>
        <button className={tab === 'history' ? 'tab active' : 'tab'} onClick={() => setTab('history')}>{t(locale, 'historyTab')}</button>
      </nav>

      <main className="main-content">
        {tab === 'upload' && (
          <ImageAnalyzer onResult={setLastResult} actionLabel={t(locale, 'analyze')} />
        )}
        {tab === 'camera' && (
          <CameraCapture onResult={setLastResult} actionLabel={t(locale, 'analyze')} />
        )}
        {(lastResult && (tab === 'upload' || tab === 'camera')) && (
          <ResultsView lastResult={lastResult} endpointUrl={endpointUrl} locale={locale} />
        )}
        {tab === 'history' && (
          <div className="history-empty">Results are saved locally for offline sync. Use Sync to send when connected.</div>
        )}
      </main>
    </div>
  )
}

export default App
