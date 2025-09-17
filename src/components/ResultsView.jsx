import { useMemo, useState } from 'react';
import { buildBpaPayload, sendToBpa } from '../services/bpaAdapter.jsx';
import { saveOffline, listOffline, syncAll } from '../services/offlineStore.jsx';

export default function ResultsView({ lastResult, endpointUrl, locale, onBackHome }) {
  const [copied, setCopied] = useState(false);
  const payload = useMemo(() => {
    if (!lastResult) return null;
    return buildBpaPayload({
      imageMeta: lastResult.imageMeta,
      measurements: lastResult.measurements,
      scores: lastResult.scores,
      landmarks: lastResult.landmarks,
      animalMeta: {},
      locale,
    });
  }, [lastResult, locale]);

  if (!lastResult) return null;

  const onCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const onSaveOffline = () => {
    saveOffline({ payload });
  };

  const onSync = async () => {
    await syncAll({ sender: async (p) => sendToBpa({ endpointUrl, payload: p }) });
  };

  return (
    <div className="results-panel">
      <div className="results-visuals">
        <div className="image-card">
          {lastResult.sourceDataUrl ? (
            <img src={lastResult.sourceDataUrl} alt="Original animal" className="result-image" />
          ) : (
            <div className="image-placeholder">No image</div>
          )}
        </div>
        <div className="image-card">
          {lastResult.overlayDataUrl ? (
            <img src={lastResult.overlayDataUrl} alt="Analyzed animal" className="result-image" />
          ) : (
            <div className="image-placeholder">No overlay</div>
          )}
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric"><span>Body length (px)</span><strong>{Math.round(lastResult.measurements.bodyLength)}</strong></div>
        <div className="metric"><span>Height at withers (px)</span><strong>{Math.round(lastResult.measurements.heightAtWithers)}</strong></div>
        <div className="metric"><span>Chest width (px)</span><strong>{Math.round(lastResult.measurements.chestWidth)}</strong></div>
        <div className="metric"><span>Rump angle (deg)</span><strong>{Math.round(lastResult.measurements.rumpAngle)}</strong></div>
      </div>
      <div className="scores-grid">
        <div className="score">Body length score: <strong>{lastResult.scores.bodyLength}</strong></div>
        <div className="score">Withers height score: <strong>{lastResult.scores.heightAtWithers}</strong></div>
        <div className="score">Chest width score: <strong>{lastResult.scores.chestWidth}</strong></div>
        <div className="score">Rump angle score: <strong>{lastResult.scores.rumpAngle}</strong></div>
      </div>

      <div className="export-actions">
        <button className="secondary-action" onClick={onCopy}>{copied ? 'Copied' : 'Copy JSON'}</button>
        <button className="secondary-action" onClick={onSaveOffline}>Save Offline</button>
        <button className="primary-action" onClick={onSync}>Save to BPA</button>
        <button className="secondary-action" onClick={onBackHome}>Back to Home</button>
      </div>

      <pre className="json-view">{JSON.stringify(payload, null, 2)}</pre>

      <div className="history-list">
        {listOffline().map((it) => (
          <div key={it.id} className="history-item">
            <span>{new Date(it.createdAt).toLocaleString()}</span>
            <code>ID: {it.id.slice(0, 8)}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
