import { useEffect, useRef, useState } from 'react';
import { analyzeImage } from '../services/estimator.jsx';

export default function CameraCapture({ onResult, actionLabel }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    let stream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setReady(true);
        }
      } catch {
        setReady(false);
      }
    })();
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  async function snapshot() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    const img = new Image();
    img.src = canvas.toDataURL('image/png');
    await new Promise((r) => (img.onload = r));
    const result = analyzeImage(img);
    setAnalysis(result);
    // draw overlay on the same canvas
    ctx.drawImage(img, 0, 0);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#00e0ff';
    ctx.fillStyle = '#00e0ff';
    const L = result.landmarks;
    const link = (a, b) => { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); };
    const dot = (p) => { ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, Math.PI * 2); ctx.fill(); };
    link(L.muzzle, L.withers); link(L.withers, L.rump); link(L.chestLeft, L.chestRight);
    dot(L.muzzle); dot(L.withers); dot(L.rump); dot(L.chestLeft); dot(L.chestRight);
  }

  function handleAnalyze() {
    if (!analysis) return;
    const imageMeta = { width: analysis.width, height: analysis.height, capturedAt: new Date().toISOString() };
    onResult({ imageMeta, ...analysis });
  }

  return (
    <div className="camera-container">
      <div className="camera-stage">
        <video ref={videoRef} playsInline muted className="camera-video" />
        <canvas ref={canvasRef} className="overlay-canvas" />
      </div>
      <div className="camera-actions">
        <button className="secondary-action" onClick={snapshot} disabled={!ready}>Capture</button>
        <button className="primary-action" onClick={handleAnalyze} disabled={!analysis}>{actionLabel}</button>
      </div>
    </div>
  );
}
