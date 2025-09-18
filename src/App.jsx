import { useMemo, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import ResultsView from './components/ResultsView.jsx'
import Landing from './components/Landing.jsx'
import Acquire from './components/Acquire.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { languages, t } from './i18n/translations.jsx'

function App() {
  const [page, setPage] = useState('home')
  const [locale, setLocale] = useState('en')
  const [endpointUrl, setEndpointUrl] = useState('')
  const [lastResult, setLastResult] = useState(null)

  const title = useMemo(() => t(locale, 'title'), [locale])

  return (
    <div className="app-shell">
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
      <Footer />
    </div>
  )
}

export default App
