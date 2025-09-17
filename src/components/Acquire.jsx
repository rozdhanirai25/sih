import ImageAnalyzer from './ImageAnalyzer.jsx';
import CameraCapture from './CameraCapture.jsx';
import { UploadIcon, CameraIcon, PlayIcon } from './icons.jsx';

export default function Acquire({ onPredicted, analyzeLabel }) {
  return (
    <section className="acquire-section fade-slide" aria-label="Acquire Image">
      <div className="acquire-actions">
        <button className="acquire-btn" onClick={() => document.getElementById('hiddenUploadInput').click()}>
          <UploadIcon />
          <span>Upload Image</span>
        </button>
        <button className="acquire-btn" onClick={() => document.getElementById('cameraSection').scrollIntoView({ behavior: 'smooth' })}>
          <CameraIcon />
          <span>Use Camera</span>
        </button>
      </div>

      <ImageAnalyzer onResult={onPredicted} actionLabel={analyzeLabel} />

      <div id="cameraSection" className="camera-anchor">
        <div className="section-title">
          <PlayIcon />
          <span>Live Camera</span>
        </div>
        <CameraCapture onResult={onPredicted} actionLabel={analyzeLabel} />
      </div>
    </section>
  );
}
