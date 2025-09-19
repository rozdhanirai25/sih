import { useEffect, useRef, useState } from 'react';
import { analyzeImage } from '../services/estimator.jsx';

export default function CameraCapture({ onResult, actionLabel }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [snapUrl, setSnapUrl] = useState(null);

  useEffect(() => {
    let stream;
    const start = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('Camera not supported in this browser');
        }
        const candidates = [
          { video: { facingMode: { ideal: 'environment' } } },
          { video: { facingMode: 'environment' } },
          { video: true },
        ];
        let lastErr;
        for (const c of candidates) {
          try {
            // eslint-disable-next-line no-await-in-loop
            stream = await navigator.mediaDevices.getUserMedia(c);
            break;
          } catch (e) {
            lastErr = e;
          }
        }
        if (!stream) throw lastErr || new Error('Unable to access camera');

        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        await new Promise((resolve) => {
          const done = () => { video.removeEventListener('loadedmetadata', done); resolve(); };
          video.addEventListener('loadedmetadata', done);
        });
        try { await video.play(); } catch (_) { /* autoplay might be blocked; user can press Capture later */ }
        setReady(true);
      } catch (e) {
        setError(e?.message || 'Unable to access camera');
        setReady(false);
      }
    };
    start();
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  async function snapshot() {
    try {
      setError('');
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) { setError('Camera not ready'); return; }
      if (!video.videoWidth || !video.videoHeight) { setError('Camera initializing, try again'); return; }
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      const img = new Image();
      const dataUrl = canvas.toDataURL('image/png');
      img.src = dataUrl;
      await new Promise((r) => (img.onload = r));
      setSnapUrl(dataUrl);
      const result = analyzeImage(img);
      setAnalysis(result);
      ctx.drawImage(img, 0, 0);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#00e0ff';
      ctx.fillStyle = '#00e0ff';
      const L = result.landmarks;
      const link = (a, b) => { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); };
      const dot = (p) => { ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, Math.PI * 2); ctx.fill(); };
      link(L.muzzle, L.withers); link(L.withers, L.rump); link(L.chestLeft, L.chestRight);
      dot(L.muzzle); dot(L.withers); dot(L.rump); dot(L.chestLeft); dot(L.chestRight);
    } catch (e) {
      setError('Camera capture failed');
    }
  }

  function handleAnalyze() {
    if (!analysis) { setError('No image selected'); return; }
    setBusy(true);
    setTimeout(() => {
      const imageMeta = { width: analysis.width, height: analysis.height, capturedAt: new Date().toISOString() };
      const overlayDataUrl = canvasRef.current?.toDataURL('image/png');
      const sourceDataUrl = snapUrl;
      onResult({ imageMeta, overlayDataUrl, sourceDataUrl, ...analysis });
      setBusy(false);
    }, 900);
  }

  return (
    <div className="camera-container">
      <div className="camera-stage">
        <video ref={videoRef} autoPlay playsInline muted className="camera-video" />
        <canvas ref={canvasRef} className="overlay-canvas" />
      </div>
      <div className="camera-actions">
        <button className="secondary-action" onClick={snapshot} disabled={!ready}>Capture</button>
        <button className="primary-action" onClick={handleAnalyze} disabled={!analysis}>{actionLabel}</button>
      </div>
      {busy && (
        <div className="predicting" aria-live="polite" aria-busy="true">
          <div className="spinner" />
          <div className="progress indeterminate"><div className="bar" /></div>
        </div>
      )}
      {error && <div className="error-text" role="alert">{error}</div>}
    </div>
  );
}
