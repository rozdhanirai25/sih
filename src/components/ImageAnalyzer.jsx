import { useRef, useState, useEffect } from 'react';
import { analyzeImage } from '../services/estimator.jsx';

export default function ImageAnalyzer({ onResult, actionLabel }) {
  const inputRef = useRef(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!preview) return;
    const img = imgRef.current;
    if (!img) return;
    const handleLoad = () => {
      setError('');
      const result = analyzeImage(img);
      setAnalysis(result);
      drawOverlay(result);
    };
    if (img.complete) handleLoad();
    else img.addEventListener('load', handleLoad, { once: true });
  }, [preview]);

  function drawOverlay(result) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = result.width;
    canvas.height = result.height;
    const img = imgRef.current;
    ctx.drawImage(img, 0, 0, result.width, result.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#00e0ff';
    ctx.fillStyle = '#00e0ff';

    const L = result.landmarks;
    const link = (a, b) => {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    };
    const dot = (p, label) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(p.x + 8, p.y - 12, ctx.measureText(label).width + 8, 18);
      ctx.fillStyle = '#00e0ff';
      ctx.fillText(label, p.x + 12, p.y + 2);
    };

    ctx.font = 'bold 14px system-ui, sans-serif';

    link(L.muzzle, L.withers);
    link(L.withers, L.rump);
    link(L.chestLeft, L.chestRight);
    link(L.withers, L.foreHoof);
    link(L.rump, L.rearHoof);

    dot(L.muzzle, 'muzzle');
    dot(L.withers, 'withers');
    dot(L.rump, 'rump');
    dot(L.chestLeft, 'chest L');
    dot(L.chestRight, 'chest R');
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  function handleAnalyze() {
    if (!preview) { setError('No image selected'); return; }
    if (!analysis) { setError('Processing image...'); return; }
    setBusy(true);
    setTimeout(() => {
      const imageMeta = { width: analysis.width, height: analysis.height, capturedAt: new Date().toISOString() };
      const overlayDataUrl = canvasRef.current?.toDataURL('image/png');
      const sourceDataUrl = imgRef.current?.src || null;
      onResult({ imageMeta, overlayDataUrl, sourceDataUrl, ...analysis });
      setBusy(false);
    }, 900);
  }

  return (
    <div className="analyzer-container">
      <div className="analyzer-actions">
        <input id="hiddenUploadInput" ref={inputRef} onChange={handleFile} type="file" accept="image/*" />
        <button className="primary-action" onClick={handleAnalyze} disabled={!analysis}>{actionLabel}</button>
      </div>
      <div className="analyzer-preview">
        {preview && (
          <div className="image-stage">
            <img ref={imgRef} src={preview} alt="animal" className="hidden-image" />
            <canvas ref={canvasRef} className="overlay-canvas" />
          </div>
        )}
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
